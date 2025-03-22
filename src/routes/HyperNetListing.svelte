<script lang="ts">
  import { displayNumber } from "$lib";
  import { HyperNetListing } from "$lib/listing";

  let { listing }: { listing: HyperNetListing } = $props();
</script>

<tr class="*:p-2 *:text-center">
  <td>{listing.item_name}</td>
  <td>{displayNumber(listing.item_cost)}</td>

  <td>{displayNumber(listing.node_price)}</td>
  <td>{listing.nodes}</td>

  <td>{listing.hypercores}</td>
  <td>{displayNumber(listing.relay_fee)}</td>

  <td>{displayNumber(listing.win)}</td>
  <td>{displayNumber(listing.loss)}</td>
  <td>{displayNumber(listing.ratio)}</td>
  <td>{displayNumber(listing.average_per_item)}</td>

  <td>{displayNumber(listing.total_price)}</td>
</tr>
