export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  high52w: number;
  low52w: number;
  sector: string;
  description: string;
}

export interface StockHolding {
  symbol: string;
  name: string;
  shares: number;
  avgBuyPrice: number;
  currentPrice: number;
}

export interface Trade {
  id: string;
  symbol: string;
  name: string;
  type: "buy" | "sell";
  shares: number;
  price: number;
  total: number;
  timestamp: Date;
}

export interface AIRecommendation {
  symbol: string;
  name: string;
  recommendation: "strong_buy" | "buy" | "hold" | "sell" | "strong_sell";
  confidence: number;
  targetPrice: number;
  currentPrice: number;
  reason: string;
  riskLevel: "low" | "medium" | "high";
}

export interface Portfolio {
  cash: number;
  holdings: StockHolding[];
  totalValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
}
