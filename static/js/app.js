
function pageBuilder(subject){
    
    d3.json("samples.json").then((data) => {
        console.log(subject);

        // Filter data.samples based on subject
        // The array that you get back you are interested in [0]
        var samples = data.samples;
        var filteredData = samples.filter(samples => samples.id == subject);
        
        var otuLabelsSlice = filteredData[0].otu_labels.slice(0,10);
        var otuIdsSlice =  filteredData[0].otu_ids.slice(0,10);
        var otuSamplesSlice = filteredData[0].sample_values.slice(0,10);
        var otuIdStringSlice = otuIdsSlice.map(otuIdsSlice => `OTU ${otuIdsSlice}`);

        var otuLabels = filteredData[0].otu_labels;
        var otuIds =  filteredData[0].otu_ids;
        var otuSamples = filteredData[0].sample_values;

        var meta = data.metadata;
        var filteredWash = meta.filter(meta => meta.id == subject);
        var washData = filteredWash[0].wfreq;
        

        // Plotly charts
        // Horizonatal bar chart- orientation: "h"
        var trace1 = [{
            type: "bar",
            x: otuSamplesSlice, 
            y: otuIdStringSlice,
            orientation: "h",
            hovertext: otuLabelsSlice
        }];
        var layout = {
            title: 'OTU Samples and Values',

            bargap: 0.05,
            height: 500,
            width: 400,
            barmode: 'stack'
        };

        Plotly.newPlot("bar", trace1, layout);
        
        // Bubble chart
        var trace2 = {
            x: otuIds,
            y:otuSamples,
            mode: 'markers',
            marker: {
              color: otuIds,
              size: otuSamples
            },
            text: otuLabels
          };
          
          var dataTrace = [trace2];
          
          var layout = {
            xaxis: {
                title:"OTU ID"
            },
            showlegend: false,
            height: 600,
            width: 1000
          };
          
          Plotly.newPlot('bubble', dataTrace, layout);

          //guage
        var trace3 = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: washData,
            delta: {
                position:"top",
                reference: 4
            },
            title: { 
                text: "Belly Button Scrubs per Week",

            },
            type: "indicator",
            mode: "number+delta"
        }];
        
        var layout = { 
            paper_bgcolor: "lightgray",
            width: 300, 
            height: 400, 
            margin: { 
                t: 0, 
                b: 0 
            } 
        };
        Plotly.newPlot('gauge', trace3, layout);
        // Panel
        // Filter data.metadata based on subject
        // The array that you get back you are interested in [0]

        var infoPanel = d3.select("#sample-metadata");
        var metaData = data.metadata;
        var metaFilter = metaData.filter(metaData =>  metaData.id == subject);
        var metaFilter2 = metaFilter[0];
        console.log(metaFilter2)

        infoPanel.html("");
       
        Object.entries(metaFilter2).forEach(([key, value]) => {
            infoPanel.append("li").text(`${key}: ${value}`);
            
        });
    })

}


function init(){

    d3.json("samples.json").then((data) => {
        //creating defining variable for drop down
        var selector = d3.select("#selDataset");

        //adding the ids into the dropdown menu
        data.names.forEach((ids) => {
            selector
                .append("option")
                .text(ids)
                .property("value",ids)
        })

        initialChoice = data.names[0];

        pageBuilder(initialChoice);
    })
}

function optionChanged(selection) {

    pageBuilder(selection)

}



init()