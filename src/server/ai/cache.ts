import crypto from 'node:crypto';

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

export class MemoryCache {
  private cache = new Map<string, CacheEntry<unknown>>();
  private defaultTtlMs: number;

  constructor(defaultTtlMs: number = 30 * 60 * 1000) {
    this.defaultTtlMs = defaultTtlMs;
  }

  /**
   * Tạo mã hash SHA-256 từ đầu vào bất kỳ để làm khóa cache tất định
   */
  hashKey(input: unknown): string {
    const raw = typeof input === 'string' ? input : JSON.stringify(input);
    return crypto.createHash('sha256').update(raw).digest('hex');
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  set<T>(key: string, data: T, ttlMs?: number): void {
    const expiresAt = Date.now() + (ttlMs ?? this.defaultTtlMs);
    this.cache.set(key, { data, expiresAt });
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const aiCache = new MemoryCache();
