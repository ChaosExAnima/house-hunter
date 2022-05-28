/// <reference types="node" />

declare namespace NodeJS {
	interface ProcessEnv {
		readonly GOOGLE_CLIENT_ID?: string;
		readonly GOOGLE_CLIENT_SECRET?: string;
		readonly GOOGLE_CLIENT_ID_FILE?: string;
		readonly GOOGLE_CLIENT_SECRET_FILE?: string;
	}
}

interface Image {
	src: string;
	alt?: string;
}
