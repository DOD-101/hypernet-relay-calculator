export class HyperNetListing {
	public id: string = $state("");
	public createdAt: Date = $state(new Date());

	public item_name: string = $state("");
	public item_cost: number = $state(0);

	public nodes: number = $state(0);
	public own_nodes: number = $state(0);
	public node_price: number = $state(0);

	public hypercores: number = $state(0);
	public hypercore_cost: number = $state(0);

	constructor(
		item_name: string,
		item_cost: number,
		nodes: number,
		own_nodes: number,
		node_price: number,
		hypercores: number,
		hypercore_cost: number,
	) {
		this.id = crypto.randomUUID();
		this.createdAt = new Date();

		this.item_name = item_name;
		this.item_cost = item_cost;

		this.nodes = nodes;
		this.own_nodes = own_nodes;
		this.node_price = node_price;

		this.hypercores = hypercores;
		this.hypercore_cost = hypercore_cost;
	}

	public toObj() {
		return {
			item_name: this.item_name,
			item_cost: this.item_cost,
			nodes: this.nodes,
			own_nodes: this.own_nodes,
			node_price: this.node_price,
			hypercores: this.hypercores,
			hypercore_cost: this.hypercore_cost,
		};
	}

	get total_price() {
		return this.nodes * this.node_price;
	}

	get relay_fee() {
		return this.total_price * 0.05;
	}

	get hypercore_tax() {
		return this.hypercore_cost * this.hypercores;
	}

	get win() {
		return (
			this.node_price * (this.nodes - this.own_nodes) -
			this.relay_fee -
			this.hypercore_tax
		);
	}

	get loss() {
		return (
			(this.item_cost - this.node_price * (this.nodes - this.own_nodes)) * -1
		);
	}

	get ratio() {
		return (this.win / this.loss) * -1;
	}

	get average_per_item() {
		return (
			this.win * (this.own_nodes / this.nodes) +
			this.loss * (1 - this.own_nodes / this.nodes)
		);
	}
}
