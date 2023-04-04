const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
 // debugger
  console.log(data);
});


function buildBarChart(sample) {

  d3.json(url).then((data) => {

    let firstSample = data.samples;

    let result = firstSample.filter(sampleResult => sampleResult.id == sample);

    let resultData = result[0];

    // create the variables
    let otu_ids = resultData.otu_ids;
    let otu_labels = resultData.otu_labels;
    let sample_values = resultData.sample_values;
// set the top 10 items
    let yvalues = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
    let xvalues = sample_values.slice(0, 10);
    let hovertext = otu_labels.slice(0, 10);
// set up bar chart
    let barChart = {
      y: yvalues.reverse(),
      x: xvalues.reverse(),
      text: hovertext.reverse(),
      type: "bar",
      orientation: "h"
    };

    let layout = {
      title: "Top 10 Bacteria in Belly Button"
    };

    Plotly.newPlot("bar", [barChart], layout)

  });
};