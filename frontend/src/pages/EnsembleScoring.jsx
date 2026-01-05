// Ensemble Scoring page - Combined model scoring
import { Box, Container, Paper, Typography, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Card, CardContent, Grid, Chip } from 'recharts';
import { LineChart as RechartLineChart } from 'recharts';
import { mockEnsembleScores } from '../mockData';

export default function EnsembleScoring() {
  // Calculate statistics
  const scores = mockEnsembleScores.map(d => d.score);
  const avgScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(3);
  const maxScore = Math.max(...scores).toFixed(3);
  const minScore = Math.min(...scores).toFixed(3);
  const anomalyCount = mockEnsembleScores.filter(d => d.decision === 'Anomaly').length;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Ensemble Anomaly Scoring
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Score
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {avgScore}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Mean ensemble score
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Max Score
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#d32f2f' }}>
                {maxScore}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Highest anomaly score
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Min Score
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#388e3c' }}>
                {minScore}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Lowest anomaly score
              </Typography>
            </CardContent>
          </Card>
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
        <ResponsiveContainer width="100%" height={350}>
          <RechartLineChart data={mockEnsembleScores}>
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
          </RechartLineChart>
        </ResponsiveContainer>
        <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#666' }}>
          <strong>Interpretation:</strong> Scores &gt; 0.7 (red line) indicate likely anomalies. Ensemble combines predictions from all three models.
        </Typography>
      </Paper>

      {/* Detailed Results Table */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Detailed Ensemble Results
        </Typography>
        
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
              })}
            </tbody>
          </table>
        </Box>
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
}
