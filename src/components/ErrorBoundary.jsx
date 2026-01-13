/**
 * @file Error Boundary component for catching React errors.
 * Provides graceful degradation when components crash.
 */
import React from "react";
import PropTypes from "prop-types";
import { logger } from "@/services/logger";

/**
 * Error Boundary component that catches JavaScript errors anywhere in the child component tree.
 * Logs errors and displays a fallback UI instead of crashing the whole app.
 *
 * @class ErrorBoundary
 * @extends {React.Component}
 *
 * @example
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  /**
   * Update state so the next render will show the fallback UI.
   * @param {Error} error - The error that was thrown
   * @returns {object} New state object
   */
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  /**
   * Log error details for debugging.
   * @param {Error} error - The error that was thrown
   * @param {object} errorInfo - Component stack trace
   */
  componentDidCatch(error, errorInfo) {
    logger.reactError(error, errorInfo);
    this.setState({ errorInfo });
  }

  /**
   * Reset error boundary state.
   */
  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI or use provided fallback prop
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-900/20">
            <div className="max-w-md p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
                Something went wrong
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                {this.state.error?.message || "An unexpected error occurred"}
              </p>
              <button
                onClick={this.handleReset}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Try Again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};
