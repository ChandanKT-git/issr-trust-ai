# GSoC 2026 Proposal: Humanlike AI Systems and Trust Attribution

**Name:** [Your Name]
**Email:** [Your Email]
**GitHub:** [Your GitHub Profile]
**University:** [Your University]
**Timezone:** [Your Timezone]

## 1. Project Abstract
As AI systems become increasingly integrated into decision-making processes, understanding how human users calibrate their trust evaluating AI advice is critical. Often, humanlike interface cues (such as conversational tone or an anthropomorphized name) can induce miscalibrated trust—leading to overreliance or underreliance. This project aims to build an open-source, modular experimentation engine that empowers researchers to systematically manipulate humanlike and authority-signaling cues. Moving beyond self-reported surveys, the platform will log high-resolution behavioral metrics to capture objective reliance versus override decisions.

## 2. Motivation
Traditional trust measurements rely heavily on post-interaction questionnaires, which are prone to subjective biases. By shifting to *behavioral trust metrics*, this platform will capture the exact moment of decision-making. Researchers need a reusable infrastructure to run controlled A/B tests that measure how specific interface design choices affect user behavior. 

## 3. Scope of Work & Implementation Plan

### 3.1 Experimental Web Application
The platform will be built using modern web technologies:
- **Frontend**: Next.js (React) for a lightweight, performant, and easily deployable interface. Tailwind CSS will ensure a clean, responsive design.
- **Participant Tracking**: On initialization, the app will assign an anonymous UUID (`participant_id`) to track user sessions.
- **Condition Assignment**: A robust randomization engine to distribute users across multiple A/B/n testing conditions.

### 3.2 Cue Manipulation System
The cue management system will be designed for modularity, operating via a JSON-based configuration file that defines experimental conditions.
Specifically, it will manipulate at least three dimensions:
- **Agent Naming**: e.g., "System-8" vs. "Assistant Sarah"
- **Tone**: e.g., Formal ("Calculated optimal decision") vs. Conversational ("I think you'll love this!")
- **Confidence Framing**: Calibrated ("85% probability") vs. Overstated ("I am absolutely sure").

### 3.3 Behavioral Task Module
The primary interaction sequence will be the **Recommendation Acceptance Task**:
1. The participant is presented with a scenario (e.g., choosing a product or making a decision).
2. The AI assistant offers a recommendation based on its assigned "cues".
3. The participant must explicitly accept or reject the AI's recommendation.
*The platform will allow researchers to manually control the AI's actual accuracy rate to properly evaluate trust calibration vs. ground truth.*

### 3.4 Instrumentation and Logging Backend
The application will feature an API endpoint dedicated to high-frequency telemetry.
Event schemas will strictly log:
`participant_id, condition, decision, timestamp, latency_ms`
The backend will automatically append these records to CSV and JSON formats, ensuring immediate readiness for analysis.

### 3.5 Analysis and Export Notebook
I will develop a reproducible Jupyter Notebook (Python) utilizing `pandas` and `matplotlib`/`seaborn`.
The notebook will ingest the generated CSV/JSON exports and output standard behavioral metrics:
- Reliance rate by condition
- Override rate by condition
- Mean and median response latency

## 4. Project Timeline (12 Weeks)

**Pre-Community Bonding & Community Bonding (May)**
- Engage with mentors to refine requirements.
- Finalize the technology stack and architecture.
- Draft the initial database schema and JSON configuration structures for the cue system.

**Week 1-2: Core Platform & Routing**
- Initialize the Next.js platform repository.
- Implement participant tracking and the A/B condition randomization logic.
- Set up the global state management for the experiment flow.

**Week 3-4: Cue Manipulation System**
- Develop the JSON-driven cue management framework.
- Implement the UI components for the AI agent (Name, Avatar, Chat Bubble).
- Create variations for Naming, Tone, and Confidence Framing.

**Week 5-6: Behavioral Task Module**
- Implement the Recommendation Acceptance Task interface.
- Add logic to experimentally control AI accuracy.
- *Milestone*: End-to-end functionality of the basic recommendation flow (Midterm Evaluation).

**Week 7-8: Logging Infrastructure**
- Build the backend API endpoints to securely receive telemetry data.
- Ensure high-resolution millisecond latency tracking on the client side.
- Implement continuous CSV and JSON export functionalities.

**Week 9-10: Analysis Notebook & Data Pipeline**
- Generate synthetic data to simulate a 100-user experiment.
- Write the Python Analysis Notebook to calculate reliance, override rates, and latency.
- Refine visualizations and statistical outputs.

**Week 11-12: Documentation, Polish & Stretch Goals**
- Write comprehensive "How to Run" and "Researcher Integration" documentation.
- Implement stretch goals if time permits (e.g., secondary task types, richer interaction logging, post-task trust surveys).
- Final code cleanup and final submission.

## 5. Required Skills
My technical background strongly aligns with the project requirements:
- **JavaScript & React/Next.js**: Deep experience building interactive, state-driven user interfaces.
- **Backend & Logging**: Proficient in building Node.js/Next.js API routes and working with file streams/databases for telemetry collection (JSON/CSV).
- **Data Analysis**: Experience utilizing Python data science libraries for statistical evaluation.

## 6. Conclusion
This project will bridge the gap between interface design and objective trust analysis in AI systems. By providing researchers with a robust, open-source tool, we can ensure future AI assistants are designed responsibly, fostering appropriate trust calibration.
