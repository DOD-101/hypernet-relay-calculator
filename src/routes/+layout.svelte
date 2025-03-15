<script lang="ts">
  import "../app.css";
  let { children } = $props();
</script>

<main class="flex justify-center flex-col items-center">
  <div>
    {@render children()}
  </div>
</main>
