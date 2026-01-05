import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import ModelPredictions from './pages/ModelPredictions';
import EnsembleScoring from './pages/EnsembleScoring';
import PerformanceMetrics from './pages/PerformanceMetrics';
import FeatureInsights from './pages/FeatureInsights';
import './App.css';

const DRAWER_WIDTH = 260;

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            backgroundColor: '#fafafa',
            minHeight: '100vh',
            overflow: 'auto',
          }}
        >
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/predictions" element={<ModelPredictions />} />
            <Route path="/ensemble" element={<EnsembleScoring />} />
            <Route path="/metrics" element={<PerformanceMetrics />} />
            <Route path="/features" element={<FeatureInsights />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
