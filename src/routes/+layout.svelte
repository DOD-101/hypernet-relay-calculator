<script lang="ts">
  import "../app.css";
  let { children } = $props();
</script>

<main class="flex justify-center flex-col items-center">
  <div class="main-container">
    {@render children()}
  </div>
</main>

<footer class="h-16 flex flex-col">
  <p class="text-s self-center mt-auto">
    My in-game name is: <span class="bg-gray-600 rounded-xs font-mono pl-1 pr-1"
      >Su Meza</span
    > Any donations are greatly appreciated!
  </p>
  <p class="text-xs self-center">
    © 2014 CCP hf. All rights reserved. "EVE", "EVE Online", "CCP", and all
    related logos and images are trademarks or registered trademarks of CCP hf.
  </p>
</footer>

<style>
  :root {
    --background-color: #151720;
  }

  main {
    min-height: calc(100vh - 4rem);
  }

  footer,
  main,
  .main-container {
    background-color: var(--background-color);
    color: white;
  }
</style>
