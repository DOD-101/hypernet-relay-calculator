<script lang="ts">
  import type { HyperNetListing } from "$lib/listing";
  import Listing from "./HyperNetListing.svelte";

  let {
    listings = $bindable([]),
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
      <th></th>
    </tr>

    {#each listings as l}
      <tr class="*:p-2 *:text-center *:content-center">
        <Listing listing={l} />
        <td>
          <div class="h-full w-full flex flex-col justify-center">
            <button
              class="material-symbols-outlined block cursor-pointer text-red-300 hover:text-red-400"
              onclick={() => {
                listings = listings.filter((listing) => listing.id !== l.id);
              }}>delete</button
            >
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .material-symbols-outlined {
    font-size: 1rem;
  }
</style>
