// Overview page - Main dashboard summary
import { useEffect, useState } from 'react';
import { Box, Container, Grid, Paper, Typography, Card, CardContent } from '@mui/material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockOverviewData, mockTimeSeriesData, mockAnomalyDistribution } from '../mockData';
import errorLogger from '../utils/errorLogger';

// Color palette for charts
const ANOMALY_COLORS = ['#d32f2f', '#f57c00', '#fbc02d', '#1976d2'];

export default function Overview() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [renderError, setRenderError] = useState(null);

  useEffect(() => {
    try {
      errorLogger.componentMount('Overview');
      errorLogger.info('Overview', 'Overview page initialized');
      
      // Log data loading
      errorLogger.dataLoad('Overview', 'mockOverviewData', 'started');
      
      if (mockOverviewData) {
        errorLogger.dataLoad('Overview', 'mockOverviewData', 'success', {
          totalAnalyzed: mockOverviewData.totalAnalyzed,
          anomaliesDetected: mockOverviewData.anomaliesDetected,
        });
        setDataLoaded(true);
      } else {
        errorLogger.dataLoad('Overview', 'mockOverviewData', 'error', { error: 'Data is null or undefined' });
      }

      if (mockTimeSeriesData) {
        errorLogger.dataLoad('Overview', 'mockTimeSeriesData', 'success', {
          dataPoints: mockTimeSeriesData.length,
        });
      }

      if (mockAnomalyDistribution) {
        errorLogger.dataLoad('Overview', 'mockAnomalyDistribution', 'success', {
          categories: mockAnomalyDistribution.length,
        });
      }
    } catch (error) {
      errorLogger.error('Overview', 'Error during component initialization', error);
      setRenderError(error.message);
    }

    return () => {
      errorLogger.componentUnmount('Overview');
    };
  }, []);

  // Safely destructure with error handling
  let totalAnalyzed, anomaliesDetected, anomalyRate, systemHealth;
  try {
    ({ totalAnalyzed, anomaliesDetected, anomalyRate, systemHealth } = mockOverviewData || {});
    
    if (totalAnalyzed === undefined) {
      errorLogger.warn('Overview', 'totalAnalyzed is undefined');
    }
    if (anomaliesDetected === undefined) {
      errorLogger.warn('Overview', 'anomaliesDetected is undefined');
    }
  } catch (error) {
    errorLogger.error('Overview', 'Error destructuring overview data', error);
    totalAnalyzed = 0;
    anomaliesDetected = 0;
    anomalyRate = 0;
    systemHealth = 0;
  }

  // Render KPI card with error handling
  const renderKPICard = (title, value, subtitle, color = 'textSecondary', valueColor = null) => {
    try {
      errorLogger.debug('Overview', `Rendering KPI card: ${title}`, { value });
      return (
        <Card>
          <CardContent>
            <Typography color={color} gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600, color: valueColor }}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {subtitle}
            </Typography>
          </CardContent>
        </Card>
      );
    } catch (error) {
      errorLogger.error('Overview', `Error rendering KPI card: ${title}`, error);
      return (
        <Card>
          <CardContent>
            <Typography color="error">Error loading {title}</Typography>
          </CardContent>
        </Card>
      );
    }
  };

  // Render chart with error handling
  const renderTimeSeriesChart = () => {
    try {
      errorLogger.chartRender('Overview', 'TimeSeriesChart', 'started');
      
      if (!mockTimeSeriesData || mockTimeSeriesData.length === 0) {
        errorLogger.chartRender('Overview', 'TimeSeriesChart', 'error', { reason: 'No data available' });
        return <Typography color="textSecondary">No time series data available</Typography>;
      }

      errorLogger.chartRender('Overview', 'TimeSeriesChart', 'success', { dataPoints: mockTimeSeriesData.length });
      
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockTimeSeriesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="count" stroke="#1976d2" name="Total Requests" />
            <Line yAxisId="right" type="monotone" dataKey="anomalies" stroke="#d32f2f" name="Anomalies" />
          </LineChart>
        </ResponsiveContainer>
      );
    } catch (error) {
      errorLogger.chartRender('Overview', 'TimeSeriesChart', 'error', { error: error.message });
      return <Typography color="error">Error rendering time series chart</Typography>;
    }
  };

  // Render pie chart with error handling
  const renderPieChart = () => {
    try {
      errorLogger.chartRender('Overview', 'PieChart', 'started');
      
      if (!mockAnomalyDistribution || mockAnomalyDistribution.length === 0) {
        errorLogger.chartRender('Overview', 'PieChart', 'error', { reason: 'No data available' });
        return <Typography color="textSecondary">No anomaly distribution data available</Typography>;
      }

      errorLogger.chartRender('Overview', 'PieChart', 'success', { categories: mockAnomalyDistribution.length });
      
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={mockAnomalyDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {mockAnomalyDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={ANOMALY_COLORS[index % ANOMALY_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      );
    } catch (error) {
      errorLogger.chartRender('Overview', 'PieChart', 'error', { error: error.message });
      return <Typography color="error">Error rendering pie chart</Typography>;
    }
  };

  if (renderError) {
    errorLogger.error('Overview', 'Render error state active', null, { error: renderError });
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">Error loading Overview: {renderError}</Typography>
      </Container>
    );
  }

  try {
    errorLogger.debug('Overview', 'Rendering main Overview component');

    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Page Title */}
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          System Overview
        </Typography>

        {/* KPI Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            {renderKPICard('Total Analyzed', totalAnalyzed, 'Cloud requests processed')}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {renderKPICard('Anomalies Detected', anomaliesDetected, 'Suspicious activities', 'error', '#d32f2f')}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {renderKPICard('Anomaly Rate', `${(anomalyRate || 0).toFixed(2)}%`, 'Percentage of requests')}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {renderKPICard('System Health', `${systemHealth || 0}%`, 'Model performance', 'success.main', '#388e3c')}
          </Grid>
        </Grid>

        {/* Charts Row */}
        <Grid container spacing={3}>
          {/* Time Series Chart */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Activity Over Time
              </Typography>
              {renderTimeSeriesChart()}
            </Paper>
          </Grid>

          {/* Anomaly Distribution Pie Chart */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Anomaly Types
              </Typography>
              {renderPieChart()}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  } catch (error) {
    errorLogger.fatal('Overview', 'Critical error rendering Overview', error);
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">Failed to render Overview page</Typography>
      </Container>
    );
  }
}
