import ListingData from 'data/listing';
import { checkAuth, checkMethod, errorResponse } from 'utils/api';
import { StatusError } from 'utils/errors';

import type { PlaceDetail, PlaceDetailRequest } from '../types';
import type { ApiResponse } from 'globals';

export default async function placeAddressHandler(
	req: PlaceDetailRequest,
	res: ApiResponse<PlaceDetail>,
) {
	try {
		checkMethod(req);
		await checkAuth(req);
		const data = await new ListingData().init();
		const place = data.listings.find(({ id }) => id === req.query.id);
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
