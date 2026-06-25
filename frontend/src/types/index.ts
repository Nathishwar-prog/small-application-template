/**
 * CLIENT DECLARED TYPES INDEX
 *
 * Keep global declarations, custom type overrides, or shared API response
 * interfaces here.
 */

export interface IApiResponseWrapper<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: Record<string, unknown>;
}
