import { HOUR_IN_SECONDS } from 'config/constants';
import { sha256 } from 'utils/text';

import CachedData from './cached';

import type { RemoteJob } from './types';

export default abstract class RemoteData extends CachedData {
	protected readonly domain: string = 'localhost';
	protected readonly type = 'streeteasy';
	protected readonly backoff = 0;
	protected jobs: RemoteJob[] = [];
	protected readonly defaultTtl = HOUR_IN_SECONDS * 6;

	public enqueue(path: string): RemoteJob {
		const target = new URL(path, `https://${this.domain}`).toString();

		const job = {
			target,
			id: sha256(target),
			created: Date.now(),
			type: this.type,
			state: 'queued',
		} as const;
		this.jobs.push(job);
		return job;
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

	protected async cachedFetch(
		target: string,
		init?: RequestInit,
	): Promise<string> {
		const cacheKey = `cachedFetch:${target}:${JSON.stringify(init)}`;
		const cachedResult = await this.getCache<Record<'text', string>>(
			cacheKey,
		);
		if (cachedResult) {
			return cachedResult.text;
		}

		const headers = new Headers(init?.headers);
		headers.append(
			'User-Agent',
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:100.0) Gecko/20100101 Firefox/100.0',
		);
		const response = await fetch(target, {
			...init,
			headers,
		});
		if (!response.ok) {
			console.log('Response:', response.headers, await response.text());
			throw new Error(
				`Status ${response.status}, could not fetch ${target}`,
			);
		}
		const text = await response.text();
		await this.setCache(cacheKey, { text });
		return text;
	}

	public get length() {
		return this.jobs.length;
	}
}
