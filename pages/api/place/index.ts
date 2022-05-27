import listings from 'data/listing-fixtures';
import { checkAuth, checkMethod, errorResponse } from 'utils/api';

import type { ApiResponse, PlaceIndex } from './types';
import type { NextApiRequest } from 'next';

export default async function placeHandler(
	req: NextApiRequest,
	res: ApiResponse<PlaceIndex>,
) {
	try {
		checkMethod(req);
		await checkAuth(req);
		res.json({
			error: false,
			places: listings,
		});
	} catch (err) {
		errorResponse(err, res);
	}
}
