/**
 * @file Redux status constants.
 * Defines all possible status values for async operations.
 */

/**
 * Redux async operation status values.
 * @enum {string}
 * @readonly
 */
export const ReduxStatus = {
  /** Initial state, no operation started */
  IDLE: "idle",
  /** Operation in progress */
  LOADING: "loading",
  /** Operation completed successfully */
  SUCCEEDED: "succeeded",
  /** Operation failed with error */
  FAILED: "failed",
};

/**
 * Type guard to check if a value is a valid ReduxStatus.
 * @param {string} status - Status value to check
 * @returns {boolean} True if valid status
 */
export const isValidStatus = (status) => {
  return Object.values(ReduxStatus).includes(status);
};
