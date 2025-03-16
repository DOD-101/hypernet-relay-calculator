<script lang="ts">
  import { abbreviateNumber, customParse, displayNumber } from "$lib";

  let { oninput, default_value = 0 } = $props();

  let value: number = $state(default_value);
</script>

<div>
  <input
    oninput={(e) => {
      value = customParse((e.target as HTMLInputElement).value);

      if (value < 0) {
        value = 0;
      }

      (e.target as HTMLInputElement).value = displayNumber(value);

      oninput(e);
    }}
    onwheel={(e) => {
      e.preventDefault();

      if (e.deltaY < 0) {
        value += 100;
      } else {
        value -= 100;
      }

      if (value < 0) {
        value = 0;
      }

      (e.target as HTMLInputElement).value = displayNumber(value);

      oninput(e);
    }}
    title="≈ {abbreviateNumber(value)}"
    value={displayNumber(value)}
  />

  <span>Isk</span>
</div>

<style>
  div {
    position: relative;
    display: inline-block;
    font-family: monospace;
    background-color: #21232b;
    width: 150px;
    padding: 0;
    margin: 0;
    color: #ffffff;
    height: 1.25rem;
    border-radius: 0.125rem;
  }
  input {
    width: 150px;
    padding: 0;
    margin: 0;
    height: 1.25rem;
  }

  span {
    color: #bcbcbc;
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
