import { readFileSync } from 'fs';
import mem from 'mem';

export function getSecret(key: EnvKeys): string {
	let secret = process.env[key];
	if (!secret) {
		const file = process.env[`${key}_FILE`];
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

export default mem(getSecret);
