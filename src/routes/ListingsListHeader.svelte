<script lang="ts">
  let {
    title,
    description,
    listings = $bindable([]),
    active = $bindable(""),
    key = null,
    sort_fn = null,
    className = "",
  } = $props();

  let span_toggle = $state(false);
</script>

<th title={description} class={className}>
  <button
    onclick={() => {
      active = title;
      span_toggle = !span_toggle;

      if (sort_fn) {
        listings.sort(sort_fn);
      } else {
        listings.sort((a, b) => {
          return a[key] - b[key];
        });
      }

      if (!span_toggle) {
        listings.reverse();
      }
    }}
  >
    <span class="flex flex-row items-center">
      {title}
      <span
        class="material-symbols-outlined {span_toggle ? 'rotate-180' : ''}
        {active === title ? '' : 'opacity-0'}"
        >arrow_drop_down
      </span>
    </span>
  </button>
</th>

<style>
  .material-symbols-outlined {
    font-size: 1.2rem;
  }
</style>
