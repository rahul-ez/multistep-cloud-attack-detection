// Backend Integration Guide
// How to connect the FastAPI backend when it's ready

/**
 * STEP 1: SETUP ENVIRONMENT VARIABLES
 */

// Create .env.local in frontend directory
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=Cloud Guard
VITE_ENABLE_MOCK_DATA=false  // Set to false to use real API

// Access in code:
const API_BASE = import.meta.env.VITE_API_BASE_URL;

/**
 * STEP 2: CREATE API SERVICE LAYER
 */

// File: src/services/api.js

import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token if needed
axiosInstance.interceptors.request.use((config) => {
  // const token = localStorage.getItem('authToken');
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API endpoints
export const api = {
  // Overview endpoints
  getOverview: () => 
    axiosInstance.get('/overview'),
  
  // Predictions endpoints
  getSupervisedPredictions: () =>
    axiosInstance.get('/predictions/supervised'),
  
  getUnsupervisedPredictions: () =>
    axiosInstance.get('/predictions/unsupervised'),
  
  // Ensemble endpoints
  getEnsembleScores: () =>
    axiosInstance.get('/ensemble/scores'),
  
  // Metrics endpoints
  getPerformanceMetrics: () =>
    axiosInstance.get('/metrics/performance'),
  
  getFeatureImportance: () =>
    axiosInstance.get('/metrics/features'),
  
  // Health check
  healthCheck: () =>
    axiosInstance.get('/health'),
};

export default axiosInstance;

/**
 * STEP 3: UPDATE PAGE COMPONENTS
 */

// Example: Overview.jsx with API integration

import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { mockOverviewData } from '../mockData'; // Fallback

export default function Overview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getOverview();
        setData(response.data);
      } catch (err) {
        console.error('Failed to fetch overview:', err);
        // Fallback to mock data if API fails
        setData(mockOverviewData);
        setError('Using demo data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Typography>Loading overview...</Typography>;
  }

  if (error && error !== 'Using demo data') {
    return <Alert severity="error">{error}</Alert>;
  }

  // Rest of component uses data...
}

/**
 * STEP 4: EXPECTED BACKEND RESPONSE FORMATS
 */

// GET /api/overview
{
  "totalAnalyzed": 15432,
  "anomaliesDetected": 287,
  "anomalyRate": 1.86,
  "systemHealth": 98.2,
  "lastUpdated": "2026-01-04T12:45:00Z"
}

// GET /api/predictions/supervised
[
  {
    "id": 1,
    "timestamp": "2026-01-04T10:23:00Z",
    "randomForest": 0.15,
    "xgboost": 0.12,
    "ensemble": 0.13,
    "label": "Normal"
  },
  // ... more predictions
]

// GET /api/predictions/unsupervised
[
  {
    "id": 1,
    "timestamp": "2026-01-04T10:23:00Z",
    "isolationForest": 0.25,
    "anomalyScore": 0.25
  },
  // ... more predictions
]

// GET /api/ensemble/scores
[
  {
    "timestamp": "10:23",
    "score": 0.24,
    "decision": "Normal"
  },
  // ... more scores
]

// GET /api/metrics/performance
{
  "rocAuc": 0.948,
  "prAuc": 0.892,
  "precision": 0.915,
  "recall": 0.875,
  "f1Score": 0.894,
  "confusionMatrix": {
    "truePositive": 156,
    "trueNegative": 12847,
    "falsePositive": 15,
    "falseNegative": 23
  }
}

// GET /api/metrics/features
[
  { "feature": "Request_Size", "importance": 0.285 },
  { "feature": "Response_Time", "importance": 0.212 },
  // ... more features
]

/**
 * STEP 5: ERROR HANDLING PATTERNS
 */

// With try-catch
useEffect(() => {
  const fetch = async () => {
    try {
      const res = await api.getData();
      setData(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        // Handle auth error
      } else if (err.response?.status === 500) {
        // Handle server error
      } else {
        setError('Network error');
      }
    }
  };
  fetch();
}, []);

// With error boundary (optional)
import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Typography color="error">Something went wrong</Typography>;
    }
    return this.props.children;
  }
}

/**
 * STEP 6: LOADING STATES
 */

import { Box, CircularProgress, Skeleton } from '@mui/material';

// Loading spinner
{loading && <CircularProgress />}

// Skeleton loaders
{loading && <Skeleton variant="rectangular" height={200} />}

// Custom loading card
<Paper sx={{ p: 3, textAlign: 'center' }}>
  <CircularProgress />
  <Typography sx={{ mt: 2 }}>Loading predictions...</Typography>
</Paper>

/**
 * STEP 7: CACHING & REFRESH
 */

// Simple refresh timer
useEffect(() => {
  fetchData();
  const interval = setInterval(fetchData, 30000); // Refresh every 30s
  return () => clearInterval(interval);
}, []);

// Manual refresh button
<Button onClick={handleRefresh} variant="contained">
  Refresh Data
</Button>

/**
 * STEP 8: CORS CONFIGURATION
 */

// If backend is on different origin, configure CORS
// In FastAPI backend (main.py):

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174", "https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

/**
 * STEP 9: AUTHENTICATION (If Needed)
 */

// In api.js
const login = async (username, password) => {
  const response = await axiosInstance.post('/auth/login', {
    username,
    password,
  });
  localStorage.setItem('authToken', response.data.token);
  return response.data;
};

// In request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * STEP 10: TESTING API INTEGRATION
 */

// Quick test in browser console:
import { api } from './services/api.js';

api.getOverview()
  .then(res => console.log('Success:', res.data))
  .catch(err => console.error('Error:', err.response?.data || err.message));

/**
 * MIGRATION CHECKLIST
 */

Before removing mock data:
  ☐ Create api.js service
  ☐ Set up environment variables
  ☐ Test API endpoints with Postman/curl
  ☐ Update all pages to use API
  ☐ Add loading states
  ☐ Add error handling
  ☐ Test with real backend
  ☐ Configure CORS if needed
  ☐ Update environment for production
  ☐ Remove mock data imports from pages
  ☐ Add refresh functionality
  ☐ Test error scenarios

/**
 * FALLBACK STRATEGY
 */

// Always provide fallback to mock data during development:

const useFetchData = (endpoint, mockFallback) => {
  const [data, setData] = useState(mockFallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api[endpoint]();
        setData(response.data);
      } catch (err) {
        console.error(`Failed to fetch ${endpoint}:`, err);
        // Keep mock data as fallback
        setError('Using demo data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

// Usage:
const { data, loading, error } = useFetchData(
  'getOverview',
  mockOverviewData
);

/**
 * PERFORMANCE OPTIMIZATION
 */

// 1. Lazy load heavy pages
import { lazy, Suspense } from 'react';

const PerformanceMetrics = lazy(() => import('./pages/PerformanceMetrics'));

<Suspense fallback={<Typography>Loading...</Typography>}>
  <PerformanceMetrics />
</Suspense>

// 2. Implement request debouncing for search
import { useCallback } from 'react';

const handleSearch = useCallback(
  debounce((query) => api.search(query), 500),
  []
);

// 3. Cache API responses
const cache = new Map();
const fetchWithCache = async (key, apiFn) => {
  if (cache.has(key)) return cache.get(key);
  const data = await apiFn();
  cache.set(key, data);
  return data;
};

/**
 * PRODUCTION DEPLOYMENT NOTES
 */

// 1. Update API_BASE for production
// In .env.production:
VITE_API_BASE_URL=https://api.production.com

// 2. Add monitoring/logging
const trackError = (error) => {
  // Send to error tracking service (Sentry, etc)
};

// 3. Implement request retry logic
const retryRequest = async (fn, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
