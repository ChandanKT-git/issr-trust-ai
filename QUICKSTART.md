# ISSR Trust AI - Quick Start Guide

## Complete Testing Workflow (5 minutes)

### Step 1: Setup (First time only)

**Install Node.js dependencies:**
```bash
npm install
```

**Install Python dependencies (for analysis):**
```bash
pip install -r requirements.txt
```

### Step 2: Run the Experiment

**Start the development server:**
```bash
npm run dev
```

Open your browser to: `http://localhost:3000`

### Step 3: Complete Trials

1. **Refresh the page multiple times** to get different participant IDs
2. **Make decisions** (Accept or Reject) for each trial
3. **Aim for at least 10-20 trials** for meaningful analysis

💡 Tip: Try to vary your response times to simulate realistic decision-making!

### Step 4: Analyze Your Data

**Quick Analysis (Text-based):**
```bash
python quick_analysis.py
```

**Full Analysis (With visualizations):**
```bash
jupyter notebook analysis_notebook.ipynb
```

### Step 5: Review Results

Check these files in your project directory:
- `logs.csv` - Raw data in CSV format
- `logs.json` - Raw data in JSON format
- `decision_distribution.png` - Visualization (from notebook)
- `latency_analysis.png` - Visualization (from notebook)

---

## Example Test Session

Here's what a typical testing session looks like:

```
Trial 1: Participant p_abc123, Condition A → Accept (2.3s)
Trial 2: Participant p_def456, Condition B → Reject (5.1s)
Trial 3: Participant p_ghi789, Condition A → Reject (1.8s)
Trial 4: Participant p_jkl012, Condition B → Accept (4.2s)
...

Analysis Output:
📊 Dataset: 20 total trials
   • Condition A: 10 trials
   • Condition B: 10 trials
   
🎯 Reliance Rates:
   • Condition A: 40.0%
   • Condition B: 70.0%
   → Humanlike cues increased trust by 30%
```

---

## Troubleshooting

**Server won't start?**
```bash
rm -r .next
npm run dev
```

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**No data files found?**
- Make sure you've completed at least one trial
- Check that logs.csv or logs.json exist in the root directory

**Python errors?**
- Ensure you have Python 3.8+ installed
- Run: `pip install -r requirements.txt`

---

## What Each File Does

| File | Purpose |
|------|---------|
| `src/app/page.jsx` | Main experiment interface |
| `src/app/api/log/route.js` | Backend logging endpoint |
| `analysis_notebook.ipynb` | Full Jupyter analysis with visualizations |
| `quick_analysis.py` | Fast text-based analysis |
| `logs.csv` | Exported data (CSV format) |
| `logs.json` | Exported data (JSON format) |
| `requirements.txt` | Python package dependencies |

---

## Next Steps

Once you have results:
1. ✅ Review the reliance rates by condition
2. ✅ Compare response latencies
3. ✅ Interpret whether humanlike cues affected trust
4. ✅ Share your findings or continue data collection

For the full GSoC project, this infrastructure will be extended with:
- More cue dimensions (visual identity, role assignment)
- Additional task types
- Post-task trust surveys
- Richer interaction logging

Happy experimenting! 🚀
