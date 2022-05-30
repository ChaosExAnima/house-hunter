import StreetEasyData from 'data/streeteasy';
import { checkMethod, checkToken, errorResponse } from 'utils/api';
import { StatusError } from 'utils/errors';

import type { JobCreateRequest, JobCreateResponse } from './types';
import type { ApiResponse } from 'globals';

export default async function jobCreateHandler(
	req: JobCreateRequest,
	res: ApiResponse<JobCreateResponse>,
) {
	try {
		checkMethod(req);
		checkToken(req);
		const {
			query: { type, target, listing },
		} = req;
		let handler;
		let id: string;
		switch (type) {
			case 'streeteasy':
				handler = new StreetEasyData();
				id = handler.enqueue(target, listing).id;
				break;
			default:
				throw new StatusError(`Invalid job type ${type}`, 400);
		}
		await handler.init();
		res.json({
			error: false,
			id,
		});
	} catch (error) {
		errorResponse(error, res);
	}
}
