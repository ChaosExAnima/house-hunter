import { getToken } from 'next-auth/jwt';

import { AuthError, StatusError } from './errors';
import getSecret from './get-secret';

import type { ApiErrorResponse } from './types';
import type { NextApiRequest, NextApiResponse } from 'next';

const secret = getSecret('NEXTAUTH_SECRET');

export function errorResponse(
	error: unknown,
	res: NextApiResponse<ApiErrorResponse>,
	status = 500,
) {
	let message = 'Unknown error';
	if (error instanceof Error) {
		if (error instanceof StatusError) {
			status = error.status;
		}
		message = error.message;
	} else if (typeof error === 'string') {
		message = error;
	}
	res.status(status).json({
		error: true,
		message,
	});
}

export async function checkAuth(req: NextApiRequest) {
	const token = await getToken({ req, secret });
	if (!token) {
		throw new AuthError();
	}
	return token;
}
