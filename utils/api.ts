import { getSession } from 'next-auth/react';

import { AuthError, StatusError } from './errors';
import getSecret from './get-secret';

import type { ApiErrorResponse, ApiTokenRequest, Method } from 'globals';
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
	console.error('API Error:', error);
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

export async function checkToken(req: ApiTokenRequest) {
	const {
		query: { forceAuth, token: queryToken },
		headers: { authorization },
	} = req;

	// Dev mode does not need validation.
	if (process.env.NODE_ENV === 'development' && forceAuth !== 'true') {
		return;
	}

	// TODO: Set up JWT instead.
	try {
		const expectedToken = getSecret('API_SECRET');
		let token = queryToken;
		if (!token && authorization?.startsWith('BEARER')) {
			token = authorization.trim().replace('BEARER ', '');
		}
		if (token !== expectedToken) {
			throw new AuthError();
		}
	} catch (err) {
		throw new AuthError();
	}
}

export function queryToNum(
	query?: string,
	fallback = 0,
	allowNegative = false,
): number {
	if (!query) {
		return fallback;
	}
	const number = Number.parseInt(query);
	if (!Number.isFinite(number)) {
		throw new StatusError('Non-numeric query param', 400);
	}
	if (!allowNegative && number < 0) {
		throw new StatusError('Query param cannot be negative', 400);
	}
	return number;
}
