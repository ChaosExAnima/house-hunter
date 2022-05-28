import listings from 'data/listing-fixtures';
import { checkAuth, checkMethod, errorResponse } from 'utils/api';
import { StatusError } from 'utils/errors';

import type { PlaceDetail } from '../types';
import type { ApiResponse } from 'globals';
import type { NextApiRequest } from 'next';

export default async function placeAddressHandler(
	req: NextApiRequest,
	res: ApiResponse<PlaceDetail>,
) {
	try {
		checkMethod(req);
		await checkAuth(req);
		const place = listings.find(({ id }) => id === req.query.id);
		if (!place) {
			throw new StatusError('Could not find listing', 404);
		}
		res.json({
			error: false,
			place,
		});
	} catch (err) {
		errorResponse(err, res);
	}
}
