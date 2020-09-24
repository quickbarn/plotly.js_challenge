
function pageBuilder(subject){
    
    d3.json("samples.json").then((data) => {
        console.log(subject);

        // Filter data.samples based on subject
        // The array that you get back you are interested in [0]
        var samples = data.samples;
        var filteredData = samples.filter(samples => samples.id == subject);
        
        var otuLabels = filteredData[0].otu_labels.slice(0,10);
        var otuIds =  filteredData[0].otu_ids.slice(0,10);
        var otuSamples = filteredData[0].sample_values.slice(0,10);
        var otuIdString = otuIds.map(otuIds => `OTU ${otuIds}`);

        console.log(otuIds);

        // Plotly charts
        // Horizonatal bar chart- orientation: "h"
        var trace1 = [{
            type: "bar",
            x: otuSamples, 
            y: otuIdString,
            orientation: "h",
            hovertext: otuLabels
        }];
        var layout = {
            title: 'OTU Samples and Values',

            bargap: 0.05,
            height: 600,
            width: 800,
            barmode: 'stack'
        };

        Plotly.newPlot("bar", trace1, layout);
    
        // Panel
        // Filter data.metadata based on subject
        // The array that you get back you are interested in [0]

        var infoPanel = d3.select("#sample-metadata");
        var metaData = data.metadata;



        infoPanel.html("");

        Object.entries(metaData).forEach(([key, value]) => {
            // One idea is to append header elements (h5 or h6) of the key: value
        })
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