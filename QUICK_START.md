# Quick Start Guide - Cloud Attack Detection Dashboard

## 🚀 Start Here

The dashboard is **complete and ready to use**. No additional setup needed!

### View the Dashboard

1. **The dev server is already running** at `http://localhost:5174/`
2. **Open your browser** and navigate to that URL
3. **Explore the 5 pages** using the sidebar menu

### What You'll See

✅ **Overview** - System statistics and activity trends  
✅ **Model Predictions** - Supervised and unsupervised ML outputs  
✅ **Ensemble Scoring** - Combined model anomaly scores  
✅ **Performance Metrics** - ROC-AUC, confusion matrix, feature importance  
✅ **Feature Insights** - Important features for anomaly detection  

## 📝 Essential Files to Know

| File | Purpose |
|------|---------|
| `frontend/src/App.jsx` | Main app with routing |
| `frontend/src/pages/*.jsx` | 5 page components |
| `frontend/src/components/Sidebar.jsx` | Navigation sidebar |
| `frontend/src/mockData.js` | All mock data |
| `frontend/DASHBOARD_README.md` | Full documentation |
| `BACKEND_INTEGRATION.md` | How to connect backend API |

## 🛠 Common Commands

```bash
# Navigate to frontend directory
cd frontend

# Start development server (HMR enabled)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for lint errors
npm run lint
```

## 🔌 Connecting Backend When Ready

**Three simple steps:**

1. Create `src/services/api.js` with your API calls
2. Replace `mockData` imports with API calls in pages
3. Set `VITE_API_BASE_URL` in `.env.local`

See `BACKEND_INTEGRATION.md` for detailed code examples.

## 📋 Project Structure (Essential)

```
frontend/
├── src/
│   ├── pages/              ← Page components
│   ├── components/         ← Sidebar component
│   ├── mockData.js         ← All mock data
│   ├── App.jsx             ← Main app with routing
│   └── main.jsx            ← React entry point
│
└── DASHBOARD_README.md     ← Full documentation
```

## 🎨 Key Features

- ✅ **5 responsive pages** - Works on mobile, tablet, desktop
- ✅ **No blank screens** - All content visible immediately
- ✅ **Clean sidebar** - Always accessible on desktop
- ✅ **Real charts** - Line, bar, and pie charts with real data
- ✅ **Data tables** - Color-coded predictions and metrics
- ✅ **Mock data** - Realistic ML output patterns
- ✅ **Ready for API** - Easy backend integration

## ❓ Common Questions

**Q: Where's the backend?**  
A: This is frontend-only. Backend (FastAPI) comes later. See `BACKEND_INTEGRATION.md` when ready.

**Q: Can I modify the layout?**  
A: Yes! Edit pages in `src/pages/` or the sidebar in `src/components/Sidebar.jsx`.

**Q: How do I add a new page?**  
A: See `DEVELOPER_REFERENCE.md` - it's a 3-step process.

**Q: Is this production-ready?**  
A: Almost! Just need backend API connection. Frontend is complete and stable.

**Q: The server isn't running?**  
A: Run `npm run dev` from the `frontend/` directory.

**Q: Port 5174 isn't working?**  
A: Try port 5173 or check terminal output - Vite will tell you which port is available.

## 🎯 Next Steps

### Right Now
1. Open `http://localhost:5174/` in your browser
2. Click through the 5 pages in the sidebar
3. Check that all content is visible

### When You're Ready for Backend
1. Read `BACKEND_INTEGRATION.md`
2. Create `src/services/api.js`
3. Replace mock data with API calls
4. Deploy!

### For Customization
1. Open `frontend/DEVELOPER_REFERENCE.md`
2. Find the pattern you want to change
3. Edit the component
4. Vite will hot-reload instantly

## 📊 What the Dashboard Shows

### Overview Page
- Total requests analyzed
- Anomalies detected  
- Anomaly rate
- System health
- Activity trends chart
- Anomaly type breakdown

### Model Predictions Page
- Random Forest probabilities
- XGBoost probabilities
- Ensemble average
- Final decision (Anomaly/Normal)
- All in sortable tables

### Ensemble Scoring Page
- Average anomaly score
- Max/min anomaly score
- Flagged anomalies count
- Score trends over time
- Individual score breakdowns

### Performance Metrics Page
- ROC-AUC score
- PR-AUC score
- Precision & recall
- F1-Score
- Confusion matrix (TP, TN, FP, FN)
- Top 6 features by importance

### Feature Insights Page
- Feature importance rankings
- Network features (Request Size, Response Time, etc)
- Statistical features (Entropy, Diversity, etc)
- Placeholder for SHAP integration

## 🚀 Ready to Deploy?

```bash
# Build for production
npm run build

# Files will be in dist/ directory
# Deploy dist/ to your web server
# Set VITE_API_BASE_URL for production API endpoint
```

## ⚠️ Important Notes

- ✅ **All ML files untouched** - No modifications to notebooks or .pkl files
- ✅ **Frontend only** - No backend code here
- ✅ **Stable foundation** - Ready for backend integration without refactoring
- ✅ **Well documented** - 4 guide documents included

## 🎓 Learning Resources

If you want to understand the code better:

1. **Material UI (MUI)**: `https://mui.com/`
2. **React Router**: `https://reactrouter.com/`
3. **Recharts**: `https://recharts.org/`
4. **Vite**: `https://vite.dev/`

## 🆘 Troubleshooting

**Dashboard won't load?**
- Check if `npm run dev` is still running
- Try a different port (Vite will suggest one)
- Clear browser cache (Ctrl+Shift+Delete)

**Page shows "Loading..."?**
- This is the loading state while fetching mock data
- Should complete in milliseconds
- If stuck, check browser console for errors

**Charts not showing?**
- Check that mockData.js is in src/ folder
- Verify all chart data has required properties
- Check browser console for errors

**Sidebar not visible on desktop?**
- Check window width (should be >960px)
- Resize browser window
- Refresh page

**Can't navigate between pages?**
- Check that routes are defined in App.jsx
- Make sure sidebar navigation items match route paths
- Look for errors in browser console

## 📞 Need Help?

1. Check **DASHBOARD_README.md** for full documentation
2. Check **DEVELOPER_REFERENCE.md** for code patterns
3. Check **BACKEND_INTEGRATION.md** for API integration
4. Look at existing page components for examples

---

**Your dashboard is ready! Happy developing! 🎉**

Visit http://localhost:5174/ and explore!
