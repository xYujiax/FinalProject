<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  let svg;
  let irisData = []; // to store csv data
  let sampleSize = 1; // default n
  let autoplay = false; // autoplay boolean for status
  let intervalId; // for autoplay interval
  const maxSampleSize = 150; // max n

  const margin = { top: 10, right: 30, bottom: 30, left: 40 };
  const width = 450 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  const numberOfSamples = 1000; // # of samples to draw

  // fetch data (csv)
  onMount(async () => {
    const response = await fetch('iris-petals.csv');
    const text = await response.text();
    irisData = d3.csvParse(text, d3.autoType);
    createHistogram(sampleSize);
  });

  // histogram generation logic
  $: if (irisData.length > 0 && sampleSize) {
    createHistogram(sampleSize);
  }

  // autoplay logic
  $: if ((sampleSize >= maxSampleSize || !autoplay) && intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  function createHistogram(currentSampleSize) {
    // clear prev hist
    d3.select("#histogram svg").remove();

    svg = d3.select("#histogram")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // sample means
    const sampleMeans = Array.from({ length: numberOfSamples }, () => {
      const sample = d3.shuffle(irisData)
        .slice(0, currentSampleSize)
        .map(d => d['sepal length']);
      return d3.mean(sample);
    });

    // x axis
    const x = d3.scaleLinear()
      .domain(d3.extent(sampleMeans))
      .range([0, width]);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // generate a histogram using sample means
    const histogram = d3.histogram()
      .value(d => d)
      .domain(x.domain())
      .thresholds(x.ticks(40));

    const bins = histogram(sampleMeans);

    // y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)])
      .range([height, 0]);

    svg.append("g")
      .call(d3.axisLeft(y));

    // bars to svg
    svg.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
      .attr("x", 1)
      .attr("transform", d => `translate(${x(d.x0)},${y(d.length)})`)
      .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1)) // Math.max() to prevent negative width
      .attr("height", d => height - y(d.length))
      .style("fill", "black");
  }

  // autoplay logic
  function toggleAutoplay() {
    autoplay = !autoplay;
    if (autoplay) {
      // autoplay start
      intervalId = setInterval(() => {
        sampleSize += 1;
        if (sampleSize >= maxSampleSize) {
          sampleSize = 1; // reset to min after reaching max
        }
      }, 100); // interval (ms)
    } else {
      // stop autoplay
      clearInterval(intervalId);
      intervalId = null;
    }
  }
</script>

<div>
  <button on:click={toggleAutoplay} style="width: 75px; text-align: center">{autoplay ? 'Stop' : 'Autoplay'}</button><br>
  <input type="range" id="sampleSize" style="width: 300px;" min="1" max="150" bind:value={sampleSize} /><br>
  <label for="sampleSize">n={sampleSize}</label>
</div>