// Model Predictions page - Supervised and unsupervised model outputs
import { useEffect, useState } from 'react';
import { Box, Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Card, CardContent, Chip } from '@mui/material';
import { mockSupervisedPredictions, mockUnsupervisedPredictions } from '../mockData';
import errorLogger from '../utils/errorLogger';

// Helper function to format timestamp
const formatTime = (isoString) => {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      errorLogger.warn('ModelPredictions', 'Invalid timestamp format', { isoString });
      return 'Invalid time';
    }
    return date.toLocaleTimeString();
  } catch (error) {
    errorLogger.error('ModelPredictions', 'Error formatting timestamp', error, { isoString });
    return 'Error';
  }
};

// Helper function to get color based on prediction
const getPredictionColor = (probability) => {
  try {
    if (typeof probability !== 'number' || isNaN(probability)) {
      errorLogger.warn('ModelPredictions', 'Invalid probability value', { probability });
      return '#666';
    }
    if (probability > 0.7) return '#d32f2f'; // Red for anomaly
    if (probability > 0.4) return '#f57c00'; // Orange for uncertain
    return '#388e3c'; // Green for normal
  } catch (error) {
    errorLogger.error('ModelPredictions', 'Error getting prediction color', error);
    return '#666';
  }
};

// Helper function to get chip color based on label
const getLabelChipColor = (label) => {
  try {
    return label === 'Anomaly' ? 'error' : 'success';
  } catch (error) {
    errorLogger.error('ModelPredictions', 'Error getting chip color', error, { label });
    return 'default';
  }
};

export default function ModelPredictions() {
  const [renderError, setRenderError] = useState(null);

  useEffect(() => {
    try {
      errorLogger.componentMount('ModelPredictions');
      errorLogger.info('ModelPredictions', 'Model Predictions page initialized');

      // Validate and log supervised predictions data
      if (mockSupervisedPredictions) {
        errorLogger.dataLoad('ModelPredictions', 'mockSupervisedPredictions', 'success', {
          recordCount: mockSupervisedPredictions.length,
          sampleRecord: mockSupervisedPredictions[0],
        });
      } else {
        errorLogger.dataLoad('ModelPredictions', 'mockSupervisedPredictions', 'error', {
          error: 'Data is null or undefined',
        });
      }

      // Validate and log unsupervised predictions data
      if (mockUnsupervisedPredictions) {
        errorLogger.dataLoad('ModelPredictions', 'mockUnsupervisedPredictions', 'success', {
          recordCount: mockUnsupervisedPredictions.length,
          sampleRecord: mockUnsupervisedPredictions[0],
        });
      } else {
        errorLogger.dataLoad('ModelPredictions', 'mockUnsupervisedPredictions', 'error', {
          error: 'Data is null or undefined',
        });
      }
    } catch (error) {
      errorLogger.error('ModelPredictions', 'Error during component initialization', error);
      setRenderError(error.message);
    }

    return () => {
      errorLogger.componentUnmount('ModelPredictions');
    };
  }, []);

  // Render supervised predictions table
  const renderSupervisedTable = () => {
    try {
      errorLogger.debug('ModelPredictions', 'Rendering supervised predictions table');

      if (!mockSupervisedPredictions || mockSupervisedPredictions.length === 0) {
        errorLogger.warn('ModelPredictions', 'No supervised predictions data available');
        return <Typography color="textSecondary">No supervised predictions data available</Typography>;
      }

      return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>Timestamp</strong></TableCell>
                <TableCell align="center"><strong>Random Forest</strong></TableCell>
                <TableCell align="center"><strong>XGBoost</strong></TableCell>
                <TableCell align="center"><strong>Ensemble</strong></TableCell>
                <TableCell align="center"><strong>Decision</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockSupervisedPredictions.map((row) => {
                try {
                  return (
                    <TableRow key={row.id}>
                      <TableCell>{formatTime(row.timestamp)}</TableCell>
                      <TableCell align="center">
                        <Box sx={{ color: getPredictionColor(row.randomForest), fontWeight: 600 }}>
                          {(row.randomForest * 100).toFixed(1)}%
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ color: getPredictionColor(row.xgboost), fontWeight: 600 }}>
                          {(row.xgboost * 100).toFixed(1)}%
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ color: getPredictionColor(row.ensemble), fontWeight: 600 }}>
                          {(row.ensemble * 100).toFixed(1)}%
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={row.label}
                          color={getLabelChipColor(row.label)}
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  );
                } catch (rowError) {
                  errorLogger.error('ModelPredictions', `Error rendering supervised row ${row.id}`, rowError);
                  return (
                    <TableRow key={row.id || 'error'}>
                      <TableCell colSpan={5}>
                        <Typography color="error">Error rendering row</Typography>
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      );
    } catch (error) {
      errorLogger.error('ModelPredictions', 'Error rendering supervised table', error);
      return <Typography color="error">Error rendering supervised predictions table</Typography>;
    }
  };

  // Render unsupervised predictions table
  const renderUnsupervisedTable = () => {
    try {
      errorLogger.debug('ModelPredictions', 'Rendering unsupervised predictions table');

      if (!mockUnsupervisedPredictions || mockUnsupervisedPredictions.length === 0) {
        errorLogger.warn('ModelPredictions', 'No unsupervised predictions data available');
        return <Typography color="textSecondary">No unsupervised predictions data available</Typography>;
      }

      return (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><strong>Timestamp</strong></TableCell>
                <TableCell align="center"><strong>Isolation Forest</strong></TableCell>
                <TableCell align="center"><strong>Anomaly Score</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockUnsupervisedPredictions.map((row) => {
                try {
                  return (
                    <TableRow key={row.id}>
                      <TableCell>{formatTime(row.timestamp)}</TableCell>
                      <TableCell align="center">
                        <Box sx={{ color: getPredictionColor(row.isolationForest), fontWeight: 600 }}>
                          {(row.isolationForest * 100).toFixed(1)}%
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ color: getPredictionColor(row.anomalyScore), fontWeight: 600 }}>
                          {(row.anomalyScore * 100).toFixed(1)}%
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                } catch (rowError) {
                  errorLogger.error('ModelPredictions', `Error rendering unsupervised row ${row.id}`, rowError);
                  return (
                    <TableRow key={row.id || 'error'}>
                      <TableCell colSpan={3}>
                        <Typography color="error">Error rendering row</Typography>
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      );
    } catch (error) {
      errorLogger.error('ModelPredictions', 'Error rendering unsupervised table', error);
      return <Typography color="error">Error rendering unsupervised predictions table</Typography>;
    }
  };

  if (renderError) {
    errorLogger.error('ModelPredictions', 'Render error state active', null, { error: renderError });
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">Error loading Model Predictions: {renderError}</Typography>
      </Container>
    );
  }

  try {
    errorLogger.debug('ModelPredictions', 'Rendering main ModelPredictions component');

    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Model Predictions
        </Typography>

        {/* Supervised Models Section */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1976d2' }}>
            Supervised Model Predictions
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
            Predictions from Random Forest and XGBoost models with ensemble averaging
          </Typography>
          
          {renderSupervisedTable()}
        </Box>

        {/* Unsupervised Models Section */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1976d2' }}>
            Unsupervised Model Predictions
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
            Anomaly scores from Isolation Forest (no labels required)
          </Typography>
          
          {renderUnsupervisedTable()}
        </Box>

        {/* Information Box */}
        <Paper sx={{ p: 3, mt: 4, backgroundColor: '#e3f2fd' }}>
          <Typography variant="body2" sx={{ color: '#1565c0' }}>
            <strong>Note:</strong> Probabilities above 70% indicate likely anomalies. These predictions come from ML models trained on historical cloud attack patterns.
          </Typography>
        </Paper>
      </Container>
    );
  } catch (error) {
    errorLogger.fatal('ModelPredictions', 'Critical error rendering ModelPredictions', error);
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">Failed to render Model Predictions page</Typography>
      </Container>
    );
  }
}
