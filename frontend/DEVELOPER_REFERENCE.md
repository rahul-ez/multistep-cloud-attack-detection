// Quick Developer Reference - Cloud Attack Detection Dashboard

/**
 * PROJECT STRUCTURE & FILE LOCATIONS
 */

// Data
src/mockData.js
  - mockOverviewData: System KPIs (total analyzed, anomalies, rate, health)
  - mockSupervisedPredictions: RF + XGBoost predictions
  - mockUnsupervisedPredictions: Isolation Forest scores
  - mockEnsembleScores: Combined anomaly scores
  - mockPerformanceMetrics: Evaluation metrics
  - mockFeatureImportance: Feature rankings
  - mockAnomalyDistribution: Anomaly type breakdown
  - mockTimeSeriesData: Activity over time

// Pages
src/pages/Overview.jsx
  - System overview with KPI cards
  - Time series chart (activity trends)
  - Pie chart (anomaly distribution)

src/pages/ModelPredictions.jsx
  - Supervised model predictions table
  - Unsupervised model predictions table
  - Color-coded probability display

src/pages/EnsembleScoring.jsx
  - Ensemble score statistics (avg, max, min)
  - Time series line chart
  - Detailed results table with decision labels

src/pages/PerformanceMetrics.jsx
  - ROC-AUC, PR-AUC, F1-Score cards
  - Precision, Recall, Accuracy metrics
  - Confusion matrix bar chart
  - Feature importance chart

src/pages/FeatureInsights.jsx
  - Feature importance linear progress bars
  - Feature cards grid
  - Network vs Statistical feature categories
  - SHAP integration placeholder

// Components
src/components/Sidebar.jsx
  - Fixed sidebar navigation (desktop)
  - Collapsible drawer (mobile)
  - Navigation items with icons
  - Active page highlighting

// Layout & Styling
src/App.jsx
  - Main app component with routing
  - Flex layout with sidebar + main content
  - 5 routes for 5 pages

src/App.css
  - Global dashboard styles
  - Table styling
  - Responsive adjustments

src/index.css
  - Reset styles
  - Root styling
  - Scrollbar customization

/**
 * ADDING NEW PAGES
 */

// Step 1: Create page file
// src/pages/NewPage.jsx
import { Container, Paper, Typography } from '@mui/material';

export default function NewPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Page Title
      </Typography>
      {/* Content here */}
    </Container>
  );
}

// Step 2: Add route in App.jsx
<Route path="/newpage" element={<NewPage />} />

// Step 3: Add navigation item in Sidebar.jsx
const navItems = [
  // ... existing items ...
  {
    label: 'New Page',
    path: '/newpage',
    icon: IconName,
    description: 'Description',
  },
];

/**
 * UPDATING MOCK DATA
 */

// In mockData.js, add new export:
export const mockNewData = [
  { id: 1, value: 'example', score: 0.95 },
];

// In page component:
import { mockNewData } from '../mockData';

function MyPage() {
  const data = mockNewData;
  // Use data
}

/**
 * CONNECTING TO BACKEND API
 */

// Create src/services/api.js
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000/api';

export const api = {
  getOverview: () => axios.get(`${API_BASE}/overview`),
  getPredictions: () => axios.get(`${API_BASE}/predictions`),
  getMetrics: () => axios.get(`${API_BASE}/metrics`),
};

// In page component, replace mockData with:
import { useEffect, useState } from 'react';
import { api } from '../services/api';

function Overview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getOverview()
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (!data) return <Typography color="error">Failed to load data</Typography>;

  return <YourContent data={data} />;
}

/**
 * MUI COMPONENTS USED
 */

Components:
  - Container: Max-width wrapper (maxWidth="lg")
  - Paper: Card-like containers with elevation
  - Box: Flex wrapper (sx={{ display: 'flex' }})
  - Typography: Text with variants (h4, h6, body2, caption)
  - Grid: Responsive 12-column layout
  - Card & CardContent: Card components
  - Table, TableHead, TableBody, TableRow, TableCell: Data tables
  - LinearProgress: Progress bars for metrics
  - Chip: Small labeled elements
  - Alert: Info/warning messages
  - Drawer: Mobile sidebar navigation
  - List, ListItem, ListItemButton: Navigation lists

sx prop examples:
  sx={{ py: 4 }}             // padding-y: 4 units (32px)
  sx={{ mb: 3 }}             // margin-bottom: 3 units (24px)
  sx={{ color: '#d32f2f' }}  // color property
  sx={{ display: 'flex' }}   // CSS properties directly

/**
 * RECHARTS COMPONENTS USED
 */

Charts:
  - LineChart: Time series data
  - BarChart: Categorical data
  - PieChart: Distribution/proportions
  - ResponsiveContainer: Wraps charts for responsive sizing

Elements:
  - XAxis, YAxis: Axes configuration
  - CartesianGrid: Grid background
  - Tooltip: Hover data display
  - Legend: Chart legend
  - Line, Bar: Data visualization
  - Cell: Individual pie slice colors

/**
 * COLOR USAGE
 */

const colors = {
  primary: '#1976d2',      // Blue - links, active items
  success: '#388e3c',      // Green - normal/healthy
  error: '#d32f2f',        // Red - anomalies/errors
  warning: '#f57c00',      // Orange - uncertain/warnings
  background: '#fafafa',   // Light gray - page background
  paper: '#ffffff',        // White - cards/papers
  textPrimary: '#1a1a1a',  // Dark - main text
  textSecondary: '#666',   // Medium - secondary text
};

/**
 * RESPONSIVE BREAKPOINTS
 */

Common MUI breakpoints:
  xs: 0px      (mobile)
  sm: 600px    (tablet)
  md: 960px    (small desktop)
  lg: 1280px   (desktop)
  xl: 1920px   (large desktop)

Usage:
  sx={{
    width: { xs: '100%', md: 'calc(100% - 260px)' }
    display: { xs: 'none', md: 'block' }
    flexDirection: { xs: 'column', md: 'row' }
  }}

/**
 * COMMON PATTERNS
 */

// KPI Card
<Card>
  <CardContent>
    <Typography color="textSecondary">Label</Typography>
    <Typography variant="h5" sx={{ fontWeight: 600 }}>
      {value}
    </Typography>
  </CardContent>
</Card>

// Colored Value
<Box sx={{ color: value > 0.7 ? '#d32f2f' : '#388e3c', fontWeight: 600 }}>
  {(value * 100).toFixed(1)}%
</Box>

// Grid Layout
<Grid container spacing={3}>
  <Grid item xs={12} md={6}>
    {/* Content takes full width on mobile, 50% on desktop */}
  </Grid>
</Grid>

// Paper with Title
<Paper sx={{ p: 3 }}>
  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
    Section Title
  </Typography>
  {/* Content */}
</Paper>

/**
 * DEBUGGING TIPS
 */

1. Check console for React errors:
   - Press F12 → Console tab
   - Look for red error messages

2. Inspect elements:
   - Right-click → Inspect
   - Check CSS in Styles panel
   - Verify MUI theme is applied

3. Check network:
   - F12 → Network tab
   - Monitor API calls (will show 404 until backend ready)

4. React DevTools:
   - Install React DevTools browser extension
   - Inspect component props and state
   - Verify routing is working

5. Common issues:
   - "Cannot find module" → Run npm install
   - Port 5173 in use → Kill process or use -p flag
   - Blank page → Check for JS errors in console
   - Charts not showing → Verify ResponsiveContainer parent has height

/**
 * TESTING WORKFLOW
 */

1. View a page:
   - Navigate using sidebar
   - Verify all content is visible
   - Check for layout issues

2. Test responsive:
   - Press F12 → Toggle device toolbar
   - Test on mobile (375px), tablet (768px), desktop (1366px)

3. Check colors:
   - Red (#d32f2f) = anomalies/errors
   - Green (#388e3c) = normal/healthy
   - Blue (#1976d2) = links/highlights

4. Verify data:
   - Check mockData.js for realistic values
   - Ensure probabilities are 0-1
   - Verify timestamps are ISO format

/**
 * DEPLOYMENT CHECKLIST
 */

Before deploying:
  ✓ Remove console.log() statements
  ✓ Update API base URL to production
  ✓ Test all routes work
  ✓ Check all charts render
  ✓ Verify responsive on mobile
  ✓ Test on target browsers
  ✓ Run npm run build
  ✓ Check for TypeScript/lint errors
  ✓ Update environment variables
  ✓ Add error boundaries for API failures
