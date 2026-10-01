export const SERVER_LIMITS = {
  // Request body size limit
  maxBodySize: '6mb',

  // Rate limit for AI endpoints (/api/ai/*)
  aiRateLimit: {
    windowMs: 60 * 1000, // 1 minute window
    maxRequestsPerWindow: 20 // 20 requests per minute per IP
  }
} as const;
