<script>
  import { writable } from 'svelte/store';
  import Slides from '../components/deck/slides.svelte';
  import '../app.pcss'; // took from layout.svelte bc we only have one page for our site
  import IrisRaw from '../components/iris-raw.svelte';
  import IrisCLT from '../components/iris-histogram.svelte';
  import PopulationRaw from '../components/counties-raw.svelte'
  import PopulationCLT from '../components/counties-histogram.svelte';
  import RecipesRaw from '../components/recipes-raw.svelte'
  import RecipesCLT from '../components/recipes-histogram.svelte';
  import '../components/styles.css';
  
  
  export const selectedDataset = writable('iris petals dataset');
  export const selectedDistribution = writable('raw');

  // for handling changes in dataset and distribution
  function handleDatasetChange(event) {
    selectedDataset.set(event.target.value);
  }

  // for handling changes in distribution
  function handleDistributionChange(event) {
    selectedDistribution.set(event.target.value);
  }
</script>

<Slides />


<main>
  <h1>Final Project Prototype</h1>
  <div class="controls">
    <!-- dropdown for dataset -->
    <div class="dropdown">
      <label for="dataset-select">Dataset:</label>
      <select id="dataset-select" bind:value={$selectedDataset} on:change={handleDatasetChange}>
        <option value="iris petals dataset">Iris Sepal Lengths</option>
        <option value="countries dataset">US County Population</option>
        <option value="recipes dataset">Recipe Calories</option>
      </select>
    </div>

    <!-- dropdown for distribution type -->
    <div class="dropdown">
      <label for="distribution-select">Distribution:</label>
      <select id="distribution-select" bind:value={$selectedDistribution} on:change={handleDistributionChange}>
        <option value="raw">Raw</option>
        <option value="CLT">CLT</option>
      </select>
    </div>
  </div>
  
  {#if $selectedDataset === 'iris petals dataset'}
    {#if $selectedDistribution === 'raw'}
      <IrisRaw />
    {:else}
      <IrisCLT />
    {/if}
  {:else if $selectedDataset === 'countries dataset'}
    {#if $selectedDistribution === 'raw'}
      <PopulationRaw />
    {:else}
      <PopulationCLT />
    {/if}
  {:else if $selectedDataset === 'recipes dataset'}
    {#if $selectedDistribution === 'raw'}
      <RecipesRaw />
    {:else}
      <RecipesCLT />
    {/if}
  {/if}

  <p>This is a simulator to show how the Central Limit Theorem guarantees that the more sample means you collect from a population, the closer the distribution of sample means is to a normal distribution!</p>
</main>