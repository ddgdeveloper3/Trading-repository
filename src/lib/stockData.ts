import { Stock, AIRecommendation } from "@/types";

export const stocksData: Stock[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 198.50,
    change: 3.25,
    changePercent: 1.66,
    volume: 58_230_000,
    marketCap: 3_080_000_000_000,
    high52w: 237.49,
    low52w: 164.08,
    sector: "Technology",
    description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 442.30,
    change: -2.15,
    changePercent: -0.48,
    volume: 22_450_000,
    marketCap: 3_290_000_000_000,
    high52w: 468.35,
    low52w: 385.58,
    sector: "Technology",
    description: "Microsoft Corporation develops and supports software, services, devices, and solutions worldwide.",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 175.80,
    change: 1.92,
    changePercent: 1.10,
    volume: 24_100_000,
    marketCap: 2_170_000_000_000,
    high52w: 201.42,
    low52w: 150.22,
    sector: "Technology",
    description: "Alphabet Inc. offers various products and platforms in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America.",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 218.75,
    change: 5.40,
    changePercent: 2.54,
    volume: 45_670_000,
    marketCap: 2_250_000_000_000,
    high52w: 242.52,
    low52w: 161.02,
    sector: "Consumer Cyclical",
    description: "Amazon.com, Inc. engages in the retail sale of consumer products, advertising, and subscription services.",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 135.20,
    change: 4.85,
    changePercent: 3.73,
    volume: 312_400_000,
    marketCap: 3_320_000_000_000,
    high52w: 153.13,
    low52w: 75.61,
    sector: "Technology",
    description: "NVIDIA Corporation provides graphics and compute & networking solutions in the United States, Taiwan, China, and internationally.",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 342.50,
    change: -8.30,
    changePercent: -2.37,
    volume: 98_120_000,
    marketCap: 1_100_000_000_000,
    high52w: 488.54,
    low52w: 138.80,
    sector: "Consumer Cyclical",
    description: "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems.",
  },
  {
    symbol: "META",
    name: "Meta Platforms Inc.",
    price: 585.40,
    change: 12.60,
    changePercent: 2.20,
    volume: 18_900_000,
    marketCap: 1_490_000_000_000,
    high52w: 638.40,
    low52w: 426.37,
    sector: "Technology",
    description: "Meta Platforms, Inc. engages in the development of products that enable people to connect and share with friends and family.",
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    price: 248.75,
    change: 1.35,
    changePercent: 0.55,
    volume: 9_870_000,
    marketCap: 718_000_000_000,
    high52w: 280.25,
    low52w: 190.29,
    sector: "Financial Services",
    description: "JPMorgan Chase & Co. operates as a financial services company worldwide.",
  },
  {
    symbol: "V",
    name: "Visa Inc.",
    price: 318.90,
    change: -0.75,
    changePercent: -0.23,
    volume: 6_540_000,
    marketCap: 652_000_000_000,
    high52w: 343.77,
    low52w: 252.70,
    sector: "Financial Services",
    description: "Visa Inc. operates a payments technology company worldwide.",
  },
  {
    symbol: "JNJ",
    name: "Johnson & Johnson",
    price: 155.40,
    change: 0.85,
    changePercent: 0.55,
    volume: 7_230_000,
    marketCap: 374_000_000_000,
    high52w: 168.85,
    low52w: 140.68,
    sector: "Healthcare",
    description: "Johnson & Johnson researches, develops, manufactures, and sells various products in the healthcare field worldwide.",
  },
  {
    symbol: "WMT",
    name: "Walmart Inc.",
    price: 96.25,
    change: 0.45,
    changePercent: 0.47,
    volume: 14_320_000,
    marketCap: 777_000_000_000,
    high52w: 105.30,
    low52w: 60.28,
    sector: "Consumer Defensive",
    description: "Walmart Inc. engages in the operation of retail and wholesale stores in various formats worldwide.",
  },
  {
    symbol: "UNH",
    name: "UnitedHealth Group",
    price: 520.80,
    change: 8.40,
    changePercent: 1.64,
    volume: 4_120_000,
    marketCap: 478_000_000_000,
    high52w: 630.73,
    low52w: 436.38,
    sector: "Healthcare",
    description: "UnitedHealth Group Incorporated operates as a diversified health care company worldwide.",
  },
];

export const trendingStocks = stocksData
  .filter((s) => s.changePercent > 0.5)
  .sort((a, b) => b.changePercent - a.changePercent);

export const topMovers = [...stocksData].sort(
  (a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent)
);

export const aiRecommendations: AIRecommendation[] = [
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    recommendation: "strong_buy",
    confidence: 92,
    targetPrice: 165.00,
    currentPrice: 135.20,
    reason: "Strong AI demand driving GPU sales. Data center revenue growth accelerating. New Blackwell architecture gaining traction with major cloud providers.",
    riskLevel: "medium",
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    recommendation: "buy",
    confidence: 85,
    targetPrice: 225.00,
    currentPrice: 198.50,
    reason: "Services revenue continues to grow at double-digit rates. iPhone demand remains strong in emerging markets. AI integration expected to drive upgrade cycle.",
    riskLevel: "low",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    recommendation: "buy",
    confidence: 88,
    targetPrice: 250.00,
    currentPrice: 218.75,
    reason: "AWS cloud growth re-accelerating. Advertising business becoming a major profit center. Margin expansion from operational efficiency improvements.",
    riskLevel: "low",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    recommendation: "buy",
    confidence: 82,
    targetPrice: 490.00,
    currentPrice: 442.30,
    reason: "Copilot AI integration driving enterprise adoption. Azure cloud market share gains continue. Strong recurring revenue base provides stability.",
    riskLevel: "low",
  },
  {
    symbol: "META",
    name: "Meta Platforms Inc.",
    recommendation: "hold",
    confidence: 70,
    targetPrice: 600.00,
    currentPrice: 585.40,
    reason: "Reality Labs continues to weigh on margins. Core advertising business solid but growth decelerating. Valuation fair at current levels.",
    riskLevel: "medium",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    recommendation: "hold",
    confidence: 55,
    targetPrice: 380.00,
    currentPrice: 342.50,
    reason: "EV competition intensifying globally. Autonomous driving timeline uncertain. Energy storage growing but not yet at scale to offset auto margin compression.",
    riskLevel: "high",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    recommendation: "buy",
    confidence: 78,
    targetPrice: 200.00,
    currentPrice: 175.80,
    reason: "Search dominance remains unchallenged. YouTube and Cloud growing rapidly. Waymo autonomous driving could become significant revenue stream.",
    riskLevel: "medium",
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    recommendation: "hold",
    confidence: 72,
    targetPrice: 260.00,
    currentPrice: 248.75,
    reason: "Best-positioned major bank but net interest income growth slowing. Credit quality remains healthy. Dividend yield attractive for income investors.",
    riskLevel: "low",
  },
];

export function getStockBySymbol(symbol: string): Stock | undefined {
  return stocksData.find((s) => s.symbol === symbol);
}

export function generatePriceHistory(
  basePrice: number,
  days: number = 30
): { date: string; price: number; volume: number }[] {
  const history = [];
  let price = basePrice * 0.9;
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const fluctuation = (Math.random() - 0.45) * basePrice * 0.03;
    price = Math.max(price * 0.9, Math.min(price * 1.1, price + fluctuation));
    history.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 50_000_000 + 10_000_000),
    });
  }
  return history;
}
