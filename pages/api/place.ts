import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import getSecret from 'utils/get-secret';

const secret = getSecret('NEXTAUTH_SECRET');

export default async function placeHandler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const token = await getToken({ req, secret });
	if (!token) {
		return res.status(401).json({
			error: 'unauthorized',
		});
	}

	res.json({});
}
