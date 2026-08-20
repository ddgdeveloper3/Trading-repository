"use client";

import { useStore } from "@/store/useStore";
import { stocksData } from "@/lib/stockData";
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
import { generatePriceHistory } from "@/lib/stockData";
import { useMemo } from "react";

export default function DashboardPage() {
  const portfolio = useStore((s) => s.portfolio);
  const trades = useStore((s) => s.trades);

  const chartData = useMemo(() => generatePriceHistory(198, 30), []);

  const stats = [
    {
      label: "Portfolio Value",
      value: `$${portfolio.totalValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      href: "/trade",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-400",
      glow: "shadow-blue-500/20",
    },
    {
      label: "Cash Balance",
      value: `$${portfolio.cash.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      href: "/trade",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: "from-emerald-500 to-teal-400",
      glow: "shadow-emerald-500/20",
    },
    {
      label: "Total Gain/Loss",
      value: `${portfolio.totalGainLoss >= 0 ? "+" : ""}$${portfolio.totalGainLoss.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      icon: portfolio.totalGainLoss >= 0 ? (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ) : (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 015.572 5.572l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
      gradient: portfolio.totalGainLoss >= 0 ? "from-emerald-500 to-green-400" : "from-red-500 to-orange-400",
      glow: portfolio.totalGainLoss >= 0 ? "shadow-emerald-500/20" : "shadow-red-500/20",
      href: "/ai-recommendations",
    },
    {
      label: "Open Positions",
      value: portfolio.holdings.length.toString(),
      href: "/trade",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-1.243 1.007-2.25 2.25-2.25h13.5" />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-400",
      glow: "shadow-purple-500/20",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-[var(--muted)]">
          Welcome back! Here&apos;s your portfolio overview.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="stat-card block rounded-xl p-5 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg ${stat.glow}`}>
                {stat.icon}
              </div>
              <span className="text-xs text-[var(--muted)]">{stat.label}</span>
            </div>
            <p className="mt-3 text-xl font-bold text-white">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="glass-card rounded-xl p-6 lg:col-span-2 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <h2 className="mb-4 text-lg font-semibold text-white">
            Portfolio Performance
          </h2>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} key="dashboard-chart">
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3050" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} domain={["auto", "auto"]} />
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
                  stroke="#60a5fa"
                  strokeWidth={2.5}
                  fill="url(#colorPrice)"
                  dot={false}
                  activeDot={{ r: 5, fill: "#60a5fa", stroke: "#0f172a", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
          <h2 className="mb-4 text-lg font-semibold text-white">Top Movers</h2>
          <div className="space-y-2">
            {stocksData.slice(0, 6).map((stock, i) => (
              <Link
                key={stock.symbol}
                href={`/trade?symbol=${stock.symbol}`}
                className="flex items-center justify-between rounded-lg p-3 transition-all hover:bg-[var(--card-hover)] hover:shadow-sm group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[var(--muted)] w-4">{i + 1}</span>
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
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
          <h2 className="mb-4 text-lg font-semibold text-white">
            Your Holdings
          </h2>
          {portfolio.holdings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary)]/10 animate-float">
                <svg className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
                </svg>
              </div>
              <p className="mt-3 text-sm text-[var(--muted)]">
                No holdings yet. Start trading to build your portfolio!
              </p>
              <Link
                href="/trade"
                className="mt-4 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--accent-purple)] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[var(--primary-glow)] hover:shadow-xl hover:shadow-[var(--primary-glow)] transition-all btn-glow"
              >
                Start Trading
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {portfolio.holdings.map((h) => {
                const gainLoss = (h.currentPrice - h.avgBuyPrice) * h.shares;
                const gainLossPercent =
                  ((h.currentPrice - h.avgBuyPrice) / h.avgBuyPrice) * 100;
                return (
                  <Link
                    key={h.symbol}
                    href={`/trade?symbol=${h.symbol}`}
                    className="flex items-center justify-between rounded-lg p-3 transition-all hover:bg-[var(--card-hover)] group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent-purple)]/10 text-xs font-bold text-[var(--primary)]">
                        {h.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white group-hover:text-[var(--primary)] transition-colors">
                          {h.symbol}
                        </p>
                        <p className="text-xs text-[var(--muted)]">
                          {h.shares} shares @ ${h.avgBuyPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">
                        ${(h.shares * h.currentPrice).toFixed(2)}
                      </p>
                      <p
                        className={`text-xs font-semibold ${
                          gainLoss >= 0
                            ? "text-[var(--success)]"
                            : "text-[var(--danger)]"
                        }`}
                      >
                        {gainLoss >= 0 ? "+" : ""}${gainLoss.toFixed(2)} (
                        {gainLossPercent.toFixed(1)}%)
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="glass-card rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
          <h2 className="mb-4 text-lg font-semibold text-white">
            Recent Trades
          </h2>
          {trades.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--accent-purple)]/10 animate-float">
                <svg className="h-8 w-8 text-[var(--accent-purple)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <p className="mt-3 text-sm text-[var(--muted)]">
                No trades yet. Your trade history will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {trades.slice(0, 8).map((t) => (
                <Link
                  key={t.id}
                  href={`/trade?symbol=${t.symbol}`}
                  className="flex items-center justify-between rounded-lg p-3 hover:bg-[var(--card-hover)] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${
                        t.type === "buy"
                          ? "bg-[var(--success)]/15 text-[var(--success)]"
                          : "bg-[var(--danger)]/15 text-[var(--danger)]"
                      }`}
                    >
                      {t.type === "buy" ? "B" : "S"}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {t.type === "buy" ? "Bought" : "Sold"} {t.symbol}
                      </p>
                      <p className="text-xs text-[var(--muted)]">
                        {t.shares} shares @ ${t.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-white">
                    ${t.total.toFixed(2)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
