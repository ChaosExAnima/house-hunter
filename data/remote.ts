import { randomUUID } from 'crypto';

import { HOUR_IN_SECONDS } from 'config/constants';

import CachedData from './cached';

import type { RemoteJob } from './types';

export default abstract class RemoteData extends CachedData {
	protected readonly domain = 'localhost';
	protected readonly backoff = 0;
	protected jobs: RemoteJob[] = [];
	protected readonly defaultTtl = HOUR_IN_SECONDS * 6;

	public enqueue(job: RemoteJob) {
		const targetUrl = new URL(job.target);
		if (targetUrl.hostname !== this.domain) {
			throw new Error(`Invalid target domain: ${targetUrl.hostname}`);
		}

		return this.jobs.push({
			...job,
			id: randomUUID(),
			created: Date.now(),
		});
	}

	public async refresh(): Promise<this> {
		const job = this.jobs.shift();
		if (!job) {
			return this;
		}
		await this.processJob(job);
		return this;
	}

	protected abstract processJob(job: RemoteJob): Promise<void>;

	public get length() {
		return this.jobs.length;
	}
}
