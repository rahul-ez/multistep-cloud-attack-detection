// Mock data simulating ML model outputs
// This represents what the backend API will eventually provide

// Simple console logger for data module (standalone to avoid circular imports)
const logDataAccess = (dataName, status, details = null) => {
  const timestamp = new Date().toISOString();
  if (status === 'error') {
    console.error(`[${timestamp}] [ERROR] [mockData] Data access error: ${dataName}`, details);
  } else {
    console.debug(`[${timestamp}] [DEBUG] [mockData] Data loaded: ${dataName}`, details);
  }
};

// Validate and create overview data
let mockOverviewData;
try {
  mockOverviewData = {
    totalAnalyzed: 15432,
    anomaliesDetected: 287,
    anomalyRate: 1.86,
    systemHealth: 98.2,
    lastUpdated: new Date().toISOString(),
  };
  logDataAccess('mockOverviewData', 'success', { recordCount: 1 });
} catch (error) {
  console.error('[mockData] Failed to initialize mockOverviewData:', error);
  mockOverviewData = {
    totalAnalyzed: 0,
    anomaliesDetected: 0,
    anomalyRate: 0,
    systemHealth: 0,
    lastUpdated: new Date().toISOString(),
  };
}

// Validate and create supervised predictions
let mockSupervisedPredictions;
try {
  mockSupervisedPredictions = [
    { id: 1, timestamp: '2026-01-04T10:23:00Z', randomForest: 0.15, xgboost: 0.12, ensemble: 0.13, label: 'Normal' },
    { id: 2, timestamp: '2026-01-04T10:24:30Z', randomForest: 0.78, xgboost: 0.82, ensemble: 0.80, label: 'Anomaly' },
    { id: 3, timestamp: '2026-01-04T10:25:15Z', randomForest: 0.22, xgboost: 0.18, ensemble: 0.20, label: 'Normal' },
    { id: 4, timestamp: '2026-01-04T10:26:45Z', randomForest: 0.91, xgboost: 0.88, ensemble: 0.89, label: 'Anomaly' },
    { id: 5, timestamp: '2026-01-04T10:27:30Z', randomForest: 0.08, xgboost: 0.11, ensemble: 0.09, label: 'Normal' },
  ];
  logDataAccess('mockSupervisedPredictions', 'success', { recordCount: mockSupervisedPredictions.length });
} catch (error) {
  console.error('[mockData] Failed to initialize mockSupervisedPredictions:', error);
  mockSupervisedPredictions = [];
}

// Validate and create unsupervised predictions
let mockUnsupervisedPredictions;
try {
  mockUnsupervisedPredictions = [
    { id: 1, timestamp: '2026-01-04T10:23:00Z', isolationForest: 0.25, anomalyScore: 0.25 },
    { id: 2, timestamp: '2026-01-04T10:24:30Z', isolationForest: 0.85, anomalyScore: 0.85 },
    { id: 3, timestamp: '2026-01-04T10:25:15Z', isolationForest: 0.32, anomalyScore: 0.32 },
    { id: 4, timestamp: '2026-01-04T10:26:45Z', isolationForest: 0.92, anomalyScore: 0.92 },
    { id: 5, timestamp: '2026-01-04T10:27:30Z', isolationForest: 0.15, anomalyScore: 0.15 },
  ];
  logDataAccess('mockUnsupervisedPredictions', 'success', { recordCount: mockUnsupervisedPredictions.length });
} catch (error) {
  console.error('[mockData] Failed to initialize mockUnsupervisedPredictions:', error);
  mockUnsupervisedPredictions = [];
}

// Validate and create ensemble scores
let mockEnsembleScores;
try {
  mockEnsembleScores = [
    { timestamp: '10:23', score: 0.24, decision: 'Normal' },
    { timestamp: '10:24', score: 0.82, decision: 'Anomaly' },
    { timestamp: '10:25', score: 0.26, decision: 'Normal' },
    { timestamp: '10:26', score: 0.90, decision: 'Anomaly' },
    { timestamp: '10:27', score: 0.12, decision: 'Normal' },
    { timestamp: '10:28', score: 0.45, decision: 'Normal' },
    { timestamp: '10:29', score: 0.88, decision: 'Anomaly' },
  ];
  logDataAccess('mockEnsembleScores', 'success', { recordCount: mockEnsembleScores.length });
} catch (error) {
  console.error('[mockData] Failed to initialize mockEnsembleScores:', error);
  mockEnsembleScores = [];
}

// Validate and create performance metrics
let mockPerformanceMetrics;
try {
  mockPerformanceMetrics = {
    rocAuc: 0.948,
    prAuc: 0.892,
    precision: 0.915,
    recall: 0.875,
    f1Score: 0.894,
    confusionMatrix: {
      truePositive: 156,
      trueNegative: 12847,
      falsePositive: 15,
      falseNegative: 23,
    },
  };
  logDataAccess('mockPerformanceMetrics', 'success', { metrics: Object.keys(mockPerformanceMetrics) });
} catch (error) {
  console.error('[mockData] Failed to initialize mockPerformanceMetrics:', error);
  mockPerformanceMetrics = {
    rocAuc: 0,
    prAuc: 0,
    precision: 0,
    recall: 0,
    f1Score: 0,
    confusionMatrix: {
      truePositive: 0,
      trueNegative: 0,
      falsePositive: 0,
      falseNegative: 0,
    },
  };
}

// Validate and create feature importance
let mockFeatureImportance;
try {
  mockFeatureImportance = [
    { feature: 'Request_Size', importance: 0.285 },
    { feature: 'Response_Time', importance: 0.212 },
    { feature: 'Connection_Count', importance: 0.178 },
    { feature: 'Packet_Rate', importance: 0.145 },
    { feature: 'Protocol_Entropy', importance: 0.098 },
    { feature: 'Source_IP_Diversity', importance: 0.082 },
  ];
  logDataAccess('mockFeatureImportance', 'success', { featureCount: mockFeatureImportance.length });
} catch (error) {
  console.error('[mockData] Failed to initialize mockFeatureImportance:', error);
  mockFeatureImportance = [];
}

// Validate and create anomaly distribution
let mockAnomalyDistribution;
try {
  mockAnomalyDistribution = [
    { name: 'DDoS', value: 142 },
    { name: 'Data Exfiltration', value: 78 },
    { name: 'Unauthorized Access', value: 45 },
    { name: 'Lateral Movement', value: 22 },
  ];
  logDataAccess('mockAnomalyDistribution', 'success', { categoryCount: mockAnomalyDistribution.length });
} catch (error) {
  console.error('[mockData] Failed to initialize mockAnomalyDistribution:', error);
  mockAnomalyDistribution = [];
}

// Validate and create time series data
let mockTimeSeriesData;
try {
  mockTimeSeriesData = [
    { time: '00:00', count: 45, anomalies: 2 },
    { time: '04:00', count: 38, anomalies: 1 },
    { time: '08:00', count: 92, anomalies: 7 },
    { time: '12:00', count: 156, anomalies: 15 },
    { time: '16:00', count: 118, anomalies: 12 },
    { time: '20:00', count: 85, anomalies: 5 },
    { time: '23:59', count: 52, anomalies: 3 },
  ];
  logDataAccess('mockTimeSeriesData', 'success', { dataPoints: mockTimeSeriesData.length });
} catch (error) {
  console.error('[mockData] Failed to initialize mockTimeSeriesData:', error);
  mockTimeSeriesData = [];
}

// Log successful module initialization
console.info('[mockData] Mock data module initialized successfully');

export {
  mockOverviewData,
  mockSupervisedPredictions,
  mockUnsupervisedPredictions,
  mockEnsembleScores,
  mockPerformanceMetrics,
  mockFeatureImportance,
  mockAnomalyDistribution,
  mockTimeSeriesData,
};
