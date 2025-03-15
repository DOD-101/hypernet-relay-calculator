<script lang="ts">
  let market_buy = $state(0);
  let hypercore_price = $state(300_000);
  let hypercore_amount = $state(0);
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

  function customParse(value: string) {
    return parseInt(value.replaceAll(",", "").replaceAll("_", ""));
  }

  function roundN(value: number, n: number) {
    return Math.round(value * 10 ** n) / 10 ** n;
  }

  function displayNumber(value: number) {
    console.log(total_nodes);
    return value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  }

  function abbreviateNumber(value: number) {
    const suffixes = ["", "thousand", "million", "billion", "trillion"];
    let suffixIndex = 0;

    while (value >= 1000 && suffixIndex < suffixes.length - 1) {
      value /= 1000;
      suffixIndex++;
    }

    return `${roundN(value, 2)} ${suffixes[suffixIndex]}`;
  }
</script>

<h1>HyperNet Relay Calculator</h1>

<h2>Item</h2>

<p>Market buy of the item</p>
<input
  oninput={(e) => (market_buy = customParse(e.target.value))}
  title="≈ {abbreviateNumber(market_buy)}"
/>

<h3>Nodes</h3>

<div class="flex flex-row gap-4">
  <div>
    <p>Price</p>
    <input
      oninput={(e) => (node_price = customParse(e.target.value))}
      title="≈ {abbreviateNumber(node_price)}"
    />
  </div>

  <div>
    <p>Amount</p>
    <select
      name="nodes_amount"
      id=""
      oninput={(e) => (total_nodes = e.target.value)}
    >
      <option value="8">8</option>): 10
      <option value="16">16</option>
      <option value="48">48</option>
      <option value="512">512</option>
    </select>
  </div>

  <div>
    <p>Amount you buy</p>
    <input
      type="number"
      value={own_nodes}
      oninput={(e) => (own_nodes = e.target.value)}
    />
  </div>
</div>

<h3>HyperCores</h3>

<div class="flex flex-row gap-4">
  <div>
    <p>Price</p>
    <input
      oninput={(e) => (hypercore_price = customParse(e.target.value))}
      title="≈ {abbreviateNumber(hypercore_price)}"
    />
  </div>

  <div>
    <p>Needed</p>
    <input type="number" oninput={(e) => (hypercore_amount = e.target.value)} />
  </div>
</div>

<h2>Taxes</h2>

<p>HyperNet Relay fee (5%): {displayNumber(relay_tax)}</p>
<p>HyperCore tax: {displayNumber(hypercore_tax)}</p>

<h2>Earnings</h2>

<p>Win: {displayNumber(win_earnings)}</p>
<p>Loose: {displayNumber(loose_loss)}</p>

<p>
  Average (per ship): {displayNumber(
    win_earnings * (own_nodes / total_nodes) +
      loose_loss * (1 - own_nodes / total_nodes),
  )}
</p>

<p>Win-Loss ration: {displayNumber((win_earnings / loose_loss) * -1)}</p>

<p>Total price: {displayNumber(total_price)}</p>

<style>
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

  input {
    font-family: monospace;
    background-color: #444444;
    color: #ffffff;
  }
</style>
