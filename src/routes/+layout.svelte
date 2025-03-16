<script lang="ts">
  import "../app.css";
  let { children } = $props();
</script>

<main class="flex justify-center flex-col items-center">
  <div class="main-container">
    {@render children()}
  </div>
</main>

<style>
  :root {
    --background-color: #151720;
  }

  .main-container {
    background-color: var(--background-color);
    padding: 1rem;
    padding-top: 0;
    border-radius: 0.5rem;
  }

  main {
    background-color: var(--background-color);
    min-height: 100vh;
  }
</style>
