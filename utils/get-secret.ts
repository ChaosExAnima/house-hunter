import { readFileSync } from 'fs';
import memoizeOne from 'memoize-one';

export type SecretKeys =
	| 'VALID_EMAILS'
	| 'GOOGLE_CLIENT_ID'
	| 'GOOGLE_CLIENT_SECRET';

export function getSecret(key: SecretKeys): string {
	let secret = process.env[key.toUpperCase()];
	if (!secret) {
		const file = process.env[`${key.toUpperCase()}_FILE`];
		if (file) {
			try {
				secret = readFileSync(file, 'utf-8');
			} catch (err) {
				throw new Error(`Secret "${key}" not readable`);
			}
		} else {
			throw new Error(`Secret "${key}" not set`);
		}
	}
	return secret || '';
}

export default memoizeOne(getSecret);
