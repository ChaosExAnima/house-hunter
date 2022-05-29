import ListingData from 'data/listing';
import { checkAuth, checkMethod, errorResponse, queryToNum } from 'utils/api';

import type { PlaceIndex, PlaceIndexRequest } from './types';
import type { Listing } from 'data/types';
import type { ApiResponse } from 'globals';

export default async function placeHandler(
	req: PlaceIndexRequest,
	res: ApiResponse<PlaceIndex>,
) {
	try {
		checkMethod(req);
		await checkAuth(req);
		let {
			query: { status = 'active', limit: rawLimit, offset: rawOffset },
		} = req;

		// TODO: Put limit and offset into loaded data.
		const limit = queryToNum(rawLimit, 100);
		const offset = queryToNum(rawOffset, 0);
		const listings = await new ListingData().init();

		// Get right list.
		let places: Listing[];
		if (status === 'active') {
			places = listings.activeListings;
		} else if (status === 'old') {
			places = listings.oldListings;
		} else {
			places = listings.listings;
		}

		places = places.slice(offset, limit);

		res.json({
			error: false,
			places,
		});
	} catch (err) {
		errorResponse(err, res);
	}
}
