import { checkAuth, checkMethod, errorResponse } from 'utils/api';

import type { ApiResponse, PlaceNew } from './types';
import type { NextApiRequest } from 'next';

export default async function placeNewHandler(
	req: NextApiRequest,
	res: ApiResponse<PlaceNew>,
) {
	try {
		checkMethod(req, 'POST');
		await checkAuth(req);
		res.json({
			error: false,
			address: 'new-address',
		});
	} catch (err) {
		errorResponse(err, res);
	}
}
