# EcoPulse - AI Sustainability Coach 🌍

EcoPulse is an intelligent, dynamic platform designed to help users track, understand, and reduce their carbon footprint through AI-driven coaching and interactive "What-If" simulations. 

## 🎯 Chosen Vertical
**Carbon Footprint Awareness Platform / AI Sustainability Coach**

## 🧠 Approach and Logic
Our goal was to bridge the gap between raw emission data and actionable, human-centric habits. We approached this by building a highly interactive onboarding wizard that doesn't just ask for generic numbers, but contextualizes lifestyle choices (e.g., fuel type, travel days, household size).

The core calculation engine (`src/lib/emissions.ts`) takes these inputs and applies globally recognized emission factors (derived from EPA/GHG Protocol averages). To make the platform truly intelligent, we integrated the **Google Gemini API** as a backend proxy. Instead of static tips, the AI Coach reads the user's precise footprint profile and dynamically generates highly personalized, actionable roadmaps to reduce emissions.

## ⚙️ How the Solution Works
1. **Interactive Footprint Assessment:** Users complete a seamless 4-step onboarding wizard covering Transport, Energy, Diet, and Shopping. The UI dynamically adjusts (e.g., asking for fuel type only if a vehicle is selected).
2. **Impact Dashboard:** A sleek, gamified dashboard visualizes the user's monthly CO2 output, assigning them a normalized Sustainability Score (0-100) with a colorful legend.
3. **AI Sustainability Coach:** The platform securely sends the user's lifestyle context to Gemini AI, which acts as a personal eco-coach, delivering 3 highly specific, markdown-formatted recommendations.
4. **Eco Future Simulator:** Users can ask free-form "What if?" questions (e.g., "What if I switch to an EV?"). Gemini calculates the estimated annual CO2 savings and provides real-world equivalents (like trees planted) to make the impact tangible.

## 📌 Assumptions Made
- **Emission Factors:** We assumed generalized global averages for carbon math (e.g., standard grid electricity factors, average vehicle emissions per km) for the sake of the MVP calculation engine.
- **Data Persistence:** We assumed a zero-friction UX was critical for a hackathon, so we used `localStorage` to persist the user's footprint profile rather than forcing them to create a database account.
- **Household Scaling:** We assumed that home energy use is roughly shared, so we divide the total property electricity footprint by the number of household members to calculate the per-capita impact.

---

### Tech Stack
- **Frontend:** Next.js 14 (App Router), React, TailwindCSS, Lucide Icons, Recharts
- **Backend:** Next.js API Routes (Secure Proxy)
- **AI Integration:** Google Gemini AI SDK
- **Testing:** Jest

### Getting Started Locally
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env.local` file and add your Gemini API key: `GEMINI_API_KEY=your_key_here`
4. Run `npm run dev`.
5. Open `http://localhost:3000`.
