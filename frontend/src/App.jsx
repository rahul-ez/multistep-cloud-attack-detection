import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { Component, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import ModelPredictions from './pages/ModelPredictions';
import EnsembleScoring from './pages/EnsembleScoring';
import PerformanceMetrics from './pages/PerformanceMetrics';
import FeatureInsights from './pages/FeatureInsights';
import errorLogger from './utils/errorLogger';
import './App.css';

const DRAWER_WIDTH = 260;

// Error Boundary Component to catch React component errors
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
    errorLogger.debug('ErrorBoundary', 'Error boundary initialized');
  }

  static getDerivedStateFromError(error) {
    errorLogger.error('ErrorBoundary', 'getDerivedStateFromError triggered', error);
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    errorLogger.componentError('ErrorBoundary', error, {
      componentStack: errorInfo?.componentStack,
      errorBoundary: this.props.name || 'Root',
    });
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      errorLogger.warn('ErrorBoundary', 'Rendering fallback UI');
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#fafafa',
            p: 4,
          }}
        >
          <Box sx={{ textAlign: 'center', maxWidth: 600 }}>
            <Typography variant="h4" color="error" sx={{ mb: 2, fontWeight: 600 }}>
              Something went wrong
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, color: '#666' }}>
              An unexpected error occurred. Please refresh the page or contact support.
            </Typography>
            <Typography variant="caption" sx={{ color: '#999', display: 'block', mb: 2 }}>
              Error: {this.state.error?.message || 'Unknown error'}
            </Typography>
            <button
              onClick={() => {
                errorLogger.userAction('ErrorBoundary', 'Retry button clicked');
                window.location.reload();
              }}
              style={{
                padding: '10px 20px',
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Refresh Page
            </button>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

function App() {
  useEffect(() => {
    errorLogger.componentMount('App');
    errorLogger.info('App', 'Main application component mounted', {
      routes: ['/', '/predictions', '/ensemble', '/metrics', '/features'],
    });

    return () => {
      errorLogger.componentUnmount('App');
    };
  }, []);

  errorLogger.debug('App', 'Rendering main application layout');

  return (
    <ErrorBoundary name="AppRoot">
      <Router>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          {/* Sidebar */}
          <ErrorBoundary name="Sidebar">
            <Sidebar />
          </ErrorBoundary>

          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flex: 1,
              backgroundColor: '#fafafa',
              minHeight: '100vh',
              overflow: 'auto',
            }}
          >
            <ErrorBoundary name="MainContent">
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/predictions" element={<ModelPredictions />} />
                <Route path="/ensemble" element={<EnsembleScoring />} />
                <Route path="/metrics" element={<PerformanceMetrics />} />
                <Route path="/features" element={<FeatureInsights />} />
              </Routes>
            </ErrorBoundary>
          </Box>
        </Box>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
