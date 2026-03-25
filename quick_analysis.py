"""
Quick Analysis Script for ISSR Trust AI Experiment
This script provides a fast way to analyze experimental data without Jupyter notebook.

Usage: python quick_analysis.py
"""

import pandas as pd
import json
import os

def load_data():
    """Load data from CSV or JSON file."""
    if os.path.exists('logs.csv'):
        df = pd.read_csv('logs.csv')
        print(f"✓ Loaded {len(df)} trials from logs.csv\n")
        return df
    elif os.path.exists('logs.json'):
        with open('logs.json', 'r') as f:
            data = json.load(f)
        df = pd.DataFrame(data)
        print(f"✓ Loaded {len(df)} trials from logs.json\n")
        return df
    else:
        print("❌ No data files found. Run the experiment first!")
        return None

def analyze_data(df):
    """Perform basic analysis on the experimental data."""
    if df is None or len(df) == 0:
        return
    
    print("="*60)
    print("ISSR TRUST AI - QUICK ANALYSIS REPORT")
    print("="*60)
    
    # Basic stats
    total = len(df)
    print(f"\n📊 Dataset: {total} total trials")
    
    # Condition distribution
    cond_a = (df['condition'] == 'A').sum()
    cond_b = (df['condition'] == 'B').sum()
    print(f"   • Condition A (Formal): {cond_a} trials ({cond_a/total*100:.1f}%)")
    print(f"   • Condition B (Conversational): {cond_b} trials ({cond_b/total*100:.1f}%)")
    
    # Overall decisions
    accepts = (df['decision'] == 'Accept').sum()
    rejects = (df['decision'] == 'Reject').sum()
    print(f"\n🎯 Overall Decisions:")
    print(f"   • Accepts: {accepts} ({accepts/total*100:.1f}%)")
    print(f"   • Rejects: {rejects} ({rejects/total*100:.1f}%)")
    
    # Reliance rates by condition
    print(f"\n📈 Reliance Rates by Condition:")
    
    if cond_a > 0:
        reliance_a = (df[df['condition']=='A']['decision']=='Accept').sum() / cond_a * 100
        print(f"   • Condition A: {reliance_a:.1f}% reliance rate")
    
    if cond_b > 0:
        reliance_b = (df[df['condition']=='B']['decision']=='Accept').sum() / cond_b * 100
        print(f"   • Condition B: {reliance_b:.1f}% reliance rate")
    
    if cond_a > 0 and cond_b > 0:
        diff = abs(reliance_b - reliance_a)
        print(f"   • Difference: {diff:.1f} percentage points")
        
        if reliance_b > reliance_a:
            print(f"   → Humanlike cues INCREASED trust by {diff:.1f}%")
        elif reliance_a > reliance_b:
            print(f"   → Formal cues INCREASED trust by {diff:.1f}%")
        else:
            print(f"   → No difference in reliance")
    
    # Latency analysis
    print(f"\n⏱️  Response Times:")
    mean_latency = df['latency_ms'].mean()
    median_latency = df['latency_ms'].median()
    print(f"   • Mean: {mean_latency:.0f} ms ({mean_latency/1000:.2f}s)")
    print(f"   • Median: {median_latency:.0f} ms ({median_latency/1000:.2f}s)")
    
    if cond_a > 0 and cond_b > 0:
        latency_a = df[df['condition']=='A']['latency_ms'].mean()
        latency_b = df[df['condition']=='B']['latency_ms'].mean()
        print(f"   • Condition A mean: {latency_a:.0f} ms ({latency_a/1000:.2f}s)")
        print(f"   • Condition B mean: {latency_b:.0f} ms ({latency_b/1000:.2f}s)")
    
    print("\n" + "="*60)
    print("Analysis complete!")
    print("="*60)

if __name__ == "__main__":
    data = load_data()
    if data is not None:
        analyze_data(data)
