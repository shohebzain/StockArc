# 💹 StockArc

**StockArc** is a modern, high-fidelity single-page dashboard for tracking stocks, mutual funds, and portfolio activity — built to look and feel like a professional brokerage platform.  
Developed using **React + TypeScript + Vite**, it offers dynamic charts, trading panels, mutual fund simulations, onboarding flows, and AI-powered insights via the **Gemini API**.

🔗 **Live Demo:** [https://navajowhite-eagle-262051.hostingersite.com/](https://navajowhite-eagle-262051.hostingersite.com/)


## 🚀 Key Features

- 📊 **Real-time (client-side) stock charts and comparisons**  
- 🧾 **Watchlist**, **portfolio overview**, and **order history**
- 💰 **Mutual funds pages** with SIP calculator and performance visualization
- 🔔 **Notifications**, **alerts**, and **KYC onboarding flows**
- 🧠 **AI Learning Center** powered by Google **Gemini API**
- 🛠️ **Admin dashboard** for monitoring and educational content management
- 💬 **AI Support Chat** to answer user queries interactively

---

## 🧩 Tech Stack

| Layer | Technologies |
|--------|---------------|
| **Frontend** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS |
| **Charts** | Recharts |
| **AI Integration** | `@google/genai` (Gemini API) |
| **Hosting** | Hostinger (static web hosting) |
| **Package Manager** | npm / pnpm / yarn |

---

## ⚙️ Prerequisites

Before running this project, ensure you have:

- **Node.js ≥ 18.x**  
- **npm**, **pnpm**, or **yarn**  
- A **Google Gemini API Key** for AI features  

---

## 🔑 Environment Setup

Create a `.env.local` file in your project root (this file is ignored by Git) and add your Gemini key:

```bash
GEMINI_API_KEY=your_gemini_api_key_here

🧠 Installation & Running Locally

Open PowerShell or terminal in your project root:

# Install dependencies
npm install

# Run the development server (default port 3000)
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview

📂 Project Structure
StockArc/
├── dist/                  # Production-ready build (used for deployment)
├── src/                   # Main source code
│   ├── components/        # Reusable React components
│   ├── pages/             # Core page views (Dashboard, Portfolio, etc.)
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Helper functions
│   └── App.tsx            # Main application entry
├── public/                # Static assets
├── index.html             # HTML entry
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
├── package.json
└── README.md

🧱 Key Components
Category	Examples
Dashboard	Dashboard.tsx, AdminDashboard.tsx
Charts	StockChart.tsx, IndexCharts.tsx
Stocks	StocksPage.tsx, StockDetail.tsx, StockComparison.tsx
Orders	OrderPanel.tsx, Orders.tsx, StockOrderHistory.tsx
Mutual Funds	MutualFunds.tsx, MutualFundDetail.tsx, SIPCalculator.tsx
Portfolio & Watchlist	Portfolio.tsx, Watchlist.tsx
Auth & KYC	KycOnboarding.tsx, Login.tsx, Register.tsx
Support & AI	Support.tsx, SupportChat.tsx
Alerts & Notifications	SetAlertModal.tsx, Notifications.tsx

🤝 Contributing

Interested in improving StockArc?

Fork the repository

Create a feature branch

Add or adjust TypeScript types as needed

Test your changes locally

Submit a Pull Request with a clear description

## 🪪 License

This project is licensed under the **MIT License**.
See the [LICENSE](./LICENSE) file for details.


