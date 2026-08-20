import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Portfolio, StockHolding, Trade } from "@/types";
import { getStockBySymbol } from "@/lib/stockData";

interface TradingStore {
  portfolio: Portfolio;
  trades: Trade[];
  buyStock: (symbol: string, shares: number) => boolean;
  sellStock: (symbol: string, shares: number) => boolean;
  updatePrices: () => void;
}

const initialPortfolio: Portfolio = {
  cash: 100_000,
  holdings: [],
  totalValue: 100_000,
  totalGainLoss: 0,
  totalGainLossPercent: 0,
};

function recalcPortfolio(portfolio: Portfolio): Portfolio {
  let totalHoldingsValue = 0;
  let totalCostBasis = 0;

  for (const h of portfolio.holdings) {
    totalHoldingsValue += h.shares * h.currentPrice;
    totalCostBasis += h.shares * h.avgBuyPrice;
  }

  const totalValue = portfolio.cash + totalHoldingsValue;
  const totalGainLoss = totalHoldingsValue - totalCostBasis;
  const totalGainLossPercent =
    totalCostBasis > 0 ? (totalGainLoss / totalCostBasis) * 100 : 0;

  return {
    ...portfolio,
    totalValue,
    totalGainLoss,
    totalGainLossPercent,
  };
}

export const useStore = create<TradingStore>()(
  persist(
    (set, get) => ({
      portfolio: initialPortfolio,
      trades: [],

      buyStock: (symbol: string, shares: number) => {
        const stock = getStockBySymbol(symbol);
        if (!stock) return false;

        const total = stock.price * shares;
        const { portfolio, trades } = get();

        if (total > portfolio.cash) return false;

        const existing = portfolio.holdings.find((h) => h.symbol === symbol);
        let newHoldings: StockHolding[];

        if (existing) {
          const totalShares = existing.shares + shares;
          const totalCost =
            existing.shares * existing.avgBuyPrice + shares * stock.price;
          newHoldings = portfolio.holdings.map((h) =>
            h.symbol === symbol
              ? {
                  ...h,
                  shares: totalShares,
                  avgBuyPrice: totalCost / totalShares,
                }
              : h
          );
        } else {
          newHoldings = [
            ...portfolio.holdings,
            {
              symbol,
              name: stock.name,
              shares,
              avgBuyPrice: stock.price,
              currentPrice: stock.price,
            },
          ];
        }

        const newTrade: Trade = {
          id: crypto.randomUUID(),
          symbol,
          name: stock.name,
          type: "buy",
          shares,
          price: stock.price,
          total,
          timestamp: new Date(),
        };

        const newPortfolio = recalcPortfolio({
          ...portfolio,
          cash: portfolio.cash - total,
          holdings: newHoldings,
        });

        set({
          portfolio: newPortfolio,
          trades: [newTrade, ...trades],
        });

        return true;
      },

      sellStock: (symbol: string, shares: number) => {
        const stock = getStockBySymbol(symbol);
        if (!stock) return false;

        const { portfolio, trades } = get();
        const holding = portfolio.holdings.find((h) => h.symbol === symbol);
        if (!holding || holding.shares < shares) return false;

        const total = stock.price * shares;
        const newHoldings = portfolio.holdings
          .map((h) =>
            h.symbol === symbol ? { ...h, shares: h.shares - shares } : h
          )
          .filter((h) => h.shares > 0);

        const newTrade: Trade = {
          id: crypto.randomUUID(),
          symbol,
          name: stock.name,
          type: "sell",
          shares,
          price: stock.price,
          total,
          timestamp: new Date(),
        };

        const newPortfolio = recalcPortfolio({
          ...portfolio,
          cash: portfolio.cash + total,
          holdings: newHoldings,
        });

        set({
          portfolio: newPortfolio,
          trades: [newTrade, ...trades],
        });

        return true;
      },

      updatePrices: () => {
        const { portfolio } = get();
        const newHoldings = portfolio.holdings.map((h) => {
          const stock = getStockBySymbol(h.symbol);
          return stock ? { ...h, currentPrice: stock.price } : h;
        });
        set({ portfolio: recalcPortfolio({ ...portfolio, holdings: newHoldings }) });
      },
    }),
    {
      name: "trading-store",
    }
  )
);
