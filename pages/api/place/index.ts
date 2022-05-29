import SheetData from 'data/sheets';
import { checkAuth, checkMethod, errorResponse } from 'utils/api';

import type { PlaceIndex } from './types';
import type { ApiResponse } from 'globals';
import type { NextApiRequest } from 'next';

export default async function placeHandler(
	req: NextApiRequest,
	res: ApiResponse<PlaceIndex>,
) {
	try {
		checkMethod(req);
		await checkAuth(req);
		const sheet = await new SheetData().init();
		res.json({
			error: false,
			places: sheet.activeListings.map((listing) => ({
				address: '',
				price: 0,
				neighborhood: 'NYC',
				...listing,
			})),
		});
	} catch (err) {
		errorResponse(err, res);
	}
}
