import { JSDOM } from 'jsdom';

import RemoteData from './remote';

import type { StreetEasyJob } from './types';

export default class StreetEasyData extends RemoteData {
	protected readonly domain = 'streeteasy.com';
	protected async processJob(job: StreetEasyJob): Promise<void> {
		const html = await this.cachedFetch(job.target);
		const dom = new JSDOM(html);
		console.log(dom.window.name);
	}
}
