/**
 * APPLICATION HELPER SHORTCUTS
 *
 * Create helper wrappers that integrate with framework dependencies (e.g. Express Request parsers,
 * IP checkers, or response decorators).
 */

export const HealthCheckHelper = {
  getSystemMetrics: () => {
    return {
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      timestamp: Date.now(),
    };
  },
};
export default HealthCheckHelper;
