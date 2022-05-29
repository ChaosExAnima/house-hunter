import RemoteData from './remote';

import type { RemoteJob } from './types';

export default class StreetEasyData extends RemoteData {
	protected async processJob(job: RemoteJob): Promise<void> {}
}
