<script lang="ts">
  import { customParse, displayNumber, PRICE_TO_CORE_RATIO } from "$lib";
  import { HyperNetListing } from "./HyperNetListing.svelte.ts";

  import IskInput from "./iskInput.svelte";
  import IskOutput from "./iskOutput.svelte";
  import ListingsList from "./ListingsList.svelte";

  let listings: HyperNetListing[] = $state([]);
  let cl = $state(new HyperNetListing("", 0, 8, 4, 0, 1, 300_000));
</script>

<div class="m-auto w-fit">
  <h1>HyperNet Relay Calculator</h1>

  <h2>Item</h2>

  <div class="flex flex-row gap-4">
    <div>
      <p>Cost</p>
      <IskInput
        oninput={(e: Event) =>
          (cl.item_cost = customParse((e.target as HTMLInputElement).value))}
      />
    </div>

    <div>
      <p>Name</p>
      <input
        type="text"
        class="w-40"
        oninput={(e) => (cl.item_name = (e.target as HTMLInputElement).value)}
      />
    </div>
  </div>

  <h3>Nodes</h3>

  <div class="flex flex-row gap-4">
    <div>
      <p>Price</p>
      <IskInput
        oninput={(e: Event) => {
          cl.node_price = customParse((e.target as HTMLInputElement).value);
          cl.hypercores = Math.max(
            Math.floor((cl.node_price * cl.nodes) / PRICE_TO_CORE_RATIO),
            1,
          );
        }}
      />
    </div>

    <div class="flex flex-col">
      <p>Amount</p>
      <select
        class="self-end"
        name="nodes_amount"
        id=""
        oninput={(e) => {
          cl.nodes = Number.parseInt((e.target as HTMLSelectElement).value);

          cl.hypercores = Math.max(
            Math.floor((cl.node_price * cl.nodes) / PRICE_TO_CORE_RATIO),
            1,
          );
        }}
      >
        <option value="8">8</option>): 10
        <option value="16">16</option>
        <option value="48">48</option>
        <option value="512">512</option>
      </select>
    </div>

    <div class="flex flex-col">
      <p>you buy</p>
      <input
        class="self-end w-15"
        type="number"
        value={cl.own_nodes}
        oninput={(e) =>
          (cl.own_nodes = Number.parseInt(
            (e.target as HTMLInputElement).value,
          ))}
        max={cl.nodes}
        min="0"
      />
    </div>
  </div>

  <h3>HyperCores</h3>

  <div class="flex flex-row gap-4">
    <div>
      <p>Cost</p>
      <IskInput
        oninput={(e: Event) =>
          (cl.hypercore_cost = customParse(
            (e.target as HTMLInputElement).value,
          ))}
        default_value={cl.hypercore_cost}
      />
    </div>

    <div class="flex flex-col">
      <p>Amount</p>
      <input
        class="self-end w-15"
        type="number"
        min="1"
        oninput={(e) =>
          (cl.hypercores = Number.parseInt(
            (e.target as HTMLInputElement).value,
          ))}
        value={cl.hypercores}
      />
    </div>
  </div>

  <h2>Taxes</h2>

  <IskOutput variable={cl.relay_fee} text="HyperNet Relay fee (5%)" />
  <IskOutput variable={cl.hypercore_tax} text="HyperCore tax" />

  <h2>Earnings</h2>

  <IskOutput variable={cl.win} text="Win" />
  <IskOutput variable={cl.loss} text="Loose" />

  <IskOutput variable={cl.average_per_item} text="Average (per ship)" />

  <p>Win-Loss ration: {displayNumber((cl.win / cl.loss) * -1)}</p>

  <IskOutput variable={cl.total_price} text="Total price" className="mt-3" />

  <button
    class="btn"
    aria-label="Add to Items"
    onclick={() => {
      listings.push(cl);
    }}
  >
    Add to items</button
  >
</div>

<div class="m-auto w-fit">
  <ListingsList bind:listings className="m-auto mt-5" />

  <button
    class="btn"
    onclick={() => {
      navigator.clipboard.writeText(
        JSON.stringify(listings.map((l) => l.toObj())),
      );
    }}>Export List</button
  >

  <button
    class="btn"
    onclick={async () => {
      let json = await navigator.clipboard.readText();

      let json_listings = JSON.parse(json);

      json_listings.forEach((l: HyperNetListing) => {
        listings.push(
          new HyperNetListing(
            l.item_name,
            l.item_cost,
            l.nodes,
            l.own_nodes,
            l.node_price,
            l.hypercores,
            l.hypercore_cost,
          ),
        );
      });
    }}>Import List</button
  >
</div>

<style>
  h1 {
    font-size: 2rem;
    padding-top: 2rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.25rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  h3:before {
    content: "";
  }

  input,
  select {
    background-color: #21232b;
    height: 1.25rem;
  }
</style>
