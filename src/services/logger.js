/**
 * @file Centralized logging service for the application.
 * Provides environment-aware logging with support for external monitoring services.
 */

/**
 * Log levels enumeration
 * @enum {string}
 */
const LogLevel = {
  ERROR: "error",
  WARN: "warn",
  INFO: "info",
  DEBUG: "debug",
};

/**
 * Determines if the application is running in development mode
 * @returns {boolean} True if in development mode
 */
const isDevelopment = () => {
  return (
    import.meta.env.VITE_ENABLE_LOGGER === "true" ||
    import.meta.env.MODE === "development"
  );
};

/**
 * Logger class that handles all application logging
 * In production, this can be extended to send logs to external services
 * like Sentry, LogRocket, or DataDog
 */
class Logger {
  /**
   * Logs an error message
   * @param {string} message - The error message
   * @param {Error|object} [error] - Optional error object or additional context
   */
  error(message, error) {
    if (isDevelopment()) {
      console.error(`[ERROR] ${message}`, error);
    }

    // In production, send to error monitoring service
    // Example: Sentry.captureException(error, { extra: { message } });
  }

  /**
   * Logs a warning message
   * @param {string} message - The warning message
   * @param {object} [context] - Optional context data
   */
  warn(message, context) {
    if (isDevelopment()) {
      console.warn(`[WARN] ${message}`, context);
    }

    // In production, you might want to track warnings as well
    // Example: Sentry.captureMessage(message, 'warning');
  }

  /**
   * Logs an informational message
   * @param {string} message - The info message
   * @param {object} [data] - Optional data to log
   */
  info(message, data) {
    if (isDevelopment()) {
      console.info(`[INFO] ${message}`, data);
    }

    // Production: Usually not sent to external services
  }

  /**
   * Logs a debug message (only in development)
   * @param {string} message - The debug message
   * @param {object} [data] - Optional data to log
   */
  debug(message, data) {
    if (isDevelopment()) {
      console.debug(`[DEBUG] ${message}`, data);
    }
  }

  /**
   * Logs API errors with structured data
   * @param {string} endpoint - The API endpoint that failed
   * @param {Error} error - The error object
   * @param {object} [context] - Additional context (request params, etc.)
   */
  apiError(endpoint, error, context = {}) {
    const errorData = {
      endpoint,
      message: error.message,
      stack: error.stack,
      ...context,
    };

    this.error(`API Error: ${endpoint}`, errorData);

    // In production, you might want to send this to your backend
    // or error monitoring service with structured data
  }

  /**
   * Logs React component errors from Error Boundaries
   * @param {Error} error - The error object
   * @param {object} errorInfo - React error info with componentStack
   */
  reactError(error, errorInfo) {
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    };

    this.error("React Component Error", errorData);

    // In production: Send to Sentry
    // if (window.Sentry) {
    //   window.Sentry.captureException(error, {
    //     contexts: { react: errorInfo }
    //   });
    // }
  }
}

// Export a singleton instance
export const logger = new Logger();

// Export LogLevel for use in other modules
export { LogLevel };
