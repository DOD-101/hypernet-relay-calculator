<script lang="ts">
  import type { HyperNetListing } from "$lib/listing";
  import Listing from "./HyperNetListing.svelte";

  let {
    listings,
    className,
  }: { listings: HyperNetListing[]; className: string } = $props();
</script>

<table class={className}>
  <tbody class="*:even:bg-gray-700">
    <tr>
      <th colspan="2"> Item </th>
      <th colspan="2"> Nodes </th>
      <th colspan="2"> Taxes </th>
      <th colspan="4"> Earnings </th>
      <th colspan="1"> Listing </th>
    </tr>

    <tr class="*:p-2">
      <th>Name</th>
      <th>Cost</th>

      <th>Node Price</th>
      <th>Amount</th>

      <th>HyperCores</th>
      <th>Relay Fee</th>

      <th>Win</th>
      <th>Loss</th>
      <th>Ratio</th>
      <th>Average</th>

      <th>Total</th>
    </tr>

    {#each listings as l}
      <Listing listing={l} />
    {/each}
  </tbody>
</table>
