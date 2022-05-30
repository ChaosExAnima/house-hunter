import { MINUTE_IN_SECONDS } from 'config/constants';
import redis, { cachePrefix } from 'config/redis';
import getSecret from 'utils/get-secret';

import Data from './data';

const disableCache = getSecret('DISABLE_CACHE', 'no') === 'yes';

export default abstract class CachedData extends Data {
	private redis;
	private bypassTimes = 0;
	protected readonly prefix = this.constructor.name.toLowerCase();
	protected readonly defaultTtl = MINUTE_IN_SECONDS * 15;

	public constructor(protected readonly useCache = disableCache) {
		super();
		this.redis = redis;
	}

	protected async getCache<Output = any>(
		key: string,
		prefix = this.prefix,
	): Promise<Output | null> {
		if (!this.useCache) {
			return null;
		} else if (this.bypassTimes > 0) {
			this.bypassTimes--;
			return null;
		}
		return this.redis.get(this.cacheKey(key, prefix));
	}

	protected setCache<Value = any>(
		key: string,
		value: Value,
		ttl = this.defaultTtl,
		prefix = this.prefix,
	): Promise<Value | null> {
		return this.redis.set(this.cacheKey(key, prefix), value, {
			ex: ttl,
		});
	}

	protected async clearCache(key: string, prefix = this.prefix) {
		await this.redis.del(this.cacheKey(key, prefix));
	}

	protected insertCacheMap<Value = any>(
		key: string,
		map: Record<string, Value>,
		prefix = this.prefix,
	) {
		return this.redis.hset(this.cacheKey(key, prefix), map);
	}

	protected async getCacheMapValue<Output = any>(
		key: string,
		field: string,
		prefix = this.prefix,
	): Promise<Output | null> {
		if (!this.useCache) {
			return null;
		} else if (this.bypassTimes > 0) {
			this.bypassTimes--;
			return null;
		}
		return this.redis.hget(this.cacheKey(key, prefix), field);
	}

	protected async getCacheMap<Output = any>(
		key: string,
		prefix = this.prefix,
	): Promise<Record<string, Output> | null> {
		if (!this.useCache) {
			return null;
		} else if (this.bypassTimes > 0) {
			this.bypassTimes--;
			return null;
		}
		return this.redis.hvals(this.cacheKey(key, prefix));
	}

	protected bypassCache(times = 1) {
		this.bypassTimes += times;
	}

	private cacheKey(key: string, prefix: string) {
		return `${cachePrefix}:${prefix}:${key}`;
	}
}
