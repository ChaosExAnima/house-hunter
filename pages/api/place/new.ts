import { checkAuth, checkMethod, errorResponse } from 'utils/api';
import { StatusError } from 'utils/errors';

import type { ApiResponse, PlaceNew } from './types';
import type { NextApiRequest } from 'next';

export default async function placeNewHandler(
	req: NextApiRequest,
	res: ApiResponse<PlaceNew>,
) {
	try {
		checkMethod(req, 'POST');
		await checkAuth(req);
		if (!req.body) {
			throw new StatusError('No URL provided', 400);
		}
		const url = new URL(req.body); // Do something with this URL.
		res.json({
			error: false,
			address: 'new-address',
		});
	} catch (err) {
		if (err instanceof TypeError) {
			err = new StatusError('Invalid URL provided', 400);
		}
		errorResponse(err, res);
	}
}
