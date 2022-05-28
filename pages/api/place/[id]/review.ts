import { checkAuth, checkMethod, errorResponse } from 'utils/api';

import type { ApiResponse, ApiSuccessResponse } from 'globals';
import type { NextApiRequest } from 'next';

export default async function placeReviewHandler(
	req: NextApiRequest,
	res: ApiResponse<ApiSuccessResponse>,
) {
	try {
		checkMethod(req, 'PUT');
		await checkAuth(req);
		res.json({
			error: false,
		});
	} catch (err) {
		errorResponse(err, res);
	}
}
