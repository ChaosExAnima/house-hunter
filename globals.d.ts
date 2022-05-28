/// <reference types="node" />
import { NextApiResponse } from 'next';

type EnvKeys =
	| 'VALID_EMAILS'
	| 'NEXTAUTH_SECRET'
	| 'GOOGLE_CLIENT_ID'
	| 'GOOGLE_CLIENT_SECRET'
	| 'NEXT_PUBLIC_BUDGET'
	| 'UPSTASH_REDIS_URL'
	| 'UPSTASH_REDIS_TOKEN'
	| 'UPSTASH_REDIS_PREFIX';

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
export type Method = 'GET' | 'POST' | 'PUT';
export type ApiResponse<Response extends ApiSuccessResponse> = NextApiResponse<
	Response | ApiErrorResponse
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
