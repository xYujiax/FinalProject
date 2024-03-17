<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    let svg;
    let countiesData = []; // to store csv data
  
    const margin = { top: 10, right: 30, bottom: 30, left: 30 };
    const width = 1000 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
    
    function createHistogram() {
    // clear previous histogram
      d3.select("#histogram svg").remove();
  
    svg = d3.select("#histogram")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    // raw data
    const populationData = countiesData.map(d => d.Population);
  
    // x axis
    const x = d3.scaleLinear()
      .domain(d3.extent(populationData))
      .nice() // this will make the axis end on round values
      .range([0, width]);
  
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format('.2s')));
  
    const histogram = d3.histogram()
      .value(d => d)
      .domain(x.domain())
      .thresholds(x.ticks(40));
  
    const bins = histogram(populationData);
  
    // y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)])
      .nice()
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
      .style("fill", "red");
  }
  
    onMount(async () => {
      const response = await fetch('counties.csv');
      const text = await response.text();
      countiesData = d3.csvParse(text, d3.autoType);
      createHistogram();
    });
  </script>
  
  <main>
    <div class="centered-container">
      <h2>US County Population: Raw Distribution</h2>
      <div id="histogram"></div><br><br><br>
    </div>
  </main>