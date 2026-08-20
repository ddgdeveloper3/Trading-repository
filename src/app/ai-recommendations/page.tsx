"use client";

import { useState } from "react";
import { aiRecommendations } from "@/lib/stockData";
import { useStore } from "@/store/useStore";
import Link from "next/link";

const recommendationStyles: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  strong_buy: {
    bg: "bg-[var(--success)]/15",
    text: "text-[var(--success)]",
    label: "Strong Buy",
  },
  buy: {
    bg: "bg-[var(--success)]/15",
    text: "text-[var(--success)]",
    label: "Buy",
  },
  hold: {
    bg: "bg-[var(--warning)]/15",
    text: "text-[var(--warning)]",
    label: "Hold",
  },
  sell: {
    bg: "bg-[var(--danger)]/15",
    text: "text-[var(--danger)]",
    label: "Sell",
  },
  strong_sell: {
    bg: "bg-[var(--danger)]/15",
    text: "text-[var(--danger)]",
    label: "Strong Sell",
  },
};

const riskStyles: Record<string, { bg: string; text: string }> = {
  low: { bg: "bg-[var(--success)]/15", text: "text-[var(--success)]" },
  medium: { bg: "bg-[var(--warning)]/15", text: "text-[var(--warning)]" },
  high: { bg: "bg-[var(--danger)]/15", text: "text-[var(--danger)]" },
};

export default function AIRecommendationsPage() {
  const [selectedRec, setSelectedRec] = useState<string | null>(null);
  const [riskFilter, setRiskFilter] = useState<"all" | "low" | "medium" | "high">("all");
  const portfolio = useStore((s) => s.portfolio);

  const filteredRecs =
    riskFilter === "all"
      ? aiRecommendations
      : aiRecommendations.filter((r) => r.riskLevel === riskFilter);

  const selectedRecommendation = aiRecommendations.find(
    (r) => r.symbol === selectedRec
  );

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-white">AI Recommendations</h1>
        <p className="text-sm text-[var(--muted)]">
          Powered by advanced market analysis and machine learning algorithms
        </p>
      </div>

      <div className="glass-card rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-[var(--primary)] to-[var(--accent-cyan)] shadow-lg shadow-purple-500/20 animate-float">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold gradient-text">TradeFlow AI Engine</h2>
            <p className="text-xs text-[var(--muted)]">
              Analysis updated as of {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
        </div>
        <p className="text-sm text-[var(--foreground)]/70">
          Our AI analyzes millions of data points including price trends, volume patterns, news sentiment,
          institutional activity, and macroeconomic indicators to generate stock recommendations with confidence scores.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            {(["all", "low", "medium", "high"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setRiskFilter(f)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                  riskFilter === f
                    ? "bg-gradient-to-r from-[var(--primary)] to-[var(--accent-purple)] text-white shadow-lg shadow-[var(--primary-glow)]"
                    : "border border-[var(--border)] text-[var(--muted)] hover:text-white hover:border-[var(--primary)]"
                }`}
              >
                {f === "all" ? "All Risk" : `${f} Risk`}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredRecs.map((rec, index) => {
              const style = recommendationStyles[rec.recommendation];
              const risk = riskStyles[rec.riskLevel];
              const upside = ((rec.targetPrice - rec.currentPrice) / rec.currentPrice * 100).toFixed(1);
              const holding = portfolio.holdings.find((h) => h.symbol === rec.symbol);

              return (
                <div
                  key={rec.symbol}
                  onClick={() => setSelectedRec(rec.symbol)}
                  className={`glass-card cursor-pointer rounded-xl p-5 transition-all duration-200 animate-fade-in-up ${
                    selectedRec === rec.symbol
                      ? "border-[var(--primary)]/50 glow-blue"
                      : "hover:border-[var(--primary)]/30"
                  }`}
                  style={{ animationDelay: `${(index + 3) * 100}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white shadow-lg ${
                        rec.recommendation.includes("buy")
                          ? "bg-gradient-to-br from-emerald-500 to-teal-400 shadow-emerald-500/20"
                          : rec.recommendation === "hold"
                          ? "bg-gradient-to-br from-amber-500 to-yellow-400 shadow-amber-500/20"
                          : "bg-gradient-to-br from-red-500 to-orange-400 shadow-red-500/20"
                      }`}>
                        {rec.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white">
                            {rec.symbol}
                          </h3>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.bg} ${style.text}`}
                          >
                            {style.label}
                          </span>
                        </div>
                        <p className="text-sm text-[var(--muted)]">{rec.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">
                        ${rec.currentPrice.toFixed(2)}
                      </p>
                      <p className={`text-sm font-semibold ${
                        parseFloat(upside) >= 0 ? "text-[var(--success)]" : "text-[var(--danger)]"
                      }`}>
                        Target: ${rec.targetPrice.toFixed(2)} ({parseFloat(upside) >= 0 ? "+" : ""}{upside}%)
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[var(--muted)]">Confidence:</span>
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-[var(--background)]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent-cyan)] animate-bar-fill"
                          style={{ width: `${rec.confidence}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-white">
                        {rec.confidence}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-[var(--muted)]">Risk:</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${risk.bg} ${risk.text}`}>
                        {rec.riskLevel}
                      </span>
                    </div>
                    {holding && (
                      <span className="rounded-full bg-purple-500/15 px-2 py-0.5 text-xs font-semibold text-[var(--accent-purple)]">
                        Owned: {holding.shares} shares
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          {selectedRecommendation ? (
            <div className="glass-card rounded-xl p-6 animate-slide-in-right glow-blue">
              <h3 className="mb-3 text-lg font-semibold text-white">
                {selectedRecommendation.symbol} Analysis
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-1">
                    Recommendation
                  </p>
                  <p className={`text-xl font-bold ${recommendationStyles[selectedRecommendation.recommendation].text}`}>
                    {recommendationStyles[selectedRecommendation.recommendation].label}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-1">
                    AI Reasoning
                  </p>
                  <p className="text-sm leading-relaxed text-[var(--foreground)]/80">
                    {selectedRecommendation.reason}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-[var(--background)]/50 p-3 border border-[var(--border)]/50">
                    <p className="text-xs text-[var(--muted)]">Current Price</p>
                    <p className="text-sm font-bold text-white">
                      ${selectedRecommendation.currentPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-[var(--background)]/50 p-3 border border-[var(--border)]/50">
                    <p className="text-xs text-[var(--muted)]">Target Price</p>
                    <p className="text-sm font-bold text-[var(--success)]">
                      ${selectedRecommendation.targetPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-[var(--background)]/50 p-3 border border-[var(--border)]/50">
                    <p className="text-xs text-[var(--muted)]">Upside</p>
                    <p className="text-sm font-bold text-[var(--success)]">
                      +{((selectedRecommendation.targetPrice - selectedRecommendation.currentPrice) / selectedRecommendation.currentPrice * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="rounded-lg bg-[var(--background)]/50 p-3 border border-[var(--border)]/50">
                    <p className="text-xs text-[var(--muted)]">Confidence</p>
                    <p className="text-sm font-bold gradient-text">
                      {selectedRecommendation.confidence}%
                    </p>
                  </div>
                </div>
                <Link
                  href={`/trade?symbol=${selectedRecommendation.symbol}`}
                  className="block w-full rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--accent-purple)] py-3 text-center text-sm font-bold text-white shadow-lg shadow-[var(--primary-glow)] hover:shadow-xl hover:shadow-[var(--primary-glow)] transition-all btn-glow"
                >
                  Trade {selectedRecommendation.symbol}
                </Link>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-xl p-6">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary)]/10 animate-float">
                  <svg className="h-8 w-8 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <p className="mt-3 text-sm text-[var(--muted)]">
                  Select a recommendation to see detailed analysis
                </p>
              </div>
            </div>
          )}

          <div className="glass-card rounded-xl p-6 animate-slide-in-right" style={{ animationDelay: "100ms" }}>
            <h3 className="mb-3 text-sm font-semibold text-[var(--muted)] uppercase tracking-wider">
              Summary Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">Strong Buy</span>
                <span className="font-semibold text-[var(--success)]">
                  {aiRecommendations.filter((r) => r.recommendation === "strong_buy").length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">Buy</span>
                <span className="font-semibold text-[var(--success)]">
                  {aiRecommendations.filter((r) => r.recommendation === "buy").length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">Hold</span>
                <span className="font-semibold text-[var(--warning)]">
                  {aiRecommendations.filter((r) => r.recommendation === "hold").length}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">Avg Confidence</span>
                <span className="font-semibold gradient-text">
                  {Math.round(
                    aiRecommendations.reduce((acc, r) => acc + r.confidence, 0) /
                      aiRecommendations.length
                  )}
                  %
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--warning)]/30 bg-[var(--warning)]/5 p-4 animate-slide-in-right" style={{ animationDelay: "200ms" }}>
            <div className="flex items-start gap-2">
              <svg className="h-4 w-4 mt-0.5 text-[var(--warning)] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-xs leading-relaxed text-[var(--warning)]">
                <strong>Disclaimer:</strong> AI recommendations are for informational purposes only and should not be considered financial advice. Always do your own research before making investment decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
