import { readFileSync } from 'fs';
import mem from 'mem';

import type { EnvKeys } from 'globals';

function getSecret(key: EnvKeys, fallback?: string): string {
	let secret = process.env[key];
	if (!secret) {
		const file = process.env[`${key}_FILE`];
		if (file) {
			try {
				secret = readFileSync(file, 'utf-8');
			} catch (err) {
				if (fallback) {
					return fallback;
				}
				throw new Error(`Secret "${key}" not readable`);
			}
		} else if (!fallback) {
			throw new Error(`Secret "${key}" not set`);
		}
	}

	return secret ?? (fallback || '');
}

export default mem(getSecret);
