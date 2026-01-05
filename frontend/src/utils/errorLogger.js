// Error Logging Utility for Cloud Attack Detection Dashboard
// Centralized error logging with console output and optional backend reporting

const LOG_LEVELS = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  FATAL: 'FATAL',
};

// Configuration for error logging
const config = {
  enableConsoleLogging: true,
  enableStackTrace: true,
  logLevel: LOG_LEVELS.DEBUG,
  appName: 'CloudGuard-Dashboard',
};

/**
 * Formats a log message with timestamp and metadata
 */
const formatLogMessage = (level, component, message, data = null) => {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    component,
    message,
    data,
    appName: config.appName,
  };
  return logEntry;
};

/**
 * Logs to console with appropriate styling
 */
const logToConsole = (level, component, message, data = null, error = null) => {
  if (!config.enableConsoleLogging) return;

  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level}] [${component}]`;

  const styles = {
    DEBUG: 'color: #888; font-style: italic;',
    INFO: 'color: #1976d2; font-weight: bold;',
    WARN: 'color: #f57c00; font-weight: bold;',
    ERROR: 'color: #d32f2f; font-weight: bold;',
    FATAL: 'color: #fff; background-color: #d32f2f; font-weight: bold; padding: 2px 6px;',
  };

  console.group(`%c${prefix}`, styles[level] || '');
  console.log(`Message: ${message}`);
  
  if (data !== null && data !== undefined) {
    console.log('Data:', data);
  }
  
  if (error) {
    console.error('Error Object:', error);
    if (config.enableStackTrace && error.stack) {
      console.log('Stack Trace:', error.stack);
    }
  }
  
  console.groupEnd();
};

/**
 * Main error logger object
 */
const errorLogger = {
  /**
   * Log debug level messages
   */
  debug: (component, message, data = null) => {
    logToConsole(LOG_LEVELS.DEBUG, component, message, data);
    return formatLogMessage(LOG_LEVELS.DEBUG, component, message, data);
  },

  /**
   * Log info level messages
   */
  info: (component, message, data = null) => {
    logToConsole(LOG_LEVELS.INFO, component, message, data);
    return formatLogMessage(LOG_LEVELS.INFO, component, message, data);
  },

  /**
   * Log warning level messages
   */
  warn: (component, message, data = null) => {
    logToConsole(LOG_LEVELS.WARN, component, message, data);
    return formatLogMessage(LOG_LEVELS.WARN, component, message, data);
  },

  /**
   * Log error level messages
   */
  error: (component, message, error = null, data = null) => {
    logToConsole(LOG_LEVELS.ERROR, component, message, data, error);
    const logEntry = formatLogMessage(LOG_LEVELS.ERROR, component, message, {
      ...data,
      errorMessage: error?.message,
      errorStack: error?.stack,
    });
    return logEntry;
  },

  /**
   * Log fatal level messages
   */
  fatal: (component, message, error = null, data = null) => {
    logToConsole(LOG_LEVELS.FATAL, component, message, data, error);
    const logEntry = formatLogMessage(LOG_LEVELS.FATAL, component, message, {
      ...data,
      errorMessage: error?.message,
      errorStack: error?.stack,
    });
    return logEntry;
  },

  /**
   * Log component lifecycle events
   */
  componentMount: (component) => {
    logToConsole(LOG_LEVELS.DEBUG, component, 'Component mounted');
  },

  componentUnmount: (component) => {
    logToConsole(LOG_LEVELS.DEBUG, component, 'Component unmounted');
  },

  componentError: (component, error, errorInfo = null) => {
    logToConsole(LOG_LEVELS.ERROR, component, 'Component error boundary caught error', errorInfo, error);
  },

  /**
   * Log data operations
   */
  dataLoad: (component, dataType, status, data = null) => {
    const message = `Data load ${status}: ${dataType}`;
    if (status === 'success') {
      logToConsole(LOG_LEVELS.INFO, component, message, data);
    } else if (status === 'error') {
      logToConsole(LOG_LEVELS.ERROR, component, message, data);
    } else {
      logToConsole(LOG_LEVELS.DEBUG, component, message, data);
    }
  },

  /**
   * Log user interactions
   */
  userAction: (component, action, details = null) => {
    logToConsole(LOG_LEVELS.INFO, component, `User action: ${action}`, details);
  },

  /**
   * Log navigation events
   */
  navigation: (component, from, to) => {
    logToConsole(LOG_LEVELS.INFO, component, `Navigation: ${from} -> ${to}`);
  },

  /**
   * Log performance metrics
   */
  performance: (component, metric, value, unit = 'ms') => {
    logToConsole(LOG_LEVELS.DEBUG, component, `Performance: ${metric} = ${value}${unit}`);
  },

  /**
   * Log API calls
   */
  apiCall: (component, method, endpoint, status, data = null) => {
    const level = status >= 400 ? LOG_LEVELS.ERROR : LOG_LEVELS.INFO;
    logToConsole(level, component, `API ${method} ${endpoint} - Status: ${status}`, data);
  },

  /**
   * Log chart/visualization rendering
   */
  chartRender: (component, chartType, status, data = null) => {
    const message = `Chart render ${status}: ${chartType}`;
    if (status === 'error') {
      logToConsole(LOG_LEVELS.ERROR, component, message, data);
    } else {
      logToConsole(LOG_LEVELS.DEBUG, component, message, data);
    }
  },

  /**
   * Log calculation/computation operations
   */
  calculation: (component, operation, status, result = null) => {
    const message = `Calculation ${status}: ${operation}`;
    if (status === 'error') {
      logToConsole(LOG_LEVELS.ERROR, component, message, result);
    } else {
      logToConsole(LOG_LEVELS.DEBUG, component, message, result);
    }
  },
};

// Export configuration methods
export const setLogLevel = (level) => {
  if (LOG_LEVELS[level]) {
    config.logLevel = level;
    errorLogger.info('ErrorLogger', `Log level set to ${level}`);
  }
};

export const enableConsoleLogging = (enable) => {
  config.enableConsoleLogging = enable;
};

export const enableStackTrace = (enable) => {
  config.enableStackTrace = enable;
};

export { LOG_LEVELS };
export default errorLogger;
