
/// Use the D3 library to read from the URL ///
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


///Dropdown menu///
function init() {
  let selector = d3.select("#selDataset");

  d3.json(url).then((data) => {
    let sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    let firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}


//// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual. ///
function buildCharts(sample) {
  
  d3.json(url).then((data) => {
    let samplesArray = data.samples;
    console.log(samplesArray)

    // Create a variable that filters the samples 
    let filtered = samplesArray.filter(sampleObj => sampleObj.id == sample);
    console.log(filtered)

    // Create a variable that filters the metadata 
    let metadata = data.metadata;
    let filtered2 = metadata.filter(sampleObj => sampleObj.id == sample);

    // Create a variable that holds the first sample in the metadata array.
    let result = filtered2[0];

    // Create a variable that holds the first sample in the array.
    let firstSample = filtered[0]
    console.log(firstSample)

    
    let otu_ids = firstSample.otu_ids
    let otu_labels = firstSample.otu_labels
    let sample_values = firstSample.sample_values
    console.log(otu_ids)
    console.log(otu_labels)
    console.log(sample_values)


   
    let yValues = otu_ids.slice(0,10).map(ids => `OTU ${ids}`).reverse();
    console.log(yValues);

    let barData = [{
      x: sample_values.slice(0,10).reverse(),
      y: yValues,
      text: otu_labels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h"
    }];

    // Create layout for bar chart
    let barLayout = {
      title : "Top 10 Bellybutton Bacteria Found"
    };

    Plotly.newPlot("bar", barData, barLayout);



//// Create a bubble chart that displays each sample ////
let bubbleData = [{
  x: otu_ids ,
  y: sample_values ,
  text: otu_labels,
  mode: "markers",
  marker: {
    size: sample_values,
    color: otu_ids,
    //colorscale: ["Reds"]
    colorscale: d3.scaleOrdinal().domain(otu_ids).range(["gold", "blue", "green", "yellow", "red"])
  }
}];

let bubbleChart = {
  title: "BellyButton Bacteria per Sample",
  xaxis: {title:"Otu id"},
};

Plotly.newPlot("bubble", bubbleData, bubbleChart); 

  });
}



//// Display the sample metadata, i.e., an individual's demographic information////
function buildMetadata(sample) {
  d3.json(url).then((data) => {
    let metadata = data.metadata;
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];

    // Selecting panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}



////Update all the plots when a new sample is selected///
init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
  
}
