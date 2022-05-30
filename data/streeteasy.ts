import { JSDOM } from 'jsdom';
import mem from 'mem';

import { sha256 } from 'utils/text';

import RemoteData from './remote';

import type { Listing, RowListing, StreetEasyJob } from './types';

export default class StreetEasyData extends RemoteData {
	protected readonly domain = 'streeteasy.com';

	protected jobs: StreetEasyJob[] = [];
	protected dom?: JSDOM;
	protected doc?: Document;

	public enqueue(path: string, listing?: string) {
		if (!listing) {
			throw new Error('No listing provided');
		}
		const target = new URL(path, `https://${this.domain}`).toString();

		const job: StreetEasyJob = {
			target,
			id: sha256(target),
			created: Date.now(),
			type: 'streeteasy',
			state: 'queued',
			listing,
		};
		this.jobs.push(job);
		return job;
	}

	protected async processJob(job: StreetEasyJob): Promise<void> {
		const row = await this.getRow(job.listing);
		if (!row || !row.links.includes(job.target)) {
			const rows = await this.getCacheMap('rows', 'global');
			console.log(rows);
			throw new Error(`Illegal listing ${job.listing}`);
		}
		const html = await this.cachedFetch(job.target);
		this.dom = new JSDOM(html);
		this.doc = this.dom.window.document;

		const breadcrumbs = Array.from(
			this.doc.querySelectorAll('ul.Breadcrumb a.Breadcrumb-item'),
		).map((ele) => ele.textContent ?? '');
		if (breadcrumbs.length !== 4) {
			throw new Error(`Parsing: found ${breadcrumbs.length} breadcrumbs`);
		}

		const listing: Listing = {
			address: breadcrumbs[3],
			neighborhood: breadcrumbs[2],
			price: Number.parseInt(
				this.queryText('.details_info_price > .price').replace(
					/[^0-9]/g,
					'',
				),
			),
			...row,
		};
		console.log('Got listing:', listing);
		await this.insertCacheMap(
			'listings',
			{ [listing.id]: listing },
			'global',
		);
	}

	private queryText(
		selector: string,
		root: Element | Document | undefined = this.doc,
	): string {
		const element = root?.querySelector(selector);
		if (!element) {
			throw new Error(`Could not get element with selector ${selector}`);
		}
		return element.textContent || '';
	}

	private getRow = mem((id: string) => {
		return this.getCacheMapValue<RowListing>('rows', id, 'global');
	});
}
