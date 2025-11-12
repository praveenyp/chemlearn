# 🧪 ChemLearn – AI-Powered Chemistry Learning Platform

> 🚀 *An interactive chemistry learning web app that combines science with AI — built using MERN Stack and Gemini AI.*

---

## 🌟 Overview

ChemLearn is an intelligent chemistry education platform where students can:
- Explore periodic table elements 🧬  
- Solve chemistry quizzes 🧠  
- Balance complex chemical reactions ⚗️  
- Chat with an AI chemistry assistant 🤖  

All powered by modern UI/UX design, Gemini AI integration, and clean backend APIs.

---

## 🧱 Tech Stack

| Area | Technology |
|------|-------------|
| **Frontend** | React.js (Vite) + Tailwind CSS + Framer Motion |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB Atlas |
| **AI Integration** | Gemini 2.0 Flash API |
| **Version Control** | Git + GitHub |
| **Deployment** | (Optional) Vercel / Render |

---

## ⚙️ Key Features

### 🔬 1. Elements Explorer
- Search, filter, and learn about all periodic table elements.  
- Click on an element to see **AI-generated fun facts** and real-world uses.  
- Elegant futuristic chemistry-inspired theme.

### 🧠 2. Quiz Module
- Dynamic chemistry quizzes fetched from MongoDB.
- One question at a time — “Next” and “Submit” navigation.
- Displays final score and percentage.
- Hints powered by AI.

### ⚗️ 3. AI Reaction Balancer
- Enter any chemical equation (e.g., `Fe + O2 -> Fe2O3`).  
- Gemini AI balances the reaction and provides an **easy explanation**.  
- Clean and modern UI with animated transitions.

### 💬 4. AI Chat Assistant (Floating Button)
- Always-accessible floating chatbot component.  
- Ask chemistry-related questions in natural language.  
- Can be added to any page easily via `<AiAssistant />`.

---



## ⚡ Installation & Setup

### 🔹 Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/chemlearn.git
cd chemlearn

🔹 Step 2: Backend Setup
cd backend
npm install


Create a .env file inside backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key


Then run:

node server.js


✅ Server runs at http://localhost:5000

🔹 Step 3: Frontend Setup
cd ../frontend
npm install
npm run dev


✅ React app runs at http://localhost:5173