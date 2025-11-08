

import React, { useState, useCallback, useEffect } from 'react';
import { ADMIN_USERS_DATA, INITIAL_STOCKS, MUTUAL_FUNDS_DATA } from './constants';
import type { User, Order, Holding, Stock, View, Page, MutualFundHolding, MutualFund, PriceAlert, Notification as NotificationType } from './types';
import { OrderType, OrderStatus, OrderCategory } from './types';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Portfolio from './components/Portfolio';
import Orders from './components/Orders';
import Funds from './components/Funds';
import KycOnboarding from './components/KycOnboarding';
import AdminDashboard from './components/AdminDashboard';
import StockDetail from './components/StockDetail';
import Login from './components/Login';
import Register from './components/Register';
import LearningCenter from './components/LearningCenter';
import StockComparison from './components/StockComparison';
import Support from './components/Support';
import MutualFunds from './components/MutualFunds';
import MutualFundDetail from './components/MutualFundDetail';
import Profile from './components/Profile';
import Notifications from './components/Notifications';
import StocksPage from './components/StocksPage';

const App: React.FC = () => {
    const [stocks, setStocks] = useState<Stock[]>(INITIAL_STOCKS);
    const [mutualFunds, setMutualFunds] = useState<MutualFund[]>(MUTUAL_FUNDS_DATA);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([...ADMIN_USERS_DATA, { id: 'USR001', name: 'Demo User', email: 'demo@stockarc.com', password: 'password', kycStatus: 'VERIFIED', funds: 500000, mutualFundHoldings: [], learningProgress: [] }]);
    const [page, setPage] = useState<Page>('login');
    const [view, setView] = useState<View>('dashboard');
    const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
    const [selectedMutualFund, setSelectedMutualFund] = useState<MutualFund | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [holdings, setHoldings] = useState<Holding[]>([]);
    const [favorites, setFavorites] = useState<string[]>(['RELIANCE.NS', 'TCS.NS', 'BAJFINANCE.NS']);
    const [comparisonList, setComparisonList] = useState<string[]>([]);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);


    // State for alerts and notifications
    const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([]);
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    
    // --- NOTIFICATION & ALERT HANDLERS ---
    const addNotification = useCallback((message: string, type: NotificationType['type']) => {
        const newNotification: NotificationType = {
            id: `notif-${Date.now()}-${Math.random()}`,
            message,
            type,
        };
        setNotifications(prev => [newNotification, ...prev]);

        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
        }, 5000);
    }, []);
    
    const removeNotification = useCallback((id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    }, []);

    const addPriceAlert = useCallback((alertData: Omit<PriceAlert, 'id'>) => {
        setPriceAlerts(prev => {
            const existingIndex = prev.findIndex(a => a.symbol === alertData.symbol);
            const newAlert = { ...alertData, id: `alert-${alertData.symbol}-${Date.now()}` };
            if (existingIndex > -1) {
                const updatedAlerts = [...prev];
                updatedAlerts[existingIndex] = newAlert;
                return updatedAlerts;
            }
            return [...prev, newAlert];
        });
        addNotification(`Alert set for ${alertData.symbol} when price is ${alertData.condition} ₹${alertData.targetPrice}`, 'info');
    }, [addNotification]);

    const removePriceAlert = useCallback((symbol: string) => {
        const alertExists = priceAlerts.some(a => a.symbol === symbol);
        if (alertExists) {
            setPriceAlerts(prev => prev.filter(a => a.symbol !== symbol));
            addNotification(`Alert for ${symbol} has been removed.`, 'info');
        }
    }, [priceAlerts, addNotification]);
    
    // --- AUTH & NAVIGATION ---
    const handleLogin = (email: string, password: string): string => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            setCurrentUser(user);
            setPage('app');
            return "Login successful!";
        }
        return "Invalid email or password.";
    };
    
    const handleRegister = (name: string, email: string, password: string): string => {
        if (users.some(u => u.email === email)) {
            return "An account with this email already exists.";
        }
        const newUser: User = {
            id: `USR${Math.random().toString(36).substr(2, 9)}`,
            name,
            email,
            password,
            kycStatus: 'NOT_STARTED',
            funds: 0,
            learningProgress: [],
            mutualFundHoldings: []
        };
        setUsers(prev => [...prev, newUser]);
        return "Registration successful! Please login.";
    };
    
    const handleLogout = () => {
        setCurrentUser(null);
        setPage('login');
        setView('dashboard');
    };
    
    const handleSetView = (newView: View) => {
        setView(newView);
        setSelectedStock(null);
        setSelectedMutualFund(null);
    };
    
    const viewStockDetail = (stock: Stock) => {
        setSelectedStock(stock);
        setView('stock-detail');
    };
    
    const viewMutualFundDetail = (fund: MutualFund) => {
        setSelectedMutualFund(fund);
        setView('mutual-fund-detail');
    };

    // --- TRADING & PORTFOLIO LOGIC ---
    const placeOrder = useCallback((orderData: Omit<Order, 'id' | 'status' | 'timestamp'>) => {
        const newOrder: Order = {
            ...orderData,
            id: `ORD${Date.now()}`,
            status: OrderStatus.OPEN,
            timestamp: Date.now(),
        };
        setOrders(prev => [newOrder, ...prev]);
        addNotification(`Order placed for ${orderData.quantity} ${orderData.symbol} @ ${orderData.category}`, 'success');
    }, [addNotification]);
    
    const cancelOrder = useCallback((orderId: string) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: OrderStatus.CANCELLED } : o));
    }, []);
    
    // --- SIMULATION ENGINE ---
    useEffect(() => {
        const interval = setInterval(() => {
            if (!currentUser) return;
            
            let newHoldings = [...holdings];
            let newOrders = [...orders];
            let userFunds = currentUser.funds;
            let triggeredAlerts: string[] = [];

            const updatedStocks = stocks.map(stock => {
                const changePercent = (Math.random() - 0.5) * 0.02;
                const change = stock.price * changePercent;
                const newPrice = Math.max(0.1, stock.price + change);

                // Simulate volume changes
                const volumeChange = (Math.random() - 0.4) * (stock.volume * 0.01); // change up to 1% of volume, skewed to increase
                const newVolume = Math.max(10000, stock.volume + volumeChange);
                
                const alert = priceAlerts.find(a => a.symbol === stock.symbol);
                if (alert) {
                    const crossedAbove = stock.price < alert.targetPrice && newPrice >= alert.targetPrice;
                    const crossedBelow = stock.price > alert.targetPrice && newPrice <= alert.targetPrice;

                    if ((alert.condition === 'above' && crossedAbove) || (alert.condition === 'below' && crossedBelow)) {
                        addNotification(`${stock.symbol} has crossed ${alert.condition} ₹${alert.targetPrice.toFixed(2)}. Current price: ₹${newPrice.toFixed(2)}`, 'info');
                        triggeredAlerts.push(alert.symbol);
                    }
                }
                
                return { ...stock, price: newPrice, change, changePercent: changePercent * 100, volume: newVolume };
            });

            newOrders = newOrders.map(order => {
                if (order.status !== OrderStatus.OPEN) return order;

                const stock = updatedStocks.find(s => s.symbol === order.symbol);
                if (!stock) return order;

                let shouldExecute = false;
                if (order.category === OrderCategory.MARKET) shouldExecute = true;
                if (order.category === OrderCategory.LIMIT && order.price) {
                    if (order.type === OrderType.BUY && stock.price <= order.price) shouldExecute = true;
                    if (order.type === OrderType.SELL && stock.price >= order.price) shouldExecute = true;
                }
                if (order.category === OrderCategory.STOP_LOSS && order.triggerPrice) {
                    if (stock.price <= order.triggerPrice) shouldExecute = true; // Sell to stop further loss
                }
                if (order.category === OrderCategory.TAKE_PROFIT && order.triggerPrice) {
                    if (stock.price >= order.triggerPrice) shouldExecute = true; // Sell to take profit
                }
                
                if (shouldExecute) {
                    const transactionValue = stock.price * order.quantity;
                    const holdingIndex = newHoldings.findIndex(h => h.symbol === order.symbol);

                    if (order.type === OrderType.BUY) {
                        if (holdingIndex > -1) {
                            const existing = newHoldings[holdingIndex];
                            const totalValue = existing.avgPrice * existing.quantity + transactionValue;
                            const totalQuantity = existing.quantity + order.quantity;
                            newHoldings[holdingIndex] = { ...existing, quantity: totalQuantity, avgPrice: totalValue / totalQuantity };
                        } else {
                            newHoldings.push({ symbol: order.symbol, quantity: order.quantity, avgPrice: stock.price });
                        }
                        userFunds -= transactionValue;
                    } else { // SELL
                        if (holdingIndex > -1) {
                            newHoldings[holdingIndex].quantity -= order.quantity;
                            if (newHoldings[holdingIndex].quantity === 0) {
                                newHoldings.splice(holdingIndex, 1);
                            }
                        }
                        userFunds += transactionValue;
                    }
                    return { ...order, status: OrderStatus.EXECUTED };
                }
                return order;
            });
            
            setStocks(updatedStocks);
            setOrders(newOrders);
            setHoldings(newHoldings);
            if (currentUser.funds !== userFunds) {
                setCurrentUser(prev => prev ? { ...prev, funds: userFunds } : null);
            }
            if (triggeredAlerts.length > 0) {
                setPriceAlerts(prev => prev.filter(a => !triggeredAlerts.includes(a.symbol)));
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [stocks, orders, holdings, currentUser, priceAlerts, addNotification]);
    
    // --- OTHER HANDLERS ---
    const toggleFavorite = useCallback((symbol: string) => {
        setFavorites(prev => prev.includes(symbol) ? prev.filter(s => s !== symbol) : [...prev, symbol]);
    }, []);
    
    const onToggleComparison = useCallback((symbol: string) => {
        setComparisonList(prev => prev.includes(symbol)
            ? prev.filter(s => s !== symbol)
            : prev.length < 4 ? [...prev, symbol] : prev);
    }, []);

    const clearComparison = useCallback(() => setComparisonList([]), []);

    const handleInvestInMutualFund = useCallback((fundId: string, amount: number) => {
        if (!currentUser) return;
        const fund = mutualFunds.find(f => f.id === fundId);
        if (!fund) return;
        
        const units = amount / fund.nav;
        const newHoldings = [...(currentUser.mutualFundHoldings || [])];
        const existingHoldingIndex = newHoldings.findIndex(h => h.fundId === fundId);

        if (existingHoldingIndex > -1) {
            const existing = newHoldings[existingHoldingIndex];
            const totalInvested = existing.investedAmount + amount;
            const totalUnits = existing.units + units;
            newHoldings[existingHoldingIndex] = {
                ...existing,
                units: totalUnits,
                investedAmount: totalInvested,
                avgNav: totalInvested / totalUnits,
            };
        } else {
            newHoldings.push({
                fundId,
                units,
                avgNav: fund.nav,
                investedAmount: amount,
            });
        }
        
        const updatedUser = { ...currentUser, funds: currentUser.funds - amount, mutualFundHoldings: newHoldings };
        setCurrentUser(updatedUser);
        addNotification(`Successfully invested ₹${amount} in ${fund.name}`, 'success');
    }, [currentUser, mutualFunds, addNotification]);
    
    const updateLearningProgress = useCallback((articleTitle: string) => {
        setCurrentUser(prevUser => {
            if (!prevUser) return null;
            const progress = new Set(prevUser.learningProgress || []);
            progress.add(articleTitle);
            return { ...prevUser, learningProgress: Array.from(progress) };
        });
    }, []);
    
    const updateUserProfile = useCallback((user: User) => setCurrentUser(user), []);
    
    const handleChangePassword = (oldPass: string, newPass: string): string => {
        if (currentUser?.password !== oldPass) return "Current password is incorrect.";
        setCurrentUser({ ...currentUser, password: newPass });
        return "Password updated successfully!";
    };
    
    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);
    
    // --- RENDER LOGIC ---
    if (!currentUser) {
        if (page === 'register') {
            return <Register onRegister={handleRegister} onNavigateToLogin={() => setPage('login')} />;
        }
        return <Login onLogin={handleLogin} onNavigateToRegister={() => setPage('register')} />;
    }

    const renderView = () => {
        switch (view) {
            case 'dashboard': return <Dashboard stocks={stocks} viewStockDetail={viewStockDetail} favorites={favorites} toggleFavorite={toggleFavorite} currentUser={currentUser} holdings={holdings} orders={orders} />;
            case 'stocks': return <StocksPage stocks={stocks} viewStockDetail={viewStockDetail} />;
            case 'stock-detail': return selectedStock ? <StockDetail stock={selectedStock} placeOrder={placeOrder} onBack={() => handleSetView('dashboard')} orders={orders} onCancelOrder={cancelOrder} currentUser={currentUser} holdings={holdings} /> : null;
            case 'portfolio': return <Portfolio holdings={holdings} stocks={stocks} currentUser={currentUser} placeOrder={placeOrder} orders={orders}/>;
            case 'orders': return <Orders orders={orders} onCancelOrder={cancelOrder} />;
            case 'funds': return <Funds user={currentUser} setUser={setCurrentUser} />;
            case 'kyc': return <KycOnboarding user={currentUser} setUser={setCurrentUser} setView={handleSetView} />;
            case 'admin': return <AdminDashboard />;
            case 'learning': return <LearningCenter user={currentUser} onUpdateProgress={updateLearningProgress} />;
            case 'comparison': return <StockComparison stockSymbols={comparisonList} allStocks={stocks} onBack={() => handleSetView('dashboard')} />;
            case 'support': return <Support user={currentUser} />;
            case 'mutual-funds': return <MutualFunds onViewDetail={viewMutualFundDetail} />;
            case 'mutual-fund-detail': return selectedMutualFund ? <MutualFundDetail fund={selectedMutualFund} onInvest={handleInvestInMutualFund} onBack={() => handleSetView('mutual-funds')} currentUser={currentUser} /> : null;
            case 'profile': return <Profile user={currentUser} updateUser={updateUserProfile} handleChangePassword={handleChangePassword} theme={theme} setTheme={setTheme} holdings={holdings} />;
            default: return <Dashboard stocks={stocks} viewStockDetail={viewStockDetail} favorites={favorites} toggleFavorite={toggleFavorite} currentUser={currentUser} holdings={holdings} orders={orders} />;
        }
    };
    
    return (
        <>
            <div className="bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary min-h-screen">
                <Navbar user={currentUser} setView={handleSetView} activeView={view} onLogout={handleLogout} isOpen={isSidebarOpen} />
                <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                    <main className="h-screen overflow-y-auto p-6">
                         <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 mb-4 rounded-md text-dark-text-secondary hover:bg-dark-border"
                            aria-label="Toggle navigation"
                        >
                            <i className="fas fa-bars text-xl"></i>
                        </button>
                        {renderView()}
                    </main>
                </div>
            </div>
            <Notifications notifications={notifications} removeNotification={removeNotification} />
        </>
    );
};

export default App;
