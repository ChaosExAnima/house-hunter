import { NextApiRequest, NextApiResponse } from 'next';

import { checkAuth, errorResponse } from 'utils/api';
import { StatusError } from 'utils/errors';

export default async function placeHandler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const token = checkAuth(req);
		if (req.method === 'GET') {
			// TODO: Get number of places to review.
		} else if (req.method === 'POST') {
			// TODO: Add new place.
		} else {
			throw new StatusError('Invalid request', 400);
		}
	} catch (err) {
		errorResponse(err, res);
	}
}
