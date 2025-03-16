<script lang="ts">
  import { abbreviateNumber, displayNumber } from "$lib";

  let { variable, text } = $props();

  let icon = $state("content_copy");

  function copy() {
    navigator.clipboard.writeText(variable.toString());

    icon = "check";

    setTimeout(() => {
      icon = "content_copy";
    }, 1000);
  }
</script>

<div class="relative w-fit pr-6">
  <p title="≈ {abbreviateNumber(variable)}">
    {text}: {displayNumber(variable)} <span class="isk">Isk</span>
  </p>

  <button
    aria-label="Copy"
    class="ml-2 hover:scale-105 transition-all duration-75 rounded-full top-0 right-1 absolute"
    onclick={copy}
    ><span id="copy_icon" class="material-symbols-outlined">
      {icon}
    </span></button
  >
</div>

<style>
  p,
  button {
    color: #fff;
  }

  .isk {
    color: #cccccc;
  }
  .material-symbols-outlined {
    font-size: 0.85rem;
  }
</style>
