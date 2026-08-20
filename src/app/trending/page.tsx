"use client";

import { useState, useMemo } from "react";
import { stocksData, trendingStocks, generatePriceHistory } from "@/lib/stockData";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TrendingPage() {
  const [filter, setFilter] = useState<"gainers" | "losers" | "volume">("gainers");
  const [selectedStock, setSelectedStock] = useState(trendingStocks[0]?.symbol || "NVDA");

  const filteredStocks = useMemo(() => {
    const sorted = [...stocksData];
    switch (filter) {
      case "gainers":
        return sorted.sort((a, b) => b.changePercent - a.changePercent);
      case "losers":
        return sorted.sort((a, b) => a.changePercent - b.changePercent);
      case "volume":
        return sorted.sort((a, b) => b.volume - a.volume);
      default:
        return sorted;
    }
  }, [filter]);

  const chartData = useMemo(() => {
    const stock = stocksData.find((s) => s.symbol === selectedStock);
    return generatePriceHistory(stock?.price || 100, 30);
  }, [selectedStock]);

  const selectedStockData = stocksData.find((s) => s.symbol === selectedStock);

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          Trending Stocks
          <span className="animate-float text-2xl">🔥</span>
        </h1>
        <p className="text-sm text-[var(--muted)]">
          Discover the hottest stocks and market movers today
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <h2 className="mb-4 text-lg font-semibold text-white">
              Trending Now
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {trendingStocks.map((stock, i) => {
                const rankColors = [
                  "from-yellow-400 to-amber-500 shadow-amber-500/30",
                  "from-gray-300 to-gray-400 shadow-gray-400/30",
                  "from-orange-400 to-amber-600 shadow-amber-600/30",
                ];
                const isTop3 = i < 3;

                return (
                  <button
                    key={stock.symbol}
                    onClick={() => setSelectedStock(stock.symbol)}
                    className={`flex items-center justify-between rounded-xl p-4 transition-all duration-200 ${
                      selectedStock === stock.symbol
                        ? "bg-[var(--primary)]/10 border border-[var(--primary)]/30 shadow-lg shadow-[var(--primary-glow)]"
                        : "glass-card hover:border-[var(--primary)]/20 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isTop3 ? (
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${rankColors[i]} text-xs font-bold text-white shadow-lg`}>
                          {i + 1}
                        </div>
                      ) : (
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--background)] text-xs font-bold text-[var(--muted)] border border-[var(--border)]">
                          {i + 1}
                        </span>
                      )}
                      <div className="text-left">
                        <p className="text-sm font-semibold text-white">
                          {stock.symbol}
                        </p>
                        <p className="text-xs text-[var(--muted)]">{stock.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">
                        ${stock.price.toFixed(2)}
                      </p>
                      <p className="text-xs font-semibold text-[var(--success)]">
                        ▲ {stock.changePercent.toFixed(2)}%
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                {selectedStock} - Price Chart
              </h2>
              {selectedStockData && (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-white">
                    ${selectedStockData.price.toFixed(2)}
                  </span>
                  <span className="text-sm font-semibold text-[var(--success)]">
                    ▲ {selectedStockData.changePercent.toFixed(2)}%
                  </span>
                </div>
              )}
            </div>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} key={selectedStock}>
                  <defs>
                    <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3050" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={["auto", "auto"]} />
                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid #1e3050",
                      borderRadius: "12px",
                      color: "#e2e8f0",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#34d399"
                    strokeWidth={2.5}
                    fill="url(#trendGrad)"
                    dot={false}
                    activeDot={{ r: 5, fill: "#34d399", stroke: "#0f172a", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-xl p-6 animate-slide-in-right">
            <div className="mb-4 flex rounded-lg bg-[var(--background)] p-1">
              {(["gainers", "losers", "volume"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 rounded-md py-2 text-xs font-semibold capitalize transition-all ${
                    filter === f
                      ? "bg-gradient-to-r from-[var(--primary)] to-[var(--accent-purple)] text-white shadow-lg shadow-[var(--primary-glow)]"
                      : "text-[var(--muted)] hover:text-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="space-y-1.5">
              {filteredStocks.map((stock, index) => (
                <Link
                  key={stock.symbol}
                  href={`/trade?symbol=${stock.symbol}`}
                  className="flex items-center justify-between rounded-lg p-3 hover:bg-[var(--card-hover)] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[var(--muted)] w-5">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-[var(--primary)] transition-colors">
                        {stock.symbol}
                      </p>
                      <p className="text-xs text-[var(--muted)]">{stock.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">
                      ${stock.price.toFixed(2)}
                    </p>
                    <p
                      className={`text-xs font-semibold ${
                        stock.changePercent >= 0
                          ? "text-[var(--success)]"
                          : "text-[var(--danger)]"
                      }`}
                    >
                      {stock.changePercent >= 0 ? "▲" : "▼"}{" "}
                      {Math.abs(stock.changePercent).toFixed(2)}%
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 animate-slide-in-right" style={{ animationDelay: "100ms" }}>
            <h3 className="mb-3 text-sm font-semibold text-[var(--muted)] uppercase tracking-wider">
              Market Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">Total Stocks</span>
                <span className="font-semibold text-white">{stocksData.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">Gainers</span>
                <span className="font-semibold text-[var(--success)]">
                  {stocksData.filter((s) => s.changePercent > 0).length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">Losers</span>
                <span className="font-semibold text-[var(--danger)]">
                  {stocksData.filter((s) => s.changePercent < 0).length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">Avg Change</span>
                <span className="font-semibold text-white">
                  {(
                    stocksData.reduce((acc, s) => acc + s.changePercent, 0) /
                    stocksData.length
                  ).toFixed(2)}
                  %
                </span>
              </div>
            </div>
            <Link
              href="/ai-recommendations"
              className="mt-4 block w-full rounded-lg bg-gradient-to-r from-purple-500 to-[var(--primary)] py-2.5 text-center text-sm font-bold text-white shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all btn-glow"
            >
              Get AI Recommendations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
