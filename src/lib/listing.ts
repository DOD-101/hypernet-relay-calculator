export class HyperNetListing {
	public id: string;
	public createdAt: Date;

	public item_name: string;
	public item_cost: number;

	public nodes: number;
	public own_nodes: number;
	public node_price: number;

	public hypercores: number;
	public hypercore_cost: number;

	constructor(
		item_name: string,
		item_cost: number,
		nodes: number,
		own_nodes: number,
		node_price: number,
		hyper_cores: number,
		hyper_core_cost: number,
	) {
		this.id = crypto.randomUUID();
		this.createdAt = new Date();

		this.item_name = item_name;
		this.item_cost = item_cost;

		this.nodes = nodes;
		this.own_nodes = own_nodes;
		this.node_price = node_price;

		this.hypercores = hyper_cores;
		this.hypercore_cost = hyper_core_cost;
	}

	public toObj() {
		return { ...this };
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
		console.log(this.node_price, this.nodes, this.own_nodes);
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
