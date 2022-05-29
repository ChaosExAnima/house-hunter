import ScrapedData from 'data/scraped';
import { checkAuth, checkMethod, errorResponse } from 'utils/api';

import type { PlaceIndex, PlaceIndexRequest } from './types';
import type { ApiResponse } from 'globals';

export default async function placeHandler(
	req: PlaceIndexRequest,
	res: ApiResponse<PlaceIndex>,
) {
	try {
		checkMethod(req);
		await checkAuth(req);
		const {
			query: { active },
		} = req;
		const listings = await new ScrapedData().init();
		res.json({
			error: false,
			places:
				active !== 'false'
					? listings.activeListings
					: listings.oldListings,
		});
	} catch (err) {
		errorResponse(err, res);
	}
}
