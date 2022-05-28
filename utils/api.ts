import { getSession } from 'next-auth/react';

import { AuthError, StatusError } from './errors';

import type { ApiErrorResponse, Method } from 'globals';
import type { NextApiRequest, NextApiResponse } from 'next';

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

export function checkMethod(req: NextApiRequest, method: Method = 'GET') {
	if (req.method !== method) {
		throw new StatusError('Invalid method', 400);
	}
}

export async function checkAuth(req: NextApiRequest) {
	const session = await getSession({ req });
	if (!session) {
		throw new AuthError();
	}
	return session;
}
