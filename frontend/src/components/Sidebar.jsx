// Sidebar navigation component
import { useEffect } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchemaIcon from '@mui/icons-material/Schema';
import TimelineIcon from '@mui/icons-material/Timeline';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SecurityIcon from '@mui/icons-material/Security';
import errorLogger from '../utils/errorLogger';

const DRAWER_WIDTH = 260;

// Navigation items
const navItems = [
  { label: 'Overview', path: '/', icon: DashboardIcon, description: 'System summary' },
  { label: 'Model Predictions', path: '/predictions', icon: SchemaIcon, description: 'Supervised & Unsupervised' },
  { label: 'Ensemble Scoring', path: '/ensemble', icon: TimelineIcon, description: 'Combined scores' },
  { label: 'Performance Metrics', path: '/metrics', icon: EqualizerIcon, description: 'ROC, Confusion Matrix' },
  { label: 'Feature Insights', path: '/features', icon: LightbulbIcon, description: 'Feature importance' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      errorLogger.componentMount('Sidebar');
      errorLogger.debug('Sidebar', 'Sidebar initialized with navigation items', {
        itemCount: navItems.length,
        currentPath: location.pathname,
      });
    } catch (error) {
      errorLogger.error('Sidebar', 'Error in component mount', error);
    }

    return () => {
      errorLogger.componentUnmount('Sidebar');
    };
  }, []);

  useEffect(() => {
    try {
      errorLogger.navigation('Sidebar', 'route-change', location.pathname);
      errorLogger.debug('Sidebar', 'Current route updated', {
        pathname: location.pathname,
        search: location.search,
        hash: location.hash,
      });
    } catch (error) {
      errorLogger.error('Sidebar', 'Error tracking navigation', error);
    }
  }, [location.pathname]);

  const handleNavigation = (path, label) => {
    try {
      errorLogger.userAction('Sidebar', 'Navigation click', {
        targetPath: path,
        targetLabel: label,
        fromPath: location.pathname,
      });
      navigate(path);
      errorLogger.info('Sidebar', `Navigated to ${label}`, { path });
    } catch (error) {
      errorLogger.error('Sidebar', 'Navigation failed', error, {
        targetPath: path,
        targetLabel: label,
      });
    }
  };

  try {
    errorLogger.debug('Sidebar', 'Rendering sidebar component');

    return (
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            height: '100vh',
          },
        }}
      >
        {/* Sidebar Header */}
        <Box sx={{ p: 3, backgroundColor: '#1976d2', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <SecurityIcon sx={{ fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Cloud Guard
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            Attack Detection System
          </Typography>
        </Box>

        <Divider />

        {/* Navigation Items */}
        <List sx={{ py: 2 }}>
          {navItems.map((item) => {
            try {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigation(item.path, item.label)}
                    sx={{
                      backgroundColor: isActive ? '#e3f2fd' : 'transparent',
                      borderLeft: isActive ? '4px solid #1976d2' : '4px solid transparent',
                      pl: isActive ? 1.75 : 2,
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive ? '#1976d2' : 'inherit',
                        minWidth: 40,
                      }}
                    >
                      <IconComponent />
                    </ListItemIcon>
                    <Box sx={{ flex: 1 }}>
                      <ListItemText
                        primary={item.label}
                        secondary={item.description}
                        primaryTypographyProps={{
                          sx: {
                            fontSize: '0.95rem',
                            fontWeight: isActive ? 600 : 500,
                            color: isActive ? '#1976d2' : 'inherit',
                          },
                        }}
                        secondaryTypographyProps={{
                          sx: {
                            fontSize: '0.75rem',
                            opacity: 0.6,
                          },
                        }}
                      />
                    </Box>
                  </ListItemButton>
                </ListItem>
              );
            } catch (error) {
              errorLogger.error('Sidebar', `Error rendering nav item: ${item.label}`, error);
              return null;
            }
          })}
        </List>

        <Divider />

        {/* Footer Info */}
        <Box sx={{ p: 2, backgroundColor: '#fafafa', fontSize: '0.85rem', color: '#666' }}>
          <Typography variant="caption" display="block" sx={{ mb: 1 }}>
            <strong>Data Source:</strong>
          </Typography>
          <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
            • Random Forest
          </Typography>
          <Typography variant="caption" display="block" sx={{ mb: 0.5 }}>
            • XGBoost
          </Typography>
          <Typography variant="caption" display="block">
            • Isolation Forest
          </Typography>
        </Box>
      </Drawer>
    );
  } catch (error) {
    errorLogger.fatal('Sidebar', 'Failed to render Sidebar component', error);
    return (
      <Box sx={{ width: DRAWER_WIDTH, p: 2, backgroundColor: '#ffebee' }}>
        <Typography color="error">Error loading sidebar</Typography>
      </Box>
    );
  }
}
