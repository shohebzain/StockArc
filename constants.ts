

import type { Stock, ChartDataPoint, User, MutualFund } from './types';
import { MutualFundRisk } from './types';

export const ADMIN_USERS_DATA: User[] = [
    { id: 'USR002', name: 'Alice Johnson', email: 'alice@example.com', password: 'password', kycStatus: 'VERIFIED', funds: 1500000, mutualFundHoldings: [], learningProgress: [] },
    { id: 'USR003', name: 'Bob Smith', email: 'bob@example.com', password: 'password', kycStatus: 'PENDING', funds: 75000, mutualFundHoldings: [], learningProgress: [] },
    { id: 'USR004', name: 'Charlie Brown', email: 'charlie@example.com', password: 'password', kycStatus: 'REJECTED', funds: 10000, mutualFundHoldings: [], learningProgress: [] },
    { id: 'USR005', name: 'Diana Prince', email: 'diana@example.com', password: 'password', kycStatus: 'NOT_STARTED', funds: 5000, mutualFundHoldings: [], learningProgress: [] },
];

export const NIFTY_50_DATA = { name: 'NIFTY 50', price: 22500.50, change: 150.75, changePercent: 0.67 };
export const SENSEX_DATA = { name: 'SENSEX', price: 74010.21, change: 550.92, changePercent: 0.75 };

export const GLOBAL_INDICES_DATA = [
    { name: 'NIFTY 50', value: '22,500.50', change: '+150.75', changePercent: '+0.67%' },
    { name: 'SENSEX', value: '74,010.21', change: '+550.92', changePercent: '+0.75%' },
    { name: 'Dow Jones', value: '39,127.14', change: '-31.33', changePercent: '-0.08%' },
    { name: 'NASDAQ', value: '17,850.12', change: '+200.45', changePercent: '+1.13%' },
];

export const IPO_DATA = [
    { name: 'Tech Innovations Inc.', openDate: '2024-08-01', closeDate: '2024-08-05', status: 'Upcoming' },
    { name: 'Green Energy Solutions', openDate: '2024-07-15', closeDate: '2024-07-19', status: 'Open' },
    { name: 'HealthCare Pharma', openDate: '2024-06-20', closeDate: '2024-06-24', status: 'Listed' },
];

export const MARKET_NEWS_DATA = [
    {
        headline: "RBI keeps repo rate unchanged, market reacts positively.",
        source: "Livemint, 1 hour ago",
        fullText: "The Reserve Bank of India's Monetary Policy Committee (MPC) has decided to keep the repo rate unchanged at 6.5% for the eighth consecutive time. The decision was unanimous and aimed at maintaining a disinflationary stance to align inflation with the target while supporting growth. The Indian stock market reacted positively to the news, with benchmark indices Sensex and Nifty 50 showing gains."
    },
    {
        headline: "SEBI introduces new T+0 settlement cycle for select stocks.",
        source: "Economic Times, 4 hours ago",
        fullText: "The Securities and Exchange Board of India (SEBI) has introduced a beta version of the T+0 (same-day) settlement cycle for a limited set of 25 scrips. This move is aimed at providing faster settlement of trades and increasing liquidity in the market. This shorter settlement cycle will be an option in parallel with the existing T+1 cycle in the equity cash market."
    },
    {
        headline: "IT sector sees a surge amid positive global cues.",
        source: "Business Standard, 1 day ago",
        fullText: "Indian IT stocks witnessed a significant surge today, driven by positive global cues and a strong outlook from major US tech companies. The Nifty IT index gained over 2%, with major players like TCS, Infosys, and HCL Tech leading the rally. Analysts believe the trend may continue as demand for digital transformation services remains robust."
    },
    {
        headline: "FIIs turn net buyers in Indian market after a week of outflows.",
        source: "Reuters, 2 days ago",
        fullText: "Foreign Institutional Investors (FIIs) turned net buyers in the Indian equity market on Tuesday, with provisional data showing net inflows of over ₹1,500 crore. This comes after a week of consistent selling, bringing some relief to the market. The renewed interest from FIIs is seen as a positive sign for market sentiment in the short term."
    },
     {
        headline: "Monsoon forecast brings cheer to FMCG and Auto sectors.",
        source: "The Hindu Business Line, 2 days ago",
        fullText: "The India Meteorological Department (IMD) has forecasted an above-normal monsoon for this year, which is expected to boost rural demand. This has led to a rally in stocks from the FMCG and automobile sectors, which are heavily dependent on the rural economy. Companies like Hindustan Unilever and Maruti Suzuki saw their stock prices rise in anticipation of higher sales."
    }
];

export const LEARNING_ARTICLES_TOPICS = {
    Beginner: [
        { title: 'What is a Stock?', description: 'Understand the basics of what a stock represents and why companies issue them.' },
        { title: 'What are Stock Exchanges?', description: 'Learn about the role of stock exchanges like the NSE and BSE.' },
        { title: 'What is Demat & Trading Account?', description: 'The essential accounts you need to start your investment journey.' },
        { title: 'Understanding Market Orders', description: 'Learn how to buy or sell stocks instantly at the current market price.' },
        { title: 'Understanding Limit Orders', description: 'Set a specific price at which you want to buy or sell a stock.' },
        { title: 'What is a Mutual Fund?', description: 'Discover how mutual funds work and why they are a popular investment choice.' },
    ],
    Intermediate: [
        { title: 'What is Technical Analysis?', description: 'An introduction to using charts and patterns to analyze stock movements.' },
        { title: 'What is Fundamental Analysis?', description: 'Learn how to evaluate a company\'s financial health to make investment decisions.' },
        { title: 'Candlestick Chart Patterns', description: 'A guide to reading and interpreting candlestick charts for market trends.' },
        { title: 'What is a Stop Loss?', description: 'A crucial tool for managing risk and protecting your investments from big losses.' },
        { title: 'Introduction to SIP', description: 'Learn about Systematic Investment Plans for disciplined investing.' },
        { title: 'Diversification Explained', description: 'The importance of spreading your investments to reduce risk.' },
    ],
    Advanced: [
        { title: 'Futures and Options Trading', description: 'An overview of derivatives and how they are used for hedging and speculation.' },
        { title: 'What is an IPO?', description: 'Understand the process of an Initial Public Offering and how to invest in one.' },
        { title: 'Understanding P/E Ratio', description: 'A key metric for valuing a company and its stock price.' },
        { title: 'Moving Averages (MA)', description: 'A popular technical indicator to identify trend direction.' },
        { title: 'Relative Strength Index (RSI)', description: 'Using RSI to identify overbought or oversold conditions in a stock.' },
        { title: 'Portfolio Management Strategies', description: 'Learn about different approaches to building and managing your investment portfolio.' },
    ],
};

// A simple in-memory cache for chart data
const chartDataCache = new Map<string, ChartDataPoint[]>();

const generateRandomWalk = (initialValue: number, days: number): number[] => {
    const data: number[] = [initialValue];
    let lastValue = initialValue;
    for (let i = 1; i < days; i++) {
        const change = (Math.random() - 0.5) * 0.05 * lastValue;
        lastValue += change;
        data.push(Math.max(lastValue, 0.1)); // Ensure price doesn't go to zero
    }
    return data;
};

export const generateChartData = (symbol: string): ChartDataPoint[] => {
    if (chartDataCache.has(symbol)) {
        return chartDataCache.get(symbol)!;
    }

    const data: ChartDataPoint[] = [];
    const today = new Date();
    const days = 180; // 6 months of data
    
    // Use a hash of the symbol to seed the random walk for consistent results per symbol
    let seed = 0;
    for (let i = 0; i < symbol.length; i++) {
        seed = (seed << 5) - seed + symbol.charCodeAt(i);
        seed |= 0; // Convert to 32bit integer
    }
    const initialPrice = 100 + (Math.abs(seed) % 2000); // Base price between 100 and 2100

    const prices = generateRandomWalk(initialPrice, days);

    for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - (days - 1 - i));
        
        const open = prices[i];
        const close = (i + 1 < prices.length) ? prices[i+1] : open * (1 + (Math.random() - 0.5) * 0.02);
        const high = Math.max(open, close) * (1 + Math.random() * 0.015);
        const low = Math.min(open, close) * (1 - Math.random() * 0.015);

        data.push({
            date: date.toISOString().split('T')[0],
            open: parseFloat(open.toFixed(2)),
            high: parseFloat(high.toFixed(2)),
            low: parseFloat(low.toFixed(2)),
            close: parseFloat(close.toFixed(2)),
        });
    }

    chartDataCache.set(symbol, data);
    return data;
};

export const addBollingerBands = (data: ChartDataPoint[], period = 20): ChartDataPoint[] => {
    return data.map((d, i, all) => {
        if (i < period - 1) {
            return { ...d, upperBand: null, middleBand: null, lowerBand: null };
        }
        const slice = all.slice(i - period + 1, i + 1);
        const sum = slice.reduce((acc, curr) => acc + curr.close, 0);
        const sma = sum / period;
        const stdDev = Math.sqrt(slice.reduce((acc, curr) => acc + Math.pow(curr.close - sma, 2), 0) / period);
        return {
            ...d,
            middleBand: parseFloat(sma.toFixed(2)),
            upperBand: parseFloat((sma + 2 * stdDev).toFixed(2)),
            lowerBand: parseFloat((sma - 2 * stdDev).toFixed(2)),
        };
    });
};

export const addMACD = (data: ChartDataPoint[], shortPeriod = 12, longPeriod = 26, signalPeriod = 9): ChartDataPoint[] => {
    const calculateEMA = (prices: number[], period: number) => {
        const k = 2 / (period + 1);
        const emaArray: number[] = [];
        if (prices.length > 0) {
            emaArray.push(prices[0]);
            for (let i = 1; i < prices.length; i++) {
                const newEma = (prices[i] * k) + (emaArray[i-1] * (1 - k));
                emaArray.push(newEma);
            }
        }
        return emaArray;
    };

    const closePrices = data.map(d => d.close);
    const emaShort = calculateEMA(closePrices, shortPeriod);
    const emaLong = calculateEMA(closePrices, longPeriod);
    
    const macdLine = emaShort.map((val, i) => val - emaLong[i]);
    const signalLine = calculateEMA(macdLine, signalPeriod);
    
    return data.map((d, i) => ({
        ...d,
        macdLine: i >= longPeriod - 1 ? parseFloat(macdLine[i].toFixed(2)) : null,
        signalLine: i >= longPeriod + signalPeriod - 2 ? parseFloat(signalLine[i].toFixed(2)) : null,
        histogram: i >= longPeriod + signalPeriod - 2 ? parseFloat((macdLine[i] - signalLine[i]).toFixed(2)) : null,
    }));
};

export const INITIAL_STOCKS: Stock[] = [
    { symbol: 'RELIANCE.NS', name: 'Reliance Industries', price: 2915.55, open: 2900.00, high: 2925.00, low: 2895.00, prevClose: 2905.10, change: 10.45, changePercent: 0.36, marketCap: 1975000, peRatio: 28.5, eps: 102.3, dividendYield: 0.35, volume: 5200000, sector: 'Energy' },
    { symbol: 'TCS.NS', name: 'Tata Consultancy', price: 3850.75, open: 3860.00, high: 3875.00, low: 3840.00, prevClose: 3855.20, change: -4.45, changePercent: -0.12, marketCap: 1400000, peRatio: 30.2, eps: 127.5, dividendYield: 1.20, volume: 3800000, sector: 'Technology' },
    { symbol: 'HDFCBANK.NS', name: 'HDFC Bank Ltd.', price: 1680.20, open: 1675.00, high: 1690.00, low: 1670.00, prevClose: 1672.80, change: 7.40, changePercent: 0.44, marketCap: 1280000, peRatio: 19.8, eps: 84.9, dividendYield: 0.90, volume: 8900000, sector: 'Finance' },
    { symbol: 'INFY.NS', name: 'Infosys Ltd.', price: 1450.40, open: 1455.00, high: 1460.00, low: 1445.00, prevClose: 1458.90, change: -8.50, changePercent: -0.58, marketCap: 605000, peRatio: 24.1, eps: 60.2, dividendYield: 2.50, volume: 4500000, sector: 'Technology' },
    { symbol: 'ICICIBANK.NS', name: 'ICICI Bank Ltd.', price: 1105.90, open: 1100.00, high: 1110.00, low: 1098.00, prevClose: 1102.30, change: 3.60, changePercent: 0.33, marketCap: 775000, peRatio: 18.5, eps: 59.8, dividendYield: 0.70, volume: 9800000, sector: 'Finance' },
    { symbol: 'HINDUNILVR.NS', name: 'Hindustan Unilever', price: 2450.10, open: 2445.00, high: 2460.00, low: 2440.00, prevClose: 2448.50, change: 1.60, changePercent: 0.07, marketCap: 575000, peRatio: 56.3, eps: 43.5, dividendYield: 1.60, volume: 2300000, sector: 'Consumer Goods' },
    { symbol: 'SBIN.NS', name: 'State Bank of India', price: 830.65, open: 825.00, high: 835.00, low: 823.00, prevClose: 828.15, change: 2.50, changePercent: 0.30, marketCap: 740000, peRatio: 10.9, eps: 76.2, dividendYield: 1.35, volume: 12500000, sector: 'Finance' },
    { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel Ltd.', price: 1215.80, open: 1220.00, high: 1225.00, low: 1210.00, prevClose: 1222.40, change: -6.60, changePercent: -0.54, marketCap: 690000, peRatio: 65.1, eps: 18.7, dividendYield: 0.30, volume: 6300000, sector: 'Telecommunication' },
    { symbol: 'LT.NS', name: 'Larsen & Toubro', price: 3625.50, open: 3610.00, high: 3640.00, low: 3605.00, prevClose: 3618.90, change: 6.60, changePercent: 0.18, marketCap: 495000, peRatio: 35.4, eps: 102.4, dividendYield: 0.65, volume: 1900000, sector: 'Infrastructure' },
    { symbol: 'ITC.NS', name: 'ITC Ltd.', price: 435.25, open: 436.00, high: 438.00, low: 434.00, prevClose: 437.10, change: -1.85, changePercent: -0.42, marketCap: 545000, peRatio: 25.2, eps: 17.3, dividendYield: 3.20, volume: 11000000, sector: 'Consumer Goods' },
    { symbol: 'BAJFINANCE.NS', name: 'Bajaj Finance Ltd.', price: 7275.68, open: 7200.00, high: 7280.00, low: 7180.00, prevClose: 7195.50, change: 80.18, changePercent: 1.11, marketCap: 450000, peRatio: 36.8, eps: 197.7, dividendYield: 0.40, volume: 1600000, sector: 'Finance' },
    { symbol: 'KOTAKBANK.NS', name: 'Kotak Mahindra Bank', price: 1750.90, open: 1760.00, high: 1765.00, low: 1745.00, prevClose: 1755.30, change: -4.40, changePercent: -0.25, marketCap: 348000, peRatio: 19.1, eps: 91.7, dividendYield: 0.80, volume: 5100000, sector: 'Finance' },
    { symbol: 'AXISBANK.NS', name: 'Axis Bank Ltd.', price: 1160.70, open: 1155.00, high: 1165.00, low: 1152.00, prevClose: 1158.40, change: 2.30, changePercent: 0.20, marketCap: 358000, peRatio: 15.6, eps: 74.4, dividendYield: 0.85, volume: 7500000, sector: 'Finance' },
    { symbol: 'HCLTECH.NS', name: 'HCL Technologies', price: 1445.50, open: 1440.00, high: 1450.00, low: 1438.00, prevClose: 1442.10, change: 3.40, changePercent: 0.24, marketCap: 392000, peRatio: 21.3, eps: 67.9, dividendYield: 2.80, volume: 2900000, sector: 'Technology' },
    { symbol: 'MARUTI.NS', name: 'Maruti Suzuki India', price: 12850.15, open: 12800.00, high: 12900.00, low: 12780.00, prevClose: 12830.70, change: 19.45, changePercent: 0.15, marketCap: 387000, peRatio: 30.1, eps: 427.0, dividendYield: 0.70, volume: 850000, sector: 'Automobile' },
    { symbol: 'NESTLEIND.NS', name: 'Nestle India Ltd.', price: 2530.80, open: 2525.00, high: 2540.00, low: 2520.00, prevClose: 2528.50, change: 2.30, changePercent: 0.09, marketCap: 244000, peRatio: 75.8, eps: 33.4, dividendYield: 1.10, volume: 1100000, sector: 'Consumer Goods' },
];

export const NIFTY_50_SYMBOLS = [
    'RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS', 'ICICIBANK.NS',
    'HINDUNILVR.NS', 'SBIN.NS', 'BHARTIARTL.NS', 'LT.NS', 'ITC.NS',
    'BAJFINANCE.NS', 'KOTAKBANK.NS', 'AXISBANK.NS', 'HCLTECH.NS', 'MARUTI.NS'
];

export const SENSEX_SYMBOLS = [
    'RELIANCE.NS', 'TCS.NS', 'HDFCBANK.NS', 'INFY.NS', 'ICICIBANK.NS',
    'HINDUNILVR.NS', 'SBIN.NS', 'BHARTIARTL.NS', 'LT.NS', 'ITC.NS',
    'BAJFINANCE.NS', 'KOTAKBANK.NS', 'AXISBANK.NS', 'NESTLEIND.NS', 'MARUTI.NS'
];

export const BANK_NIFTY_SYMBOLS = [
    'HDFCBANK.NS', 'ICICIBANK.NS', 'SBIN.NS', 'KOTAKBANK.NS', 'AXISBANK.NS',
];

export const MUTUAL_FUNDS_DATA: MutualFund[] = [
    // Existing 50 funds, updated with new fields
    { id: 'MF001', name: 'Axis Bluechip Fund', fundHouse: 'Axis', category: 'Large Cap', nav: 55.23, return1Y: 15.6, return3Y: 22.1, return5Y: 18.5, risk: MutualFundRisk.MODERATELY_HIGH, aum: 35000, expenseRatio: 0.52, fundManager: 'Shreyash Devalkar', inceptionDate: '2010-01-01', minInvestment: 500, description: 'An open-ended equity scheme predominantly investing in large-cap stocks.', topHoldings: [ { stock: 'HDFC Bank', percentage: 9.8 }, { stock: 'Reliance Industries', percentage: 8.5 } ] },
    { id: 'MF002', name: 'Parag Parikh Flexi Cap Fund', fundHouse: 'Parag Parikh', category: 'Flexi Cap', nav: 75.10, return1Y: 25.2, return3Y: 30.5, return5Y: 24.8, risk: MutualFundRisk.VERY_HIGH, aum: 40000, expenseRatio: 0.76, fundManager: 'Rajeev Thakkar', inceptionDate: '2013-05-28', minInvestment: 1000, description: 'An open-ended dynamic equity scheme investing across large cap, mid cap, small cap stocks.', topHoldings: [ { stock: 'Alphabet Inc.', percentage: 8.1 }, { stock: 'HDFC Bank', percentage: 7.5 } ] },
    { id: 'MF003', name: 'Mirae Asset Large Cap Fund', fundHouse: 'Mirae Asset', category: 'Large Cap', nav: 90.45, return1Y: 18.3, return3Y: 24.0, return5Y: 19.1, risk: MutualFundRisk.MODERATELY_HIGH, aum: 36000, expenseRatio: 0.59, fundManager: 'Gaurav Misra', inceptionDate: '2008-04-04', minInvestment: 5000, description: 'A large cap fund that aims to provide long-term capital appreciation from a portfolio investing predominantly in Indian large cap equity shares.', topHoldings: [ { stock: 'ICICI Bank', percentage: 9.2 }, { stock: 'Infosys', percentage: 8.7 } ] },
    { id: 'MF004', name: 'SBI Small Cap Fund', fundHouse: 'SBI', category: 'Small Cap', nav: 170.20, return1Y: 40.1, return3Y: 35.5, return5Y: 28.3, risk: MutualFundRisk.VERY_HIGH, aum: 15000, expenseRatio: 0.70, fundManager: 'R. Srinivasan', inceptionDate: '2009-09-09', minInvestment: 5000, description: 'A small cap fund that seeks to provide investors with opportunities for long-term growth in capital from a diversified portfolio of equity stocks of small cap companies.', topHoldings: [ { stock: 'Carborundum Universal', percentage: 4.5 }, { stock: 'Blue Star Ltd', percentage: 3.9 } ] },
    { id: 'MF005', name: 'HDFC Index Fund - NIFTY 50 Plan', fundHouse: 'HDFC', category: 'Index Fund', nav: 200.50, return1Y: 16.0, return3Y: 21.0, return5Y: 17.5, risk: MutualFundRisk.HIGH, aum: 10000, expenseRatio: 0.20, fundManager: 'Team Managed', inceptionDate: '2002-07-17', minInvestment: 500, description: 'A low-cost index fund that tracks the NIFTY 50 index.', topHoldings: [ { stock: 'Reliance Industries', percentage: 10.5 }, { stock: 'HDFC Bank', percentage: 9.0 } ] },
];
