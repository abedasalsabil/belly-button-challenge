
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init() {
  // Grab a reference to the dropdown select element
  let selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json(url).then((data) => {
    let sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    let firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json(url).then((data) => {
    let metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    let result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    let PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json(url).then((data) => {
    // Create a variable that holds the samples array. 
    let samplesArray = data.samples;
    console.log(samplesArray)

    // Create a variable that filters the samples for the object with the desired sample number.
    let filtered = samplesArray.filter(sampleObj => sampleObj.id == sample);
    console.log(filtered)

    // Create a variable that filters the metadata array for the object with the desired sample number.
    let metadata = data.metadata;
    let filtered2 = metadata.filter(sampleObj => sampleObj.id == sample);

    // Create a variable that holds the first sample in the metadata array.
    let result = filtered2[0];

    // Create a variable that holds the first sample in the array.
    let theSample = filtered[0]
    console.log(theSample)

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    let otu_ids = theSample.otu_ids
    let otu_labels = theSample.otu_labels
    let sample_values = theSample.sample_values
    console.log(otu_ids)
    console.log(otu_labels)
    console.log(sample_values)

    // Create a variable that holds the washing frequency.
    let wfreq = parseFloat(result.wfreq)
    console.log(wfreq)

    // Create the y ticks for the bar chart.
    let yticks = otu_ids.slice(0,10).map(ids => `OTU ${ids}`).reverse();
    console.log(yticks);

    // Create the trace for the bar chart. 
    let barData = [{
      x: sample_values.slice(0,10).reverse(),
      y: yticks,
      text: otu_labels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h"
    }];

    // Create the layout for the bar chart. 
    let barLayout = {
      title : "Top 10 Bacteria  Found"
    };
    // Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

  });
}







// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     // Extract the top 10 OTUs and their values from the JSON data
//     let otuIds = data.otu_ids.slice(0, 10);
//     let sampleValues = data.sample_values.slice(0, 10);
//     let otuLabels = data.otu_labels.slice(0, 10);

//     let trace = {
//       x: sampleValues,
//       y: otuIds,
//       orientation: 'h',
//       type: 'bar',
//       hovertext: otuLabels,
//     };

//     let layout = {
//       title: 'Top 10 Bacteria Found',
//       xaxis: {
//         title: 'Sample Values',
//       },
//       yaxis: {
//         title: 'OTU IDs',
//         autorange: 'reversed',
//       },
//     };

//     let data1 = [trace];

//     Plotly.newPlot('chart', data, layout);
//   })
//   .catch(error => console.error(error));






// // Fetch the JSON data and console log it
// d3.json(url).then(function(data) {
//  // debugger
//   console.log(data);
// });

// function buildInfoBox(sample)
// {
//     // use d3.json in order to get all of the data
//     d3.json(url).then((data) => {
        
//         // get all of the metadata
//         let metaData = data.metadata;

//         // filter based on the value of the sample (should be 1 result)
//         let result = metaData.filter(sampleResult => sampleResult.id == sample);

//         // access index 0 from the array
//         let resultData = result[0];

//         // clear the metadata out
//         d3.select("#sample-metadata").html("");

//         // use Object.entries to get the key/value pairs and put into the demographics box on the page
//         Object.entries(resultData).forEach(([key, value]) => {
//             d3.select("#sample-metadata")
//                 .append("h5").text(`${key}: ${value}`);
//         });
//     });
// };


// function buildBarChart(sample) {

//   d3.json(url).then((data) => {

//     let firstSample = data.samples;

//     let result = firstSample.filter(sampleResult => sampleResult.id == sample);

//     let resultData = result[0];

//     // create the variables
//     let otu_ids = resultData.otu_ids;
//     let otu_labels = resultData.otu_labels;
//     let sample_values = resultData.sample_values;
// // set the top 10 items
//     let yvalues = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
//     let xvalues = sample_values.slice(0, 10);
//     let hovertext = otu_labels.slice(0, 10);
// // set up bar chart
//     let barChart = {
//       y: yvalues.reverse(),
//       x: xvalues.reverse(),
//       text: hovertext.reverse(),
//       type: "bar",
//       orientation: "h"
//     };

//     let layout = {
//       title: "Top 10 Bacteria in Belly Button"
//     };

//     Plotly.newPlot("bar", [barChart], layout)

//   });
// };