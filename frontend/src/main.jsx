import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import errorLogger from './utils/errorLogger'

// Log application initialization
errorLogger.info('Main', 'Application initialization started', {
  environment: import.meta.env.MODE,
  timestamp: new Date().toISOString(),
});

// Global error handler for uncaught errors
window.onerror = (message, source, lineno, colno, error) => {
  errorLogger.fatal('Global', 'Uncaught error', error, {
    message,
    source,
    lineno,
    colno,
  });
  return false;
};

// Global promise rejection handler
window.onunhandledrejection = (event) => {
  errorLogger.error('Global', 'Unhandled promise rejection', event.reason, {
    promise: event.promise,
  });
};

try {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    errorLogger.fatal('Main', 'Root element not found in DOM');
    throw new Error('Root element not found');
  }

  errorLogger.debug('Main', 'Root element found, creating React root');
  
  const root = createRoot(rootElement);
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );

  errorLogger.info('Main', 'Application rendered successfully');
} catch (error) {
  errorLogger.fatal('Main', 'Failed to initialize application', error);
  
  // Display fallback UI
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: sans-serif;">
        <div style="text-align: center; padding: 20px;">
          <h1 style="color: #d32f2f;">Application Error</h1>
          <p>Failed to load the application. Please refresh the page or contact support.</p>
          <p style="color: #666; font-size: 12px;">Error: ${error.message}</p>
        </div>
      </div>
    `;
  }
}
