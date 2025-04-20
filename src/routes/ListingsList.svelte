<script lang="ts">
  import type { HyperNetListing } from "./HyperNetListing.svelte.ts";
  import Listing from "./ListingsItem.svelte";
  import ListingsListHeader from "./ListingsListHeader.svelte";

  let active = $state("Name");

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
      <ListingsListHeader
        bind:listings
        bind:active
        title="Name"
        description="Name of the item"
        sort_fn={(a: HyperNetListing, b: HyperNetListing) =>
          a.item_name.localeCompare(b.item_name)}
      />
      <ListingsListHeader
        bind:listings
        bind:active
        title="Cost"
        description="Cost of the item"
        key="item_cost"
      />

      <ListingsListHeader
        bind:listings
        bind:active
        title="Price"
        description="Price of each node"
        key="node_price"
      />
      <ListingsListHeader
        bind:listings
        bind:active
        title="Amount"
        description="Amount of Nodes"
        key="nodes"
      />

      <ListingsListHeader
        bind:listings
        bind:active
        title="HyperCores"
        description="Tax amount in form of HyperCores"
        key="hypercores"
      />
      <ListingsListHeader
        bind:listings
        bind:active
        title="Relay Fee"
        description="Relay Fee Tax (5%)"
        key="relay_fee"
      />

      <ListingsListHeader
        bind:listings
        bind:active
        title="Win"
        description="Earnings if you win the Item"
        key="win"
      />
      <ListingsListHeader
        bind:listings
        bind:active
        title="Loss"
        description="Losses if you lose the Item"
        key="hypercores"
      />
      <ListingsListHeader
        bind:listings
        bind:active
        title="Ratio"
        description="Ratio of Win to Loss"
        key="ratio"
      />
      <ListingsListHeader
        bind:listings
        bind:active
        title="Average"
        description="Average earnings per item"
        key="average_per_item"
      />

      <ListingsListHeader
        bind:listings
        bind:active
        title="Total"
        description="Total price to list the item for on the HyperNet Relay"
        key="total_price"
      />

      <th></th>
    </tr>

    {#each listings as l}
      <tr class="*:text-center *:content-center">
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
