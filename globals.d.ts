/// <reference types="node" />

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
