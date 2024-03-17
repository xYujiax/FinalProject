<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  let count, index, offset, progress;
  let svg;
  let irisData = []; // to store csv data
  let sampleSize = 1; // default n
  let autoplay = false; // autoplay boolean for status
  let intervalId; // for autoplay interval
  const maxSampleSize = 149; // max n

  const margin = { top: 0, right: 30, bottom: 30, left: 100 };
  const width = 450 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const numberOfSamples = 1000; // # of samples to draw

// Histogram one 
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
      const sample = Array.from({ length: currentSampleSize }, () => {
      const randomIndex = Math.floor(Math.random() * irisData.length); // with replacement
      return irisData[randomIndex]['sepal length']; 
      });
      return d3.mean(sample);
    });

    // x axis
    const x = d3.scaleLinear()
      .domain(d3.extent(sampleMeans))
      .range([0, width]);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format('.2f')));

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


  // Histogram Two 

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

<main>
  <!-- Section 1 -->
  <div class="scroller">
    <Scroller top={0.0} bottom={1} threshold={0.5} bind:count bind:index bind:offset bind:progress>
      <div class="background" slot="background">
        <!--scroller background content -->
      </div>

      <div class="foreground" slot="foreground">

        <!-- histogram -->
        <div id="histogram"></div>

       <!-- toggle -->
        <div>
          <button on:click={toggleAutoplay} style="width: 100px; text-align: center">{autoplay ? 'Stop' : 'Autoplay'}</button><br>
          <input type="range" id="sampleSize" style="width: 800px;" min="1" max={maxSampleSize} bind:value={sampleSize}/><br>
          <label for="sampleSize">n={sampleSize}</label>
        </div>
    
        
        <!-- info -->
        <section>This is a simulator to show how Central Limit Theorem guarantees that the more sample means you collect from a population, the closer the distribution of sample means are to a normal distribution!.</section>
      </div>
    </Scroller>
  </div>


  <!-- Section 2 -->
  <div class="scroller">
    <Scroller top={0.0} bottom={1} threshold={0.5} bind:count bind:index bind:offset bind:progress>
      <div class="background" slot="background">
        <!-- scroller background content -->
      </div>

      <div class="foreground" slot="foreground">
        <section>This is the second section.</section>
      </div>
    </Scroller>
  </div>

<!-- Section 3 -->
  <div class="scroller">
    <Scroller top={0.0} bottom={1} threshold={0.5} bind:count bind:index bind:offset bind:progress>
      <div class="background" slot="background">
        <!-- scroller background content -->
      </div>

      <div class="foreground" slot="foreground">
        <section>This is the third section.</section>
      </div>
    </Scroller>
  </div>


  <!-- Section 4 -->
  <div class="scroller">
    <Scroller top={0.0} bottom={1} threshold={0.5} bind:count bind:index bind:offset bind:progress>
      <div class="background" slot="background">
        <!-- scroller background content -->
      </div>

      <div class="foreground" slot="foreground">
        <section>This is the fourth section.</section>
      </div>
    </Scroller>
  </div>
</main>

<style>
    .scroller {
    height: 100vh;
    overflow-y: auto;
  }

  svg {
    max-width: 200%;
    height: auto;
  }

</style>