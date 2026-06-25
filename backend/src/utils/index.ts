/**
 * GENERAL STATELESS UTILITIES
 * 
 * Put standard, pure helper functions here (e.g. date formatters, currency conversions, 
 * math equations, deep clone operations).
 */

export const StringUtils = {
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  slugify: (str: string): string => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  },
};
export default StringUtils;
