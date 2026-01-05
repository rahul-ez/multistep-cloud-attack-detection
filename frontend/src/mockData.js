// Mock data simulating ML model outputs
// This represents what the backend API will eventually provide

export const mockOverviewData = {
  totalAnalyzed: 15432,
  anomaliesDetected: 287,
  anomalyRate: 1.86,
  systemHealth: 98.2,
  lastUpdated: new Date().toISOString(),
};

export const mockSupervisedPredictions = [
  { id: 1, timestamp: '2026-01-04T10:23:00Z', randomForest: 0.15, xgboost: 0.12, ensemble: 0.13, label: 'Normal' },
  { id: 2, timestamp: '2026-01-04T10:24:30Z', randomForest: 0.78, xgboost: 0.82, ensemble: 0.80, label: 'Anomaly' },
  { id: 3, timestamp: '2026-01-04T10:25:15Z', randomForest: 0.22, xgboost: 0.18, ensemble: 0.20, label: 'Normal' },
  { id: 4, timestamp: '2026-01-04T10:26:45Z', randomForest: 0.91, xgboost: 0.88, ensemble: 0.89, label: 'Anomaly' },
  { id: 5, timestamp: '2026-01-04T10:27:30Z', randomForest: 0.08, xgboost: 0.11, ensemble: 0.09, label: 'Normal' },
];

export const mockUnsupervisedPredictions = [
  { id: 1, timestamp: '2026-01-04T10:23:00Z', isolationForest: 0.25, anomalyScore: 0.25 },
  { id: 2, timestamp: '2026-01-04T10:24:30Z', isolationForest: 0.85, anomalyScore: 0.85 },
  { id: 3, timestamp: '2026-01-04T10:25:15Z', isolationForest: 0.32, anomalyScore: 0.32 },
  { id: 4, timestamp: '2026-01-04T10:26:45Z', isolationForest: 0.92, anomalyScore: 0.92 },
  { id: 5, timestamp: '2026-01-04T10:27:30Z', isolationForest: 0.15, anomalyScore: 0.15 },
];

export const mockEnsembleScores = [
  { timestamp: '10:23', score: 0.24, decision: 'Normal' },
  { timestamp: '10:24', score: 0.82, decision: 'Anomaly' },
  { timestamp: '10:25', score: 0.26, decision: 'Normal' },
  { timestamp: '10:26', score: 0.90, decision: 'Anomaly' },
  { timestamp: '10:27', score: 0.12, decision: 'Normal' },
  { timestamp: '10:28', score: 0.45, decision: 'Normal' },
  { timestamp: '10:29', score: 0.88, decision: 'Anomaly' },
];

export const mockPerformanceMetrics = {
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

export const mockFeatureImportance = [
  { feature: 'Request_Size', importance: 0.285 },
  { feature: 'Response_Time', importance: 0.212 },
  { feature: 'Connection_Count', importance: 0.178 },
  { feature: 'Packet_Rate', importance: 0.145 },
  { feature: 'Protocol_Entropy', importance: 0.098 },
  { feature: 'Source_IP_Diversity', importance: 0.082 },
];

export const mockAnomalyDistribution = [
  { name: 'DDoS', value: 142 },
  { name: 'Data Exfiltration', value: 78 },
  { name: 'Unauthorized Access', value: 45 },
  { name: 'Lateral Movement', value: 22 },
];

export const mockTimeSeriesData = [
  { time: '00:00', count: 45, anomalies: 2 },
  { time: '04:00', count: 38, anomalies: 1 },
  { time: '08:00', count: 92, anomalies: 7 },
  { time: '12:00', count: 156, anomalies: 15 },
  { time: '16:00', count: 118, anomalies: 12 },
  { time: '20:00', count: 85, anomalies: 5 },
  { time: '23:59', count: 52, anomalies: 3 },
];
