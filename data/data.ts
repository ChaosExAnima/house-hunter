export default abstract class Data {
	protected initialized = false;

	public async init() {
		this.initialized = true;
		await this.refresh();
		return this;
	}

	public abstract refresh(): Promise<this>;

	protected initCheck() {
		if (!this.initialized) {
			throw new Error('Sheet not initialized');
		}
	}
}
