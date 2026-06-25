/**
 * GLOBAL CONSTANTS Blueprint
 * 
 * Keep immutable values here (e.g. status codes, regex patterns, configurations, pagination defaults)
 */

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 100,
};

export const SECURITY_HEADERS = {
  X_FRAME_OPTIONS: 'SAMEORIGIN',
  CONTENT_SECURITY_POLICY: "default-src 'self'",
};
