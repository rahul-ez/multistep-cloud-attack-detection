// Ensemble Scoring page - Combined model scoring
import { useEffect, useState } from 'react';
import { Box, Container, Paper, Typography, Card, CardContent, Grid, Chip } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockEnsembleScores } from '../mockData';
import errorLogger from '../utils/errorLogger';

export default function EnsembleScoring() {
  const [renderError, setRenderError] = useState(null);
  const [statistics, setStatistics] = useState({
    avgScore: '0.000',
    maxScore: '0.000',
    minScore: '0.000',
    anomalyCount: 0,
  });

  useEffect(() => {
    try {
      errorLogger.componentMount('EnsembleScoring');
      errorLogger.info('EnsembleScoring', 'Ensemble Scoring page initialized');

      // Validate and log ensemble scores data
      if (mockEnsembleScores) {
        errorLogger.dataLoad('EnsembleScoring', 'mockEnsembleScores', 'success', {
          recordCount: mockEnsembleScores.length,
        });

        // Calculate statistics with error handling
        try {
          errorLogger.calculation('EnsembleScoring', 'statistics', 'started');
          
          const scores = mockEnsembleScores.map(d => d.score);
          
          if (scores.length === 0) {
            errorLogger.warn('EnsembleScoring', 'No scores available for statistics calculation');
            return;
          }

          const avgScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(3);
          const maxScore = Math.max(...scores).toFixed(3);
          const minScore = Math.min(...scores).toFixed(3);
          const anomalyCount = mockEnsembleScores.filter(d => d.decision === 'Anomaly').length;

          setStatistics({ avgScore, maxScore, minScore, anomalyCount });

          errorLogger.calculation('EnsembleScoring', 'statistics', 'success', {
            avgScore,
            maxScore,
            minScore,
            anomalyCount,
          });
        } catch (calcError) {
          errorLogger.calculation('EnsembleScoring', 'statistics', 'error', {
            error: calcError.message,
          });
        }
      } else {
        errorLogger.dataLoad('EnsembleScoring', 'mockEnsembleScores', 'error', {
          error: 'Data is null or undefined',
        });
      }
    } catch (error) {
      errorLogger.error('EnsembleScoring', 'Error during component initialization', error);
      setRenderError(error.message);
    }

    return () => {
      errorLogger.componentUnmount('EnsembleScoring');
    };
  }, []);

  const { avgScore, maxScore, minScore, anomalyCount } = statistics;

  // Render statistics card
  const renderStatCard = (title, value, subtitle, valueColor = null) => {
    try {
      errorLogger.debug('EnsembleScoring', `Rendering stat card: ${title}`);
      return (
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600, color: valueColor }}>
              {value}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {subtitle}
            </Typography>
          </CardContent>
        </Card>
      );
    } catch (error) {
      errorLogger.error('EnsembleScoring', `Error rendering stat card: ${title}`, error);
      return (
        <Card>
          <CardContent>
            <Typography color="error">Error loading {title}</Typography>
          </CardContent>
        </Card>
      );
    }
  };

  // Render line chart
  const renderLineChart = () => {
    try {
      errorLogger.chartRender('EnsembleScoring', 'LineChart', 'started');

      if (!mockEnsembleScores || mockEnsembleScores.length === 0) {
        errorLogger.chartRender('EnsembleScoring', 'LineChart', 'error', { reason: 'No data available' });
        return <Typography color="textSecondary">No ensemble score data available</Typography>;
      }

      errorLogger.chartRender('EnsembleScoring', 'LineChart', 'success', {
        dataPoints: mockEnsembleScores.length,
      });

      return (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={mockEnsembleScores}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis domain={[0, 1]} />
            <Tooltip 
              formatter={(value) => value.toFixed(3)}
              label={{ formatter: (label) => `Time: ${label}` }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#1976d2"
              dot={{ fill: '#1976d2', r: 5 }}
              activeDot={{ r: 7 }}
              name="Anomaly Score"
            />
          </LineChart>
        </ResponsiveContainer>
      );
    } catch (error) {
      errorLogger.chartRender('EnsembleScoring', 'LineChart', 'error', { error: error.message });
      return <Typography color="error">Error rendering line chart</Typography>;
    }
  };

  // Render results table
  const renderResultsTable = () => {
    try {
      errorLogger.debug('EnsembleScoring', 'Rendering results table');

      if (!mockEnsembleScores || mockEnsembleScores.length === 0) {
        errorLogger.warn('EnsembleScoring', 'No data for results table');
        return <Typography color="textSecondary">No results data available</Typography>;
      }

      return (
        <Box sx={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Timestamp</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Score</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Decision</th>
                <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Confidence</th>
              </tr>
            </thead>
            <tbody>
              {mockEnsembleScores.map((row, idx) => {
                try {
                  const isAnomaly = row.decision === 'Anomaly';
                  const confidence = Math.abs(row.score - 0.5) * 2; // Distance from neutral
                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px' }}>{row.timestamp}</td>
                      <td style={{ padding: '12px', textAlign: 'center', fontWeight: 600 }}>
                        <Box sx={{ color: isAnomaly ? '#d32f2f' : '#388e3c' }}>
                          {row.score.toFixed(3)}
                        </Box>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <Chip
                          label={row.decision}
                          color={isAnomaly ? 'error' : 'success'}
                          variant="outlined"
                          size="small"
                        />
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        {(confidence * 100).toFixed(1)}%
                      </td>
                    </tr>
                  );
                } catch (rowError) {
                  errorLogger.error('EnsembleScoring', `Error rendering table row ${idx}`, rowError);
                  return (
                    <tr key={idx}>
                      <td colSpan={4}>
                        <Typography color="error">Error rendering row</Typography>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </Box>
      );
    } catch (error) {
      errorLogger.error('EnsembleScoring', 'Error rendering results table', error);
      return <Typography color="error">Error rendering results table</Typography>;
    }
  };

  if (renderError) {
    errorLogger.error('EnsembleScoring', 'Render error state active', null, { error: renderError });
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">Error loading Ensemble Scoring: {renderError}</Typography>
      </Container>
    );
  }

  try {
    errorLogger.debug('EnsembleScoring', 'Rendering main EnsembleScoring component');

    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Ensemble Anomaly Scoring
        </Typography>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            {renderStatCard('Average Score', avgScore, 'Mean ensemble score')}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {renderStatCard('Max Score', maxScore, 'Highest anomaly score', '#d32f2f')}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            {renderStatCard('Min Score', minScore, 'Lowest anomaly score', '#388e3c')}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="error" gutterBottom>
                  Flagged Anomalies
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {anomalyCount}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Score threshold &gt; 0.7
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Ensemble Score Time Series */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Ensemble Score Over Time
          </Typography>
          {renderLineChart()}
          <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#666' }}>
            <strong>Interpretation:</strong> Scores &gt; 0.7 (red line) indicate likely anomalies. Ensemble combines predictions from all three models.
          </Typography>
        </Paper>

        {/* Detailed Results Table */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Detailed Ensemble Results
          </Typography>
          {renderResultsTable()}
        </Paper>

        {/* Explanation Box */}
        <Paper sx={{ p: 3, mt: 4, backgroundColor: '#f3e5f5', borderLeft: '4px solid #7b1fa2' }}>
          <Typography variant="body2" sx={{ color: '#4a148c' }}>
            <strong>Ensemble Method:</strong> The final anomaly score is computed by averaging predictions from Random Forest, XGBoost, and Isolation Forest. 
            A threshold of 0.5 is used to classify as anomaly, but scores above 0.7 are considered high-confidence anomalies.
          </Typography>
        </Paper>
      </Container>
    );
  } catch (error) {
    errorLogger.fatal('EnsembleScoring', 'Critical error rendering EnsembleScoring', error);
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">Failed to render Ensemble Scoring page</Typography>
      </Container>
    );
  }
}
