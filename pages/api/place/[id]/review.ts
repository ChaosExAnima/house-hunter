import { checkAuth, checkMethod, errorResponse } from 'utils/api';

import type { ApiResponse, PlaceDetail } from '../types';
import type { NextApiRequest } from 'next';

export default async function placeReviewHandler(
	req: NextApiRequest,
	res: ApiResponse<PlaceDetail>,
) {
	try {
		checkMethod(req, 'PUT');
		await checkAuth(req);
		res.json({
			error: false,
			place: {
				address: 'updated',
			},
		});
	} catch (err) {
		errorResponse(err, res);
	}
}
