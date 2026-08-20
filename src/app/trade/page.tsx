"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { stocksData, generatePriceHistory, getStockBySymbol } from "@/lib/stockData";
import { useStore } from "@/store/useStore";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Suspense } from "react";

function TradeContent() {
  const searchParams = useSearchParams();
  const initialSymbol = searchParams.get("symbol") || "AAPL";

  const [selectedSymbol, setSelectedSymbol] = useState(initialSymbol);
  const [tab, setTab] = useState<"buy" | "sell">("buy");
  const [shares, setShares] = useState("");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [limitPrice, setLimitPrice] = useState("");
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const symbol = searchParams.get("symbol");
    if (symbol) setSelectedSymbol(symbol);
  }, [searchParams]);

  const stock = getStockBySymbol(selectedSymbol);
  const portfolio = useStore((s) => s.portfolio);
  const buyStock = useStore((s) => s.buyStock);
  const sellStock = useStore((s) => s.sellStock);

  const priceHistory = useMemo(
    () => generatePriceHistory(stock?.price || 100, 30),
    [selectedSymbol]
  );

  const holding = portfolio.holdings.find((h) => h.symbol === selectedSymbol);
  const sharesNum = parseInt(shares) || 0;
  const price = stock?.price || 0;
  const totalCost = sharesNum * price;
  const canBuy = tab === "buy" && sharesNum > 0 && totalCost <= portfolio.cash;
  const canSell =
    tab === "sell" && sharesNum > 0 && holding && sharesNum <= holding.shares;

  function handleTrade() {
    if (!stock) return;
    let success: boolean;
    if (tab === "buy") {
      success = buyStock(stock.symbol, sharesNum);
    } else {
      success = sellStock(stock.symbol, sharesNum);
    }

    if (success) {
      setNotification({
        type: "success",
        message: `Successfully ${tab === "buy" ? "bought" : "sold"} ${sharesNum} shares of ${stock.symbol}`,
      });
      setShares("");
    } else {
      setNotification({
        type: "error",
        message: `Failed to ${tab} stock. ${tab === "buy" ? "Insufficient funds." : "Insufficient shares."}`,
      });
    }

    setTimeout(() => setNotification(null), 3000);
  }

  if (!stock) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-[var(--muted)]">Stock not found.</p>
      </div>
    );
  }

  const isPositive = stock.changePercent >= 0;

  return (
    <div className="space-y-6">
      {notification && (
        <div
          className={`fixed right-4 top-4 z-50 rounded-xl px-5 py-3 text-sm font-semibold shadow-2xl animate-slide-in-right ${
            notification.type === "success"
              ? "bg-[var(--success)] text-white glow-green"
              : "bg-[var(--danger)] text-white glow-red"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-white">Trade Stocks</h1>
        <p className="text-sm text-[var(--muted)]">
          Buy and sell stocks with real-time pricing
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-xl p-6 animate-fade-in-up">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white shadow-lg ${
                  isPositive
                    ? "bg-gradient-to-br from-emerald-500 to-teal-400 shadow-emerald-500/20"
                    : "bg-gradient-to-br from-red-500 to-orange-400 shadow-red-500/20"
                }`}>
                  {stock.symbol.slice(0, 2)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">{stock.symbol}</h2>
                  <p className="text-sm text-[var(--muted)]">{stock.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">
                  ${stock.price.toFixed(2)}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    isPositive ? "text-[var(--success)]" : "text-[var(--danger)]"
                  }`}
                >
                  {isPositive ? "▲" : "▼"}{" "}
                  {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </p>
              </div>
            </div>

            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={priceHistory} key={selectedSymbol}>
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={isPositive ? "#34d399" : "#f87171"}
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor={isPositive ? "#34d399" : "#f87171"}
                        stopOpacity={0}
                      />
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
                    stroke={isPositive ? "#34d399" : "#f87171"}
                    strokeWidth={2.5}
                    fill="url(#chartGrad)"
                    dot={false}
                    activeDot={{ r: 5, fill: isPositive ? "#34d399" : "#f87171", stroke: "#0f172a", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <h3 className="mb-3 text-sm font-semibold text-[var(--muted)] uppercase tracking-wider">
              About
            </h3>
            <p className="text-sm leading-relaxed text-[var(--foreground)]/80">
              {stock.description}
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Volume", value: `${(stock.volume / 1_000_000).toFixed(1)}M` },
                { label: "Market Cap", value: `$${(stock.marketCap / 1_000_000_000_000).toFixed(1)}T` },
                { label: "52W High", value: `$${stock.high52w.toFixed(2)}` },
                { label: "52W Low", value: `$${stock.low52w.toFixed(2)}` },
              ].map((item) => (
                <div key={item.label} className="rounded-lg bg-[var(--background)]/50 p-3 border border-[var(--border)]/50">
                  <p className="text-xs text-[var(--muted)]">{item.label}</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-xl p-6 animate-slide-in-right">
            <div className="mb-4 flex rounded-lg bg-[var(--background)] p-1">
              <button
                onClick={() => setTab("buy")}
                className={`flex-1 rounded-md py-2.5 text-sm font-semibold transition-all ${
                  tab === "buy"
                    ? "bg-[var(--success)] text-white shadow-lg shadow-[var(--success-glow)]"
                    : "text-[var(--muted)] hover:text-white"
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setTab("sell")}
                className={`flex-1 rounded-md py-2.5 text-sm font-semibold transition-all ${
                  tab === "sell"
                    ? "bg-[var(--danger)] text-white shadow-lg shadow-[var(--danger-glow)]"
                    : "text-[var(--muted)] hover:text-white"
                }`}
              >
                Sell
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs text-[var(--muted)]">
                  Order Type
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setOrderType("market")}
                    className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                      orderType === "market"
                        ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] shadow-sm shadow-[var(--primary-glow)]"
                        : "border-[var(--border)] text-[var(--muted)] hover:text-white"
                    }`}
                  >
                    Market
                  </button>
                  <button
                    onClick={() => setOrderType("limit")}
                    className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                      orderType === "limit"
                        ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] shadow-sm shadow-[var(--primary-glow)]"
                        : "border-[var(--border)] text-[var(--muted)] hover:text-white"
                    }`}
                  >
                    Limit
                  </button>
                </div>
              </div>

              {orderType === "limit" && (
                <div className="animate-fade-in-up">
                  <label className="mb-1 block text-xs text-[var(--muted)]">
                    Limit Price
                  </label>
                  <input
                    type="number"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm text-white placeholder-[var(--muted)] outline-none focus:border-[var(--primary)] focus:shadow-sm focus:shadow-[var(--primary-glow)] transition-all"
                  />
                </div>
              )}

              <div>
                <label className="mb-1 block text-xs text-[var(--muted)]">
                  Shares
                </label>
                <input
                  type="number"
                  value={shares}
                  onChange={(e) => setShares(e.target.value)}
                  placeholder="0"
                  min="1"
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm text-white placeholder-[var(--muted)] outline-none focus:border-[var(--primary)] focus:shadow-sm focus:shadow-[var(--primary-glow)] transition-all"
                />
                <div className="mt-2 flex gap-2">
                  {[10, 25, 50, 100].map((n) => (
                    <button
                      key={n}
                      onClick={() => setShares(n.toString())}
                      className="flex-1 rounded-md border border-[var(--border)] py-1.5 text-xs font-medium text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all"
                    >
                      {n}
                    </button>
                  ))}
                </div>
                {sharesNum === 0 && (
                  <p className="mt-2 text-xs text-[var(--primary)] animate-pulse">
                    Enter the number of shares above or tap a quick-select button
                  </p>
                )}
              </div>

              <div className="space-y-2 rounded-lg bg-[var(--background)]/50 p-3 border border-[var(--border)]/50">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted)]">Market Price</span>
                  <span className="text-white font-medium">${price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted)]">Shares</span>
                  <span className="text-white font-medium">{sharesNum || 0}</span>
                </div>
                <div className="border-t border-[var(--border)] pt-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-[var(--muted)]">Estimated Total</span>
                    <span className="gradient-text">${totalCost.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {tab === "buy" && (
                <p className="text-xs text-[var(--muted)]">
                  Available cash: <span className="text-[var(--success)] font-semibold">${portfolio.cash.toFixed(2)}</span>
                </p>
              )}
              {tab === "sell" && (
                <p className="text-xs text-[var(--muted)]">
                  Shares owned: <span className="text-white font-semibold">{holding?.shares || 0}</span>
                </p>
              )}

              <button
                onClick={handleTrade}
                disabled={tab === "buy" ? !canBuy : !canSell}
                title={tab === "buy" && sharesNum === 0 ? "Enter the number of shares to enable buying" : undefined}
                className={`w-full rounded-lg py-3.5 text-sm font-bold text-white transition-all btn-glow ${
                  tab === "buy"
                    ? "bg-gradient-to-r from-emerald-500 to-teal-400 hover:shadow-lg hover:shadow-[var(--success-glow)] disabled:from-emerald-500/30 disabled:to-teal-400/30 disabled:shadow-none"
                    : "bg-gradient-to-r from-red-500 to-orange-400 hover:shadow-lg hover:shadow-[var(--danger-glow)] disabled:from-red-500/30 disabled:to-orange-400/30 disabled:shadow-none"
                } disabled:cursor-not-allowed`}
              >
                {tab === "buy" ? "Buy" : "Sell"} {stock.symbol}
              </button>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 animate-slide-in-right" style={{ animationDelay: "100ms" }}>
            <h3 className="mb-3 text-sm font-semibold text-[var(--muted)] uppercase tracking-wider">
              Quick Select
            </h3>
            <div className="space-y-1.5">
              {stocksData.slice(0, 8).map((s) => (
                <button
                  key={s.symbol}
                  onClick={() => setSelectedSymbol(s.symbol)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-all ${
                    selectedSymbol === s.symbol
                      ? "bg-[var(--primary)]/10 border border-[var(--primary)]/30 shadow-sm shadow-[var(--primary-glow)]"
                      : "hover:bg-[var(--card-hover)] border border-transparent"
                  }`}
                >
                  <span className={`text-sm font-semibold ${
                    selectedSymbol === s.symbol ? "text-[var(--primary)]" : "text-white"
                  }`}>
                    {s.symbol}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      s.changePercent >= 0
                        ? "text-[var(--success)]"
                        : "text-[var(--danger)]"
                    }`}
                  >
                    {s.changePercent >= 0 ? "▲" : "▼"}{" "}
                    {Math.abs(s.changePercent).toFixed(2)}%
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TradePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
        </div>
      }
    >
      <TradeContent />
    </Suspense>
  );
}
