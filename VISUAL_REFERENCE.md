# Dashboard Visual & Layout Reference

## 🎨 Layout Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser Window                          │
├──────────────┬──────────────────────────────────────────────────┤
│              │                                                  │
│   SIDEBAR    │              MAIN CONTENT AREA                   │
│   (260px)    │              (Flexible Width)                    │
│              │                                                  │
│  ┌────────┐  │  ┌─────────────────────────────────────────────┐ │
│  │ Cloud  │  │  │  Page Title                                 │ │
│  │ Guard  │  │  ├─────────────────────────────────────────────┤ │
│  │        │  │  │                                             │ │
│  ├────────┤  │  │  Content (Cards, Charts, Tables)           │ │
│  │ □ Over │  │  │                                             │ │
│  │   view │  │  │  Responsive Grid Layout:                    │ │
│  │        │  │  │  - 1 column on mobile                       │ │
│  │ □ Pred │  │  │  - 2 columns on tablet                      │ │
│  │        │  │  │  - 3+ columns on desktop                    │ │
│  │ □ Ense │  │  │                                             │ │
│  │        │  │  │  All scrollable when content exceeds height │ │
│  │ □ Perf │  │  │                                             │ │
│  │        │  │  └─────────────────────────────────────────────┘ │
│  │ □ Feat │  │                                                  │
│  │        │  │                                                  │
│  └────────┘  │                                                  │
│              │                                                  │
│ (Fixed)      │              (Scrollable)                        │
│ (Hidden on   │                                                  │
│  mobile)     │                                                  │
│              │                                                  │
└──────────────┴──────────────────────────────────────────────────┘
```

## 📱 Responsive Breakpoints

### Mobile (< 600px)
```
┌──────────────┐
│ ☰ (Menu)     │  ← Hamburger menu icon
├──────────────┤
│              │
│ Page Title   │
│              │
│ ┌──────────┐ │
│ │ Card 1   │ │
│ └──────────┘ │
│              │
│ ┌──────────┐ │
│ │ Card 2   │ │
│ └──────────┘ │
│              │
│ ┌──────────┐ │
│ │ Chart    │ │
│ │          │ │
│ └──────────┘ │
│              │
└──────────────┘
```
- Full-width content (1 column)
- Sidebar hidden (drawer modal on tap)
- All cards stack vertically

### Tablet (600px - 960px)
```
┌──────────────────────────────┐
│         Page Title           │
├──────────────┬───────────────┤
│   Card 1     │    Card 2     │
├──────────────┴───────────────┤
│                              │
│           Chart              │
│                              │
├──────────────┬───────────────┤
│   Card 3     │    Card 4     │
└──────────────┴───────────────┘
```
- 2-column grid layout
- Sidebar still hidden
- Cards begin to organize horizontally

### Desktop (> 960px)
```
┌────────┬─────────────────────────┐
│        │      Page Title         │
│ Sidebar├─────────────────────────┤
│ (Fixed)│  Card 1  │  Card 2  │ C3│
│        ├──────────┴──────────────┤
│        │                         │
│        │       Chart (Full)      │
│        │                         │
│        ├────────┬────────┬────────┤
│        │ Card 4 │ Card 5 │ Card 6 │
│        └────────┴────────┴────────┘
```
- Sidebar visible (260px fixed)
- 3+ column grid layout
- Content never overlaps sidebar

## 🎨 Color Scheme Reference

### Primary Colors
```
┌─────────────────────────────────────┐
│ Primary Blue: #1976d2               │  Used for:
│ Sidebar, Active items, Links        │  - Active nav items
│                                     │  - Primary buttons
│                                     │  - Chart lines
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Success Green: #388e3c              │  Used for:
│ Normal traffic, Healthy metrics     │  - "Normal" badges
│                                     │  - Positive indicators
│                                     │  - Checkmarks
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Error Red: #d32f2f                  │  Used for:
│ Anomalies, Alerts, Errors           │  - "Anomaly" badges
│                                     │  - High-risk indicators
│                                     │  - Error messages
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Warning Orange: #f57c00             │  Used for:
│ Caution, Uncertain                  │  - Medium-risk items
│                                     │  - Uncertain predictions
└─────────────────────────────────────┘
```

### Background Colors
```
┌─────────────────────────────────────┐
│ Page Background: #fafafa (light)    │
│ Card Background: #ffffff (white)    │
│ Sidebar Header: #1976d2 (blue)      │
│ Text Primary: #1a1a1a (dark)        │
│ Text Secondary: #666 (medium)       │
└─────────────────────────────────────┘
```

## 📊 Chart Visualization Examples

### Line Chart (Time Series)
```
Score
  1.0 │         ┌─┐
      │        / │ \
  0.75│       /  │  \
      │      /   │   \
  0.5 │     /    │    ┌─┐
      │    /     │   / │ \
  0.25│   /      │  /  │  \
      │  /       │ /   │   \
  0.0 └─────────────────────── Time
      10:23  10:26  10:29
      
  Red line = Anomaly score (threshold 0.7)
```

### Pie Chart (Distribution)
```
         DDoS
       ▓▓▓▓▓▓▓▓ (142)
    ▓▓ ░░        ░░▓▓
   ▓░ Data      Access ░▓
   ▓░ Exfil     (45)     ░▓
    ▓▓ (78)  ▓▓▓▓▓▓▓▓ ▓▓
       ░░▓▓▓▓░ Lateral ░░
              Movement
                (22)
```

### Bar Chart (Rankings)
```
Feature Importance

Request_Size      ████████████████ 28.5%
Response_Time     ███████████ 21.2%
Connection_Count  ████████ 17.8%
Packet_Rate       ██████ 14.5%
Protocol_Entropy  ████ 9.8%
Source_IP_Div     ███ 8.2%
```

## 🎯 Component Hierarchy

```
App.jsx
├── Sidebar.jsx (Fixed/Permanent on desktop, Modal on mobile)
│   ├── Navigation List
│   │   ├── Overview (/)
│   │   ├── Model Predictions (/predictions)
│   │   ├── Ensemble Scoring (/ensemble)
│   │   ├── Performance Metrics (/metrics)
│   │   └── Feature Insights (/features)
│   └── Footer Info
│
└── Main Content Area
    └── Routes (React Router)
        ├── Overview.jsx
        │   ├── KPI Cards Grid
        │   ├── Line Chart (Time Series)
        │   └── Pie Chart (Distribution)
        │
        ├── ModelPredictions.jsx
        │   ├── Supervised Section
        │   │   └── Data Table
        │   └── Unsupervised Section
        │       └── Data Table
        │
        ├── EnsembleScoring.jsx
        │   ├── Statistics Cards
        │   ├── Line Chart
        │   └── Results Table
        │
        ├── PerformanceMetrics.jsx
        │   ├── Metric Cards Grid
        │   ├── Bar Chart (Confusion Matrix)
        │   ├── Feature Importance Chart
        │   └── Data Tables
        │
        └── FeatureInsights.jsx
            ├── Progress Bars
            ├── Feature Cards Grid
            └── Category Sections
```

## 📐 Spacing & Sizing Guide

### Common Spacing Units
```
1 unit = 8px (MUI default)

Padding/Margin Values:
  py: 4     → Padding-Y: 32px (4 * 8)
  mb: 3     → Margin-Bottom: 24px (3 * 8)
  mb: 2     → Margin-Bottom: 16px (2 * 8)
  p: 3      → Padding: 24px (3 * 8)
  p: 2      → Padding: 16px (2 * 8)
```

### Container Sizes
```
Sidebar Width (desktop):  260px (fixed)
Container maxWidth:       1280px (lg)
Grid spacing:             24px (3 units)
Card min height:          Various (content-based)
Chart height:             300-350px (fixed)
Table row height:         ~48px (MUI default)
```

### Responsive Width Breakdown
```
Mobile (< 600px):        Grid cols = 12 (all full-width)
  Item: xs={12}          → 100% width
  Item: sm={6}           → 100% width (still)

Tablet (600-960px):      Grid cols = 12 (2 columns)
  Item: xs={12}          → 100% width
  Item: sm={6}           → 50% width
  Item: md={6}           → 50% width (still)

Desktop (> 960px):       Grid cols = 12 (3+ columns)
  Item: xs={12}          → 100% width
  Item: sm={6}           → 50% width
  Item: md={4}           → 33.33% width
  Item: md={3}           → 25% width
```

## 📋 Data Table Structure

```
┌──────────┬──────────┬──────────┬──────────┐
│ Header 1 │ Header 2 │ Header 3 │ Header 4 │  ← Gray background
├──────────┼──────────┼──────────┼──────────┤
│ Data     │ 0.78     │ Normal   │ ✓        │
├──────────┼──────────┼──────────┼──────────┤
│ Data     │ 0.25     │ Normal   │ ✓        │
├──────────┼──────────┼──────────┼──────────┤
│ Data     │ 0.91     │ Anomaly  │ ✗        │  ← Red badge
├──────────┼──────────┼──────────┼──────────┤
│ Data     │ 0.15     │ Normal   │ ✓        │
└──────────┴──────────┴──────────┴──────────┘
```

## 🎯 KPI Card Layout

```
┌─────────────────────┐
│ Label (subtle gray) │
│                     │
│ 15,432              │  ← Large number
│                     │
│ Description         │
│ (small gray)        │
└─────────────────────┘

Variations by metric type:
- Blue (info):    System overview stats
- Green (success):  Healthy indicators
- Red (error):     Anomalies/alerts
```

## 🔄 State Indicators

### Prediction Quality Indicators
```
Probability Range → Color → Meaning
0.0 - 0.3        → Green   Normal (low risk)
0.3 - 0.7        → Orange  Uncertain (review)
0.7 - 1.0        → Red     Anomaly (high risk)

Decision Badges:
[Normal]  → Green outline, dark green text
[Anomaly] → Red outline, dark red text
```

### Metric Quality Indicators
```
Score Range      → Color → Status
0.85 - 1.0      → Green   Excellent
0.70 - 0.85     → Blue    Good
0.50 - 0.70     → Orange  Fair
< 0.50          → Red     Poor
```

## 📱 Mobile Menu Behavior

```
Desktop (> 960px):
  [Sidebar permanently visible] [Content]

Tablet (600-960px):
  [☰ Menu] [Content - takes full width]
           ↓ (on tap)
           [Sidebar drawer opens as modal]

Mobile (< 600px):
  [☰ Menu] [Content - takes full width]
           ↓ (on tap)
           [Sidebar drawer opens as modal]
           [Overlay/Scrim behind drawer]
```

## ✨ Visual Consistency Guide

### Typography
```
Page Title:      Typography variant="h4", fontWeight={600}, color #1a1a1a
Section Title:   Typography variant="h6", fontWeight={600}, color #1a1a1a
Body Text:       Typography variant="body2", color #666
Small Text:      Typography variant="caption", color #999
```

### Shadows & Elevation
```
Sidebar:    No shadow (filled background)
Cards:      Light shadow (0 1px 4px rgba(0,0,0,0.08))
Papers:     Light shadow (0 1px 3px rgba(0,0,0,0.08))
Hover:      Slightly increased shadow
```

### Borders & Dividers
```
Paper/Card borders:   Subtle (1px #eee) or no border
Table row borders:    Bottom 1px #eee
Section dividers:     Full-width Divider component
Emphasized border:    4px left border (active nav item)
```

---

This visual reference helps understand the dashboard structure, colors, responsive behavior, and layout at a glance.
