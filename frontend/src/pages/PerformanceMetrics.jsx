// Performance Metrics page - Model evaluation metrics
import { Box, Container, Paper, Typography, Grid, Card, CardContent, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { mockPerformanceMetrics, mockFeatureImportance } from '../mockData';

export default function PerformanceMetrics() {
  const { rocAuc, prAuc, precision, recall, f1Score, confusionMatrix } = mockPerformanceMetrics;

  // Prepare confusion matrix visualization data
  const confusionData = [
    { metric: 'True Positive', value: confusionMatrix.truePositive },
    { metric: 'True Negative', value: confusionMatrix.trueNegative },
    { metric: 'False Positive', value: confusionMatrix.falsePositive },
    { metric: 'False Negative', value: confusionMatrix.falseNegative },
  ];

  // Calculate derived metrics
  const sensitivity = (confusionMatrix.truePositive / (confusionMatrix.truePositive + confusionMatrix.falseNegative)).toFixed(3);
  const specificity = (confusionMatrix.trueNegative / (confusionMatrix.trueNegative + confusionMatrix.falsePositive)).toFixed(3);
  const accuracy = ((confusionMatrix.truePositive + confusionMatrix.trueNegative) / 
    (confusionMatrix.truePositive + confusionMatrix.trueNegative + confusionMatrix.falsePositive + confusionMatrix.falseNegative)).toFixed(3);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Performance Metrics
      </Typography>

      {/* Key Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                ROC-AUC Score
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {rocAuc}
              </Typography>
              <LinearProgress variant="determinate" value={rocAuc * 100} sx={{ mb: 1 }} />
              <Typography variant="caption" color="textSecondary">
                Receiver Operating Characteristic
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                PR-AUC Score
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {prAuc}
              </Typography>
              <LinearProgress variant="determinate" value={prAuc * 100} sx={{ mb: 1 }} />
              <Typography variant="caption" color="textSecondary">
                Precision-Recall Area Under Curve
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                F1-Score
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {f1Score}
              </Typography>
              <LinearProgress variant="determinate" value={f1Score * 100} sx={{ mb: 1 }} />
              <Typography variant="caption" color="textSecondary">
                Harmonic mean of precision & recall
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Precision
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {precision}
              </Typography>
              <LinearProgress variant="determinate" value={precision * 100} sx={{ mb: 1 }} />
              <Typography variant="caption" color="textSecondary">
                True positives vs all positives
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Recall (Sensitivity)
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {recall}
              </Typography>
              <LinearProgress variant="determinate" value={recall * 100} sx={{ mb: 1 }} />
              <Typography variant="caption" color="textSecondary">
                True positives detection rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Accuracy
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {accuracy}
              </Typography>
              <LinearProgress variant="determinate" value={accuracy * 100} sx={{ mb: 1 }} />
              <Typography variant="caption" color="textSecondary">
                Overall prediction correctness
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Confusion Matrix Visualization */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Confusion Matrix
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={confusionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
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
                <TableCell align="center">{confusionMatrix.truePositive}</TableCell>
                <TableCell align="center">Correctly identified anomalies</TableCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                <TableCell><strong>True Negative</strong></TableCell>
                <TableCell align="center">{confusionMatrix.trueNegative}</TableCell>
                <TableCell align="center">Correctly identified normal traffic</TableCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: '#fff3e0' }}>
                <TableCell><strong>False Positive</strong></TableCell>
                <TableCell align="center">{confusionMatrix.falsePositive}</TableCell>
                <TableCell align="center">Normal traffic wrongly flagged</TableCell>
              </TableRow>
              <TableRow sx={{ backgroundColor: '#ffebee' }}>
                <TableCell><strong>False Negative</strong></TableCell>
                <TableCell align="center">{confusionMatrix.falseNegative}</TableCell>
                <TableCell align="center">Anomalies not detected</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Feature Importance */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Top Feature Importance
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
          Features that contribute most to model predictions (placeholder for SHAP values)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockFeatureImportance} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="feature" type="category" width={150} />
            <Tooltip />
            <Bar dataKey="importance" fill="#ff7043" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Container>
  );
}
