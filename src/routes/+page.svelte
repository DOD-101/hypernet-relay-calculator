<script lang="ts">
  import { customParse, displayNumber, PRICE_TO_CORE_RATIO } from "$lib";

  import IskInput from "./iskInput.svelte";
  import IskOutput from "./iskOutput.svelte";

  let market_buy = $state(0);
  let hypercore_price = $state(300_000);
  let hypercore_amount = $state(1);
  let total_nodes = $state(8);
  let node_price = $state(0);

  let total_price = $derived(total_nodes * node_price);
  let own_nodes = $state(4);

  let relay_tax = $derived(total_price * 0.05);
  let hypercore_tax = $derived(hypercore_price * hypercore_amount);

  let win_earnings = $derived(
    node_price * (total_nodes - own_nodes) - relay_tax - hypercore_tax,
  );
  let loose_loss = $derived(
    (market_buy - node_price * (total_nodes - own_nodes)) * -1,
  );

  let average_per_ship = $derived(
    win_earnings * (own_nodes / total_nodes) +
      loose_loss * (1 - own_nodes / total_nodes),
  );
</script>

<h1>HyperNet Relay Calculator</h1>

<h2>Item</h2>

<p>Cost</p>
<IskInput
  oninput={(e: Event) =>
    (market_buy = customParse((e.target as HTMLInputElement).value))}
/>

<h3>Nodes</h3>

<div class="flex flex-row gap-4">
  <div>
    <p>Price</p>
    <IskInput
      oninput={(e: Event) => {
        node_price = customParse((e.target as HTMLInputElement).value);
        hypercore_amount = Math.max(
          Math.floor((node_price * total_nodes) / PRICE_TO_CORE_RATIO),
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
        total_nodes = Number.parseInt((e.target as HTMLSelectElement).value);

        hypercore_amount = Math.max(
          Math.floor((node_price * total_nodes) / PRICE_TO_CORE_RATIO),
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
      value={own_nodes}
      oninput={(e) =>
        (own_nodes = Number.parseInt((e.target as HTMLInputElement).value))}
      max={total_nodes}
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
        (hypercore_price = customParse((e.target as HTMLInputElement).value))}
      default_value={hypercore_price}
    />
  </div>

  <div class="flex flex-col">
    <p>Amount</p>
    <input
      class="self-end w-15"
      type="number"
      min="1"
      oninput={(e) =>
        (hypercore_amount = Number.parseInt(
          (e.target as HTMLInputElement).value,
        ))}
      value={hypercore_amount}
    />
  </div>
</div>

<h2>Taxes</h2>

<IskOutput variable={relay_tax} text="HyperNet Relay fee (5%)" />
<IskOutput variable={hypercore_tax} text="HyperCore tax" />

<h2>Earnings</h2>

<IskOutput variable={win_earnings} text="Win" />
<IskOutput variable={loose_loss} text="Loose" />

<IskOutput variable={average_per_ship} text="Average (per ship)" />

<p>Win-Loss ration: {displayNumber((win_earnings / loose_loss) * -1)}</p>

<IskOutput variable={total_price} text="Total price" className="mt-3" />

<style>
  * {
    color: #ffffff;
  }

  h1 {
    font-size: 2rem;
    margin-top: 2rem;
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
