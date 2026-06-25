/**
 * APPLICATION CLASSNAME MERGER
 *
 * A wrapper to combine conditional class names.
 * When clsx and tailwind-merge are installed, replace this implementation with:
 *
 * import { clsx, type ClassValue } from 'clsx';
 * import { twMerge } from 'tailwind-merge';
 *
 * export function cn(...inputs: ClassValue[]) {
 *   return twMerge(clsx(inputs));
 * }
 */
export function cn(...inputs: string[]) {
  return inputs.filter(Boolean).join(' ');
}
