# Cloud Attack Detection Dashboard

A clean, visible admin-style React dashboard for the cloud attack detection system. The frontend displays ML model predictions, ensemble anomaly scores, and performance metrics with mock data.

## 📋 Features Implemented

### Pages
1. **Overview** (`/`) - System summary with KPIs and time-series visualizations
2. **Model Predictions** (`/predictions`) - Supervised (Random Forest, XGBoost) and unsupervised (Isolation Forest) model outputs
3. **Ensemble Scoring** (`/ensemble`) - Combined anomaly scores from all three models
4. **Performance Metrics** (`/metrics`) - ROC-AUC, PR-AUC, confusion matrix, and feature importance
5. **Feature Insights** (`/features`) - Feature importance rankings with placeholders for future SHAP integration

### Components
- **Sidebar Navigation** - Fixed left sidebar with active page highlighting
- **Responsive Layout** - Adapts from mobile to desktop with MUI Grid system
- **Charts** - Time series, bar, and pie charts using Recharts
- **Data Tables** - Formatted tables with color-coded predictions

### Mock Data Patterns
- Supervised predictions: Random Forest, XGBoost probabilities (0.0-1.0)
- Unsupervised anomaly scores: Isolation Forest (0.0-1.0)
- Ensemble scores: Average of all three models
- Performance metrics: ROC-AUC, PR-AUC, confusion matrix
- Feature importance: 6 cloud request features ranked by importance

## 🛠 Tech Stack

```json
{
  "core": ["React 19.2", "Vite 7.2", "React Router 6"],
  "ui": ["Material UI (MUI)", "Recharts"],
  "utilities": ["Axios", "React DOM 19.2"]
}
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── pages/                    # Page components
│   │   ├── Overview.jsx          # Main dashboard summary
│   │   ├── ModelPredictions.jsx  # Supervised & unsupervised predictions
│   │   ├── EnsembleScoring.jsx   # Combined model scoring
│   │   ├── PerformanceMetrics.jsx # Evaluation metrics
│   │   └── FeatureInsights.jsx   # Feature importance & SHAP placeholder
│   ├── components/
│   │   └── Sidebar.jsx           # Navigation sidebar component
│   ├── mockData.js               # Mock data simulating ML outputs
│   ├── App.jsx                   # Main app with routing
│   ├── main.jsx                  # React entry point
│   ├── App.css                   # Global dashboard styles
│   └── index.css                 # Reset and base styles
├── public/                        # Static assets
├── index.html                     # HTML entry point
├── package.json                   # Dependencies
├── vite.config.js                 # Vite configuration
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Running the Development Server

```bash
npm run dev
```

The dashboard will be available at `http://localhost:5174/` (or next available port).

### Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## 📊 Layout Architecture

### Sidebar (Left)
- **Width**: 260px on desktop, collapsible on mobile
- **Fixed position**: Stays in place when scrolling
- **Navigation items**: 5 main pages with icons and descriptions
- **Header**: "Cloud Guard" branding
- **Footer**: Data source information

### Main Content (Right)
- **Responsive**: Full width on mobile, adjusted on desktop
- **Background**: Light gray (#fafafa) for contrast
- **Padding**: Consistent spacing via MUI Container
- **Routes**: All content rendered via React Router

## 🎨 Design Patterns

### Color Scheme
```
Primary:      #1976d2 (Blue)
Success:      #388e3c (Green)
Error:        #d32f2f (Red)
Warning:      #f57c00 (Orange)
Background:   #fafafa (Light Gray)
```

### Spacing
- Cards and papers use consistent MUI Grid with `spacing={3}` (24px)
- Container padding: 4 units (32px)
- Internal component padding: 2-3 units

### Visibility Guarantees
- No hidden or overlapping content
- Sidebar doesn't overlap main content on desktop
- Mobile drawer hides behind hamburger menu
- All charts have fixed heights to prevent overflow
- Tables have proper scroll on small screens

## 🔌 Connecting to Backend

When the FastAPI backend is ready:

1. **Create API service** in `src/services/api.js`:
```javascript
import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

export const fetchOverviewData = () => 
  axios.get(`${API_BASE}/overview`);
```

2. **Replace mock data** in pages with API calls:
```javascript
import { fetchOverviewData } from '../services/api';

useEffect(() => {
  fetchOverviewData().then(res => setData(res.data));
}, []);
```

3. **Update mockData.js** or remove when API is ready

## 📈 Mock Data Structure Reference

### Overview Data
```javascript
{
  totalAnalyzed: number,
  anomaliesDetected: number,
  anomalyRate: number (%),
  systemHealth: number (%)
}
```

### Prediction Data
```javascript
[
  {
    id: number,
    timestamp: ISO 8601 string,
    randomForest: number (0-1),
    xgboost: number (0-1),
    ensemble: number (0-1),
    label: 'Normal' | 'Anomaly'
  }
]
```

### Ensemble Scores
```javascript
[
  {
    timestamp: string,
    score: number (0-1),
    decision: 'Normal' | 'Anomaly'
  }
]
```

### Performance Metrics
```javascript
{
  rocAuc: number,
  prAuc: number,
  precision: number,
  recall: number,
  f1Score: number,
  confusionMatrix: {
    truePositive: number,
    trueNegative: number,
    falsePositive: number,
    falseNegative: number
  }
}
```

## 🔄 Data Flow

```
mockData.js (simulated ML outputs)
    ↓
pages/* (display via Recharts & MUI Tables)
    ↓
User views predictions, metrics, insights
    ↓
[Future: Replace with API calls from backend]
```

## 📝 Key Design Decisions

1. **No state management library** - Mock data is simple and pages are independent
2. **Permanent sidebar on desktop** - Always visible for quick navigation
3. **MUI Grid layout** - Ensures responsive behavior without custom breakpoints
4. **Recharts for visualizations** - Lightweight, composable, no external dependencies
5. **Mock data in single file** - Easy to replace with API calls later
6. **Linear, predictable routing** - No nested routes, flat page structure

## 🚧 Future Enhancements

- [ ] SHAP force plots on Feature Insights page
- [ ] Real-time data updates via WebSocket
- [ ] Advanced filtering and search
- [ ] Custom date range selection
- [ ] Model comparison view
- [ ] Anomaly drill-down with raw logs
- [ ] User authentication
- [ ] Dark mode toggle

## 🔒 Security Notes

- No sensitive data in frontend code
- Mock data only - no actual model artifacts loaded
- Ready for HTTPS deployment
- API calls will use environment variables for base URL

## ✅ Checklist for Production

- [ ] Connect backend API endpoints
- [ ] Add environment variables (`.env.local`)
- [ ] Set API base URL in production build
- [ ] Test on target browsers
- [ ] Set up CI/CD pipeline
- [ ] Configure CORS if needed
- [ ] Add error boundary for graceful failures
- [ ] Implement loading states for API calls
- [ ] Add request timeout handling

## 📞 Support

For issues or questions about the dashboard implementation, refer to:
- MUI Documentation: https://mui.com/
- React Router: https://reactrouter.com/
- Recharts: https://recharts.org/
- Vite: https://vite.dev/
