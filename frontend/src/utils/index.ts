/**
 * STATELESS CLIENT UTILITIES
 * 
 * Put pure, framework-agnostic helper algorithms here.
 */

export const filterNulls = <T>(obj: Record<string, T | null | undefined>): Record<string, T> => {
  const result: Record<string, T> = {};
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (val !== null && val !== undefined) {
      result[key] = val;
    }
  });
  return result;
};
export default filterNulls;
