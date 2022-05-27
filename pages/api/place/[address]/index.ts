import { checkAuth, checkMethod, errorResponse } from 'utils/api';

import type { ApiResponse, PlaceDetail } from '../types';
import type { NextApiRequest } from 'next';

export default async function placeAddressHandler(
	req: NextApiRequest,
	res: ApiResponse<PlaceDetail>,
) {
	try {
		checkMethod(req);
		await checkAuth(req);
		res.json({
			error: false,
			place: {
				address: 'nowhere',
			},
		});
	} catch (err) {
		errorResponse(err, res);
	}
}
