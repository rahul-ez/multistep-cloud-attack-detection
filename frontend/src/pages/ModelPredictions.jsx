// Model Predictions page - Supervised and unsupervised model outputs
import { Box, Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Card, CardContent, Chip } from '@mui/material';
import { mockSupervisedPredictions, mockUnsupervisedPredictions } from '../mockData';

// Helper function to format timestamp
const formatTime = (isoString) => new Date(isoString).toLocaleTimeString();

// Helper function to get color based on prediction
const getPredictionColor = (probability) => {
  if (probability > 0.7) return '#d32f2f'; // Red for anomaly
  if (probability > 0.4) return '#f57c00'; // Orange for uncertain
  return '#388e3c'; // Green for normal
};

// Helper function to get chip color based on label
const getLabelChipColor = (label) => {
  return label === 'Anomaly' ? 'error' : 'success';
};

export default function ModelPredictions() {
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
              {mockSupervisedPredictions.map((row) => (
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Unsupervised Models Section */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#1976d2' }}>
          Unsupervised Model Predictions
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
          Anomaly scores from Isolation Forest (no labels required)
        </Typography>
        
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
              {mockUnsupervisedPredictions.map((row) => (
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Information Box */}
      <Paper sx={{ p: 3, mt: 4, backgroundColor: '#e3f2fd' }}>
        <Typography variant="body2" sx={{ color: '#1565c0' }}>
          <strong>Note:</strong> Probabilities above 70% indicate likely anomalies. These predictions come from ML models trained on historical cloud attack patterns.
        </Typography>
      </Paper>
    </Container>
  );
}
