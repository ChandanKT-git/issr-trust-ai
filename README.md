# ISSR Trust AI: Screening Test

This represents the screening test submission for the GSoC 2026 project: **Humanlike AI Systems and Trust Attribution**. It is a minimal working prototype of a behavioral experimentation platform designed to evaluate human trust in an AI assistant based on interface cues.

## Condition Logic

Participants are randomly assigned to one of two experimental conditions upon loading the page:

*   **Condition A (Control/Neutral)**: 
    *   **AI Name**: "System-8" 
    *   **Tone**: Formal and technical ("Computed optimal choice: Product X. Statistical analysis indicates highest utility.")
*   **Condition B (Humanlike)**:
    *   **AI Name**: "Assistant Sarah"
    *   **Tone**: Conversational and social ("Hi there! Based on what I know about you, I highly recommend Product X. I think you'll really like it!")

In both conditions, the participant is prompted with a recommendation and must choose to either **Accept** or **Reject** the recommendation. A unique participant ID (`participant_id`) is generated automatically. 

## Logging Implementation

The application leverages a simple Next.js API route (`/api/log`) to handle behavioral telemetry. 

When a participant clicks "Accept" or "Reject", a POST request is sent containing:
*   `participant_id`: An anonymous identifier for the user.
*   `condition`: "A" or "B".
*   `decision`: "Accept" or "Reject".
*   `timestamp`: The exact ISO datetime of the decision.
*   `latency_ms`: The duration (in milliseconds) from when the recommendation was presented until the user clicked a button.

The backend API appends this payload sequentially to both a `logs.json` file and a `logs.csv` file located in the root directory.

## How to Run Locally

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm

### Setup
1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repository-url>
   cd issr-trust-ai
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000`.
5. Complete the decision task.
6. Check the root directory for the generated `logs.json` and `logs.csv` files.

## Sample Output File

**logs.csv**
```csv
participant_id,condition,decision,timestamp,latency_ms
p_x7f2a9b,A,Accept,2026-03-09T18:02:45.123Z,1450
p_2d3k4l5,B,Reject,2026-03-09T18:03:12.789Z,2100
```

**logs.json**
```json
[
  {
    "participant_id": "p_x7f2a9b",
    "condition": "A",
    "decision": "Accept",
    "timestamp": "2026-03-09T18:02:45.123Z",
    "latency_ms": 1450
  },
  {
    "participant_id": "p_2d3k4l5",
    "condition": "B",
    "decision": "Reject",
    "timestamp": "2026-03-09T18:03:12.789Z",
    "latency_ms": 2100
  }
]
```

## Data Analysis Notebook

Two analysis options are provided to analyze experimental data and generate insights.

### Option 1: Quick Analysis (Recommended for Initial Testing)

For fast results without setting up Jupyter, use the Python script:

```bash
python quick_analysis.py
```

This provides immediate text-based analysis including:
- Reliance rates by condition
- Override rates  
- Response latency statistics
- Interpretation of findings

### Option 2: Full Jupyter Notebook Analysis

For comprehensive visualizations and statistical testing:

1. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the notebook:**
   ```bash
   jupyter notebook analysis_notebook.ipynb
   ```

3. **Execute all cells** to generate:
   - Reliance rates by condition
   - Override rates by condition  
   - Mean response latency analysis
   - Statistical significance tests (chi-square, t-tests)
   - Visualizations (saved as PNG files)

### Generated Outputs

The analysis tools provide:
- `decision_distribution.png` - Decision counts and distribution by condition (notebook only)
- `latency_analysis.png` - Response time comparisons (notebook only)
- Summary statistics and statistical test results in console/notebook output

### What the Analysis Shows

The analysis calculates key behavioral metrics:
- **Reliance Rate**: Percentage of "Accept" decisions per condition
- **Override Rate**: Percentage of "Reject" decisions per condition
- **Response Latency**: Time taken to make decisions (indicator of confidence/deliberation)
- **Statistical Tests**: Whether differences between conditions are statistically significant

This enables researchers to determine if humanlike cues (Condition B) lead to different trust behaviors compared to formal/technical cues (Condition A).
