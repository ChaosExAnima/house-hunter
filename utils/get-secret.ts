import { readFileSync } from 'fs';

export type SecretKeys = 'GOOGLE_CLIENT_ID' | 'GOOGLE_CLIENT_SECRET';

export default function getSecret(key: SecretKeys): string {
	let secret = process.env[key.toUpperCase()];
	if (!secret) {
		const file = process.env[`${key.toUpperCase()}_FILE`];
		if (file) {
			try {
				secret = readFileSync(file, 'utf-8');
			} catch (err) {
				throw new Error('Secret not readable');
			}
		} else {
			throw new Error('Secret not set');
		}
	}
	return secret;
}
