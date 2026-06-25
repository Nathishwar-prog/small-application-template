/**
 * CLIENT DATA FORMATTING HELPERS
 *
 * Create formatting/mapping functions here (e.g. date conversion strings,
 * clean phone formatting, file byte conversion).
 */

export const Formatter = {
  formatDate: (isoString: string): string => {
    return new Date(isoString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },
  formatBytes: (bytes: number, decimals: number = 2): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  },
};

export default Formatter;
