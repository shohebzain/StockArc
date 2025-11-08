export enum OrderType {
    BUY = 'BUY',
    SELL = 'SELL',
}

export enum OrderCategory {
    MARKET = 'MARKET',
    LIMIT = 'LIMIT',
    STOP_LOSS = 'STOP_LOSS',
    TAKE_PROFIT = 'TAKE_PROFIT',
}

export enum OrderStatus {
    OPEN = 'OPEN',
    EXECUTED = 'EXECUTED',
    CANCELLED = 'CANCELLED',
}

export interface Stock {
    symbol: string;
    name: string;
    price: number;
    open: number;
    high: number;
    low: number;
    prevClose: number;
    change: number;
    changePercent: number;
    marketCap: number; // In Crores
    peRatio: number;
    eps: number;
    dividendYield: number;
    volume: number;
    sector: string;
}

export interface Order {
    id: string;
    symbol: string;
    type: OrderType;
    quantity: number;
    category: OrderCategory;
    price: number | null; // For Limit orders
    triggerPrice: number | null; // For Stop-Loss and Take-Profit
    status: OrderStatus;
    timestamp: number;
}

export interface Holding {
    symbol:string;
    quantity: number;
    avgPrice: number;
}

export interface Portfolio {
    holdings: Holding[];
    totalInvested: number;
    currentValue: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    kycStatus: 'NOT_STARTED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
    funds: number;
    learningProgress?: string[];
    mutualFundHoldings?: MutualFundHolding[];
}

export type ChartDataPoint = {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    // For Bollinger Bands
    upperBand?: number | null;
    middleBand?: number | null;
    lowerBand?: number | null;
    // For MACD
    macdLine?: number | null;
    signalLine?: number | null;
    histogram?: number | null;
};

export enum MutualFundRisk {
    LOW = 'Low',
    MODERATELY_LOW = 'Moderately Low',
    MODERATE = 'Moderate',
    MODERATELY_HIGH = 'Moderately High',
    HIGH = 'High',
    VERY_HIGH = 'Very High',
}

export interface MutualFund {
    id: string;
    name: string;
    fundHouse: string;
    category: string;
    nav: number;
    return1Y: number;
    return3Y: number;
    return5Y: number;
    risk: MutualFundRisk;
    aum: number; // in Crores
    expenseRatio: number;
    fundManager: string;
    inceptionDate: string;
    minInvestment: number;
    description: string;
    topHoldings: { stock: string; percentage: number }[];
}

export interface MutualFundHolding {
    fundId: string;
    units: number;
    avgNav: number;
    investedAmount: number;
}

export interface PriceAlert {
    id: string;
    symbol: string;
    targetPrice: number;
    condition: 'above' | 'below';
}

export interface Notification {
    id: string;
    message: string;
    type: 'info' | 'success' | 'danger';
}


export type View = 'dashboard' | 'portfolio' | 'orders' | 'funds' | 'kyc' | 'admin' | 'stock-detail' | 'learning' | 'comparison' | 'support' | 'mutual-funds' | 'mutual-fund-detail' | 'profile' | 'stocks';
export type Page = 'login' | 'register' | 'app';