"use client";

import { stocksData } from "@/lib/stockData";
import Link from "next/link";

export function MarketTicker() {
  const tickerItems = [...stocksData, ...stocksData];

  return (
    <div className="border-b border-[var(--border)] bg-[var(--card)]/50 py-1.5">
      <div className="ticker-wrap">
        <div className="ticker-content">
          {tickerItems.map((stock, i) => (
            <Link
              key={`${stock.symbol}-${i}`}
              href={`/trade?symbol=${stock.symbol}`}
              className="inline-flex items-center gap-2 px-4 text-xs hover:bg-[var(--card-hover)] rounded transition-colors cursor-pointer"
            >
              <span className="font-semibold text-white hover:text-[var(--primary)] transition-colors">{stock.symbol}</span>
              <span className="text-[var(--muted)]">${stock.price.toFixed(2)}</span>
              <span
                className={`font-medium ${
                  stock.changePercent >= 0
                    ? "text-[var(--success)]"
                    : "text-[var(--danger)]"
                }`}
              >
                {stock.changePercent >= 0 ? "▲" : "▼"}{" "}
                {Math.abs(stock.changePercent).toFixed(2)}%
              </span>
              <span className="ml-2 text-[var(--border)]">|</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
