// Overview page - Main dashboard summary
import { Box, Container, Grid, Paper, Typography, Card, CardContent } from '@mui/material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockOverviewData, mockTimeSeriesData, mockAnomalyDistribution } from '../mockData';

// Color palette for charts
const ANOMALY_COLORS = ['#d32f2f', '#f57c00', '#fbc02d', '#1976d2'];

export default function Overview() {
  const { totalAnalyzed, anomaliesDetected, anomalyRate, systemHealth } = mockOverviewData;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        System Overview
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Analyzed
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {totalAnalyzed.toLocaleString()}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Cloud requests processed
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="error" gutterBottom>
                Anomalies Detected
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#d32f2f' }}>
                {anomaliesDetected}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Suspicious activities
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Anomaly Rate
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {anomalyRate.toFixed(2)}%
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Percentage of requests
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="success.main" gutterBottom>
                System Health
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#388e3c' }}>
                {systemHealth}%
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Model performance
              </Typography>
            </CardContent>
          </Card>
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
          </Paper>
        </Grid>

        {/* Anomaly Distribution Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Anomaly Types
            </Typography>
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
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
