# EcoPulse - AI Sustainability Coach 🌍

EcoPulse is an intelligent, dynamic platform designed to help users track, understand, and aggressively reduce their carbon footprint through AI-driven coaching and interactive "What-If" simulations. 

## 🎯 Chosen Vertical
**Carbon Footprint Awareness Platform / AI Sustainability Coach**

## 🧠 Approach and Logic
Our primary directive was to solve the exact **Problem Statement** provided: bridging the gap between raw emission data and actionable, human-centric habits. We approached this by building a highly interactive onboarding wizard that contextualizes lifestyle choices (e.g., fuel type, travel days, household size) rather than demanding generic numbers.

The core calculation engine (`src/lib/emissions.ts`) takes these inputs and applies globally recognized emission factors (derived from EPA/GHG Protocol averages). To make the platform truly intelligent and fully align with the **BuildWithAI** requirement, we integrated the **Google Gemini API** as our core backend processing engine. Instead of static, hardcoded tips, the AI Coach reads the user's precise footprint profile and dynamically generates highly personalized, actionable roadmaps to reduce emissions.

## ⚙️ How the Solution Solves the Problem Statement
1. **Interactive Footprint Assessment:** Users complete a seamless 4-step onboarding wizard covering Transport, Energy, Diet, and Shopping. The UI dynamically adjusts (e.g., asking for fuel type only if a vehicle is selected), establishing the foundational "Awareness" required by the prompt.
2. **Impact Dashboard:** A sleek, gamified dashboard visualizes the user's monthly CO2 output, assigning them a normalized Sustainability Score (0-100) with a colorful legend.
3. **AI Sustainability Coach (Powered by Gemini):** The platform securely sends the user's lifestyle context to Gemini AI, which acts as a personal eco-coach, delivering 3 highly specific, markdown-formatted recommendations. This directly fulfills the requirement for AI-driven coaching.
4. **Eco Future Simulator:** Users can ask free-form "What if?" questions (e.g., "What if I switch to an EV?"). Gemini calculates the estimated annual CO2 savings and provides real-world equivalents (like trees planted) to make the impact tangible, empowering users to make informed decisions.

## 📌 Assumptions Made
- **Emission Factors:** We assumed generalized global averages for carbon math (e.g., standard grid electricity factors, average vehicle emissions per km) for the sake of the MVP calculation engine.
- **Data Persistence:** We assumed a zero-friction UX was critical for a hackathon, so we used `localStorage` to persist the user's footprint profile rather than forcing them to create a database account.
