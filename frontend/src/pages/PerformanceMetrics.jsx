// Performance Metrics page - Model evaluation metrics
import { useEffect, useState } from 'react';
import { Box, Container, Paper, Typography, Grid, Card, CardContent, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { mockPerformanceMetrics, mockFeatureImportance } from '../mockData';
import errorLogger from '../utils/errorLogger';

export default function PerformanceMetrics() {
  const [renderError, setRenderError] = useState(null);
  const [derivedMetrics, setDerivedMetrics] = useState({
    sensitivity: '0.000',
    specificity: '0.000',
    accuracy: '0.000',
  });

  useEffect(() => {
    try {
      errorLogger.componentMount('PerformanceMetrics');
      errorLogger.info('PerformanceMetrics', 'Performance Metrics page initialized');

      // Validate and log performance metrics data
      if (mockPerformanceMetrics) {
        errorLogger.dataLoad('PerformanceMetrics', 'mockPerformanceMetrics', 'success', {
          rocAuc: mockPerformanceMetrics.rocAuc,
          precision: mockPerformanceMetrics.precision,
          recall: mockPerformanceMetrics.recall,
        });

        // Calculate derived metrics
        try {
          errorLogger.calculation('PerformanceMetrics', 'derivedMetrics', 'started');
          
          const { confusionMatrix } = mockPerformanceMetrics;
          
          if (confusionMatrix) {
            const sensitivity = (confusionMatrix.truePositive / 
              (confusionMatrix.truePositive + confusionMatrix.falseNegative)).toFixed(3);
            const specificity = (confusionMatrix.trueNegative / 
              (confusionMatrix.trueNegative + confusionMatrix.falsePositive)).toFixed(3);
            const accuracy = ((confusionMatrix.truePositive + confusionMatrix.trueNegative) / 
              (confusionMatrix.truePositive + confusionMatrix.trueNegative + 
               confusionMatrix.falsePositive + confusionMatrix.falseNegative)).toFixed(3);

            setDerivedMetrics({ sensitivity, specificity, accuracy });

            errorLogger.calculation('PerformanceMetrics', 'derivedMetrics', 'success', {
              sensitivity,
              specificity,
              accuracy,
            });
          } else {
            errorLogger.warn('PerformanceMetrics', 'Confusion matrix data not available');
          }
        } catch (calcError) {
          errorLogger.calculation('PerformanceMetrics', 'derivedMetrics', 'error', {
            error: calcError.message,
          });
        }
      } else {
        errorLogger.dataLoad('PerformanceMetrics', 'mockPerformanceMetrics', 'error', {
          error: 'Data is null or undefined',
        });
      }

      // Validate feature importance data
      if (mockFeatureImportance) {
        errorLogger.dataLoad('PerformanceMetrics', 'mockFeatureImportance', 'success', {
          featureCount: mockFeatureImportance.length,
        });
      } else {
        errorLogger.dataLoad('PerformanceMetrics', 'mockFeatureImportance', 'error', {
          error: 'Data is null or undefined',
        });
      }
    } catch (error) {
      errorLogger.error('PerformanceMetrics', 'Error during component initialization', error);
      setRenderError(error.message);
    }

    return () => {
      errorLogger.componentUnmount('PerformanceMetrics');
    };
  }, []);

  // Safely destructure with defaults
  let rocAuc, prAuc, precision, recall, f1Score, confusionMatrix;
  try {
    ({ rocAuc = 0, prAuc = 0, precision = 0, recall = 0, f1Score = 0, confusionMatrix = {} } = mockPerformanceMetrics || {});
  } catch (error) {
    errorLogger.error('PerformanceMetrics', 'Error destructuring performance metrics', error);
    rocAuc = prAuc = precision = recall = f1Score = 0;
    confusionMatrix = { truePositive: 0, trueNegative: 0, falsePositive: 0, falseNegative: 0 };
  }

  const { sensitivity, specificity, accuracy } = derivedMetrics;

  // Prepare confusion matrix visualization data
  const confusionData = [
    { metric: 'True Positive', value: confusionMatrix?.truePositive || 0 },
    { metric: 'True Negative', value: confusionMatrix?.trueNegative || 0 },
    { metric: 'False Positive', value: confusionMatrix?.falsePositive || 0 },
    { metric: 'False Negative', value: confusionMatrix?.falseNegative || 0 },
  ];

  // Render metric card
  const renderMetricCard = (title, value, subtitle) => {
    try {
      errorLogger.debug('PerformanceMetrics', `Rendering metric card: ${title}`);
      const numericValue = typeof value === 'number' ? value : parseFloat(value) || 0;
      return (
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              {numericValue.toFixed ? numericValue.toFixed(3) : numericValue}
            </Typography>
            <LinearProgress variant="determinate" value={numericValue * 100} sx={{ mb: 1 }} />
            <Typography variant="caption" color="textSecondary">
              {subtitle}
            </Typography>
          </CardContent>
        </Card>
      );
    } catch (error) {
      errorLogger.error('PerformanceMetrics', `Error rendering metric card: ${title}`, error);
      return (
        <Card>
          <CardContent>
            <Typography color="error">Error loading {title}</Typography>
          </CardContent>
        </Card>
      );
    }
  };

  // Render confusion matrix chart
  const renderConfusionChart = () => {
    try {
      errorLogger.chartRender('PerformanceMetrics', 'ConfusionMatrixChart', 'started');

      if (confusionData.every(d => d.value === 0)) {
        errorLogger.chartRender('PerformanceMetrics', 'ConfusionMatrixChart', 'error', {
          reason: 'All values are zero',
        });
        return <Typography color="textSecondary">No confusion matrix data available</Typography>;
      }

      errorLogger.chartRender('PerformanceMetrics', 'ConfusionMatrixChart', 'success');

      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={confusionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      );
    } catch (error) {
      errorLogger.chartRender('PerformanceMetrics', 'ConfusionMatrixChart', 'error', {
        error: error.message,
      });
      return <Typography color="error">Error rendering confusion matrix chart</Typography>;
    }
  };

  // Render feature importance chart
  const renderFeatureChart = () => {
    try {
      errorLogger.chartRender('PerformanceMetrics', 'FeatureImportanceChart', 'started');

      if (!mockFeatureImportance || mockFeatureImportance.length === 0) {
        errorLogger.chartRender('PerformanceMetrics', 'FeatureImportanceChart', 'error', {
          reason: 'No data available',
        });
        return <Typography color="textSecondary">No feature importance data available</Typography>;
      }

      errorLogger.chartRender('PerformanceMetrics', 'FeatureImportanceChart', 'success', {
        featureCount: mockFeatureImportance.length,
      });

      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockFeatureImportance} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="feature" type="category" width={150} />
            <Tooltip />
            <Bar dataKey="importance" fill="#ff7043" />
          </BarChart>
        </ResponsiveContainer>
      );
    } catch (error) {
      errorLogger.chartRender('PerformanceMetrics', 'FeatureImportanceChart', 'error', {
        error: error.message,
      });
      return <Typography color="error">Error rendering feature importance chart</Typography>;
    }
  };

  // Render confusion matrix table
  const renderConfusionTable = () => {
    try {
      errorLogger.debug('PerformanceMetrics', 'Rendering confusion matrix table');

      return (
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>Metric</strong></TableCell>
                <TableCell align="center"><strong>Count</strong></TableCell>
                <TableCell align="center"><strong>Description</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ backgroundColor: '#e8f5e9' }}>
                <TableCell><strong>True Positive</strong></TableCell>
                <TableCell align="center">{confusionMatrix?.truePositive || 0}</TableCell>
                <TableCell align="center">Correctly identified anomalies</TableCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                <TableCell><strong>True Negative</strong></TableCell>
                <TableCell align="center">{confusionMatrix?.trueNegative || 0}</TableCell>
                <TableCell align="center">Correctly identified normal traffic</TableCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: '#fff3e0' }}>
                <TableCell><strong>False Positive</strong></TableCell>
                <TableCell align="center">{confusionMatrix?.falsePositive || 0}</TableCell>
                <TableCell align="center">Normal traffic wrongly flagged</TableCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: '#ffebee' }}>
                <TableCell><strong>False Negative</strong></TableCell>
                <TableCell align="center">{confusionMatrix?.falseNegative || 0}</TableCell>
                <TableCell align="center">Anomalies not detected</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      );
    } catch (error) {
      errorLogger.error('PerformanceMetrics', 'Error rendering confusion matrix table', error);
      return <Typography color="error">Error rendering confusion matrix table</Typography>;
    }
  };

  if (renderError) {
    errorLogger.error('PerformanceMetrics', 'Render error state active', null, { error: renderError });
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">Error loading Performance Metrics: {renderError}</Typography>
      </Container>
    );
  }

  try {
    errorLogger.debug('PerformanceMetrics', 'Rendering main PerformanceMetrics component');

    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Performance Metrics
        </Typography>

        {/* Key Metrics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            {renderMetricCard('ROC-AUC Score', rocAuc, 'Receiver Operating Characteristic')}
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            {renderMetricCard('PR-AUC Score', prAuc, 'Precision-Recall Area Under Curve')}
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            {renderMetricCard('F1-Score', f1Score, 'Harmonic mean of precision & recall')}
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            {renderMetricCard('Precision', precision, 'True positives vs all positives')}
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            {renderMetricCard('Recall (Sensitivity)', recall, 'True positives detection rate')}
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            {renderMetricCard('Accuracy', parseFloat(accuracy), 'Overall prediction correctness')}
          </Grid>
        </Grid>

        {/* Confusion Matrix Visualization */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Confusion Matrix
              </Typography>
              {renderConfusionChart()}
            </Paper>
          </Grid>

          {/* Derived Metrics */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Derived Metrics
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>Sensitivity (True Positive Rate)</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{sensitivity}</Typography>
                </Box>
                <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>Specificity (True Negative Rate)</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>{specificity}</Typography>
                </Box>
                <Box sx={{ p: 2, backgroundColor: '#e8f5e9', borderRadius: 1 }}>
                  <Typography variant="body2" sx={{ color: '#2e7d32' }}>Accuracy</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#2e7d32' }}>{accuracy}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Confusion Matrix Table */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Confusion Matrix Breakdown
          </Typography>
          {renderConfusionTable()}
        </Paper>

        {/* Feature Importance */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Top Feature Importance
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
            Features that contribute most to model predictions (placeholder for SHAP values)
          </Typography>
          {renderFeatureChart()}
        </Paper>
      </Container>
    );
  } catch (error) {
    errorLogger.fatal('PerformanceMetrics', 'Critical error rendering PerformanceMetrics', error);
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">Failed to render Performance Metrics page</Typography>
      </Container>
    );
  }
}
