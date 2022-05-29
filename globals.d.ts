/// <reference types="node" />
import { NextApiResponse, NextApiRequest, GetStaticPropsResult } from 'next';

type EnvKeys =
	| 'API_SECRET'
	| 'VALID_EMAILS'
	| 'NEXTAUTH_SECRET'
	| 'GOOGLE_CLIENT_ID'
	| 'GOOGLE_CLIENT_SECRET'
	| 'GOOGLE_SHEET_ID'
	| 'GOOGLE_SERVICE_EMAIL'
	| 'GOOGLE_SERVICE_KEY'
	| 'NEXT_PUBLIC_BUDGET'
	| 'UPSTASH_REDIS_REST_URL'
	| 'UPSTASH_REDIS_REST_TOKEN'
	| 'UPSTASH_REDIS_REST_PREFIX';

interface EnvVariables {
	readonly [key in EnvKeys]?: string;
}

declare namespace NodeJS {
	interface ProcessEnv extends EnvVariables {}
}

// General types
interface Image {
	src: string;
	alt?: string;
}

// API
type Method = 'GET' | 'POST' | 'PUT';

interface ApiTokenRequest extends NextApiRequest {
	query: {
		token?: string;
		forceAuth?: 'true';
	};
}

export type ApiResponse<Response extends ApiSuccessResponse> = NextApiResponse<
	Response | ApiErrorResponse
>;

// Pages
export type StaticPropsResult<Props = {}> = Promise<
	GetStaticPropsResult<Props>
>;

interface ApiResponseBase {
	error: boolean;
}

export interface ApiSuccessResponse {
	error: false;
}

export interface ApiErrorResponse extends ApiResponseBase {
	error: true;
	message: string;
}
