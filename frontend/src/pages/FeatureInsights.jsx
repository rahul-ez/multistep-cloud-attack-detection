// Feature Insights page - Placeholder for feature analysis and SHAP integration
import { useEffect, useState } from 'react';
import { Box, Container, Paper, Typography, Grid, Card, CardContent, Alert, LinearProgress } from '@mui/material';
import { mockFeatureImportance } from '../mockData';
import errorLogger from '../utils/errorLogger';

export default function FeatureInsights() {
  const [renderError, setRenderError] = useState(null);

  useEffect(() => {
    try {
      errorLogger.componentMount('FeatureInsights');
      errorLogger.info('FeatureInsights', 'Feature Insights page initialized');

      // Validate and log feature importance data
      if (mockFeatureImportance) {
        errorLogger.dataLoad('FeatureInsights', 'mockFeatureImportance', 'success', {
          featureCount: mockFeatureImportance.length,
          features: mockFeatureImportance.map(f => f.feature),
        });
      } else {
        errorLogger.dataLoad('FeatureInsights', 'mockFeatureImportance', 'error', {
          error: 'Data is null or undefined',
        });
      }
    } catch (error) {
      errorLogger.error('FeatureInsights', 'Error during component initialization', error);
      setRenderError(error.message);
    }

    return () => {
      errorLogger.componentUnmount('FeatureInsights');
    };
  }, []);

  // Render feature ranking list
  const renderFeatureRanking = () => {
    try {
      errorLogger.debug('FeatureInsights', 'Rendering feature ranking list');

      if (!mockFeatureImportance || mockFeatureImportance.length === 0) {
        errorLogger.warn('FeatureInsights', 'No feature importance data available');
        return <Typography color="textSecondary">No feature importance data available</Typography>;
      }

      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {mockFeatureImportance.map((feature, idx) => {
            try {
              return (
                <Box key={idx}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {idx + 1}. {feature.feature}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {(feature.importance * 100).toFixed(1)}%
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={feature.importance * 100} />
                </Box>
              );
            } catch (itemError) {
              errorLogger.error('FeatureInsights', `Error rendering feature item ${idx}`, itemError);
              return (
                <Box key={idx}>
                  <Typography color="error">Error rendering feature</Typography>
                </Box>
              );
            }
          })}
        </Box>
      );
    } catch (error) {
      errorLogger.error('FeatureInsights', 'Error rendering feature ranking', error);
      return <Typography color="error">Error rendering feature ranking</Typography>;
    }
  };

  // Render feature cards grid
  const renderFeatureCards = () => {
    try {
      errorLogger.debug('FeatureInsights', 'Rendering feature cards grid');

      if (!mockFeatureImportance || mockFeatureImportance.length === 0) {
        errorLogger.warn('FeatureInsights', 'No feature data for cards');
        return null;
      }

      return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {mockFeatureImportance.map((feature, idx) => {
            try {
              return (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        {feature.feature}
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                        {(feature.importance * 100).toFixed(1)}%
                      </Typography>
                      <LinearProgress variant="determinate" value={feature.importance * 100} />
                      <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
                        Relative importance in model
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            } catch (cardError) {
              errorLogger.error('FeatureInsights', `Error rendering feature card ${idx}`, cardError);
              return (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Card>
                    <CardContent>
                      <Typography color="error">Error loading feature</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            }
          })}
        </Grid>
      );
    } catch (error) {
      errorLogger.error('FeatureInsights', 'Error rendering feature cards', error);
      return <Typography color="error">Error rendering feature cards</Typography>;
    }
  };

  if (renderError) {
    errorLogger.error('FeatureInsights', 'Render error state active', null, { error: renderError });
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">Error loading Feature Insights: {renderError}</Typography>
      </Container>
    );
  }

  try {
    errorLogger.debug('FeatureInsights', 'Rendering main FeatureInsights component');

    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Feature Insights
        </Typography>

        {/* Future Integration Notice */}
        <Alert severity="info" sx={{ mb: 4 }}>
          <strong>Future Enhancement:</strong> This page will integrate SHAP (SHapley Additive exPlanations) for detailed feature attribution and model interpretability. Currently showing feature importance rankings.
        </Alert>

        {/* Feature Importance Rankings */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Feature Importance Ranking
              </Typography>
              {renderFeatureRanking()}
            </Paper>
          </Grid>
        </Grid>

        {/* Feature Cards Grid */}
        {renderFeatureCards()}

        {/* Feature Categories Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Network Features
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="body2">
                    <strong>Request Size:</strong> Payload size in bytes
                  </Typography>
                </Box>
                <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="body2">
                    <strong>Response Time:</strong> Latency in milliseconds
                  </Typography>
                </Box>
                <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="body2">
                    <strong>Connection Count:</strong> Number of simultaneous connections
                  </Typography>
                </Box>
                <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="body2">
                    <strong>Packet Rate:</strong> Packets per second
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Statistical Features
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="body2">
                    <strong>Protocol Entropy:</strong> Randomness of protocol distribution
                  </Typography>
                </Box>
                <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="body2">
                    <strong>Source IP Diversity:</strong> Number of unique source IPs
                  </Typography>
                </Box>
                <Box sx={{ p: 2, backgroundColor: '#e3f2fd', borderRadius: 1, border: '1px solid #90caf9' }}>
                  <Typography variant="body2" sx={{ color: '#1565c0' }}>
                    <strong>SHAP Values:</strong> To be integrated for individual sample interpretation
                  </Typography>
                </Box>
                <Box sx={{ p: 2, backgroundColor: '#f3e5f5', borderRadius: 1, border: '1px solid #ce93d8' }}>
                  <Typography variant="body2" sx={{ color: '#6a1b9a' }}>
                    <strong>LIME Explanations:</strong> Alternative local interpretability coming soon
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Explanation */}
        <Paper sx={{ p: 3, mt: 4, backgroundColor: '#fff9c4', borderLeft: '4px solid #f9a825' }}>
          <Typography variant="body2" sx={{ color: '#f57f17' }}>
            <strong>About Feature Importance:</strong> These values indicate which cloud request characteristics are most influential in detecting anomalies. 
            High importance doesn't necessarily mean high correlation with anomalies—it means the model relies on these features to make decisions.
            Future SHAP integration will provide more detailed, instance-specific explanations.
          </Typography>
        </Paper>

        {/* Implementation Roadmap */}
        <Paper sx={{ p: 3, mt: 4, backgroundColor: '#f0f4c3' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Implementation Roadmap
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ fontWeight: 600 }}>✓</Typography>
              <Typography variant="body2">Feature importance rankings (currently visible)</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ fontWeight: 600 }}>→</Typography>
              <Typography variant="body2">SHAP force plots for individual predictions</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ fontWeight: 600 }}>→</Typography>
              <Typography variant="body2">Partial dependence plots for feature relationships</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ fontWeight: 600 }}>→</Typography>
              <Typography variant="body2">LIME explanations for model-agnostic insights</Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    );
  } catch (error) {
    errorLogger.fatal('FeatureInsights', 'Critical error rendering FeatureInsights', error);
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">Failed to render Feature Insights page</Typography>
      </Container>
    );
  }
}
