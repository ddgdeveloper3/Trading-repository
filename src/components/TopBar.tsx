"use client";

import { useStore } from "@/store/useStore";
import { useAuth } from "@/store/useAuth";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { stocksData } from "@/lib/stockData";

const notifications = [
  { id: 1, text: "Market is open - NYSE & NASDAQ trading", time: "9:30 AM", type: "info" },
  { id: 2, text: "NVDA is up 3.73% today", time: "10:15 AM", type: "gain" },
  { id: 3, text: "TSLA dropped 2.37% - review your watchlist", time: "11:02 AM", type: "loss" },
  { id: 4, text: "New AI recommendation available", time: "12:30 PM", type: "info" },
];

export function TopBar() {
  const portfolio = useStore((s) => s.portfolio);
  const { user, logout } = useAuth();
  const router = useRouter();
  const [time, setTime] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const filteredStocks = searchQuery.trim()
    ? stocksData.filter(
        (s) =>
          s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    function update() {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearchSelect(symbol: string) {
    setSearchQuery("");
    setShowSearchResults(false);
    router.push(`/trade?symbol=${symbol}`);
  }

  function handleLogout() {
    logout();
    router.push("/login");
  }

  const gainLossPercent = portfolio.totalGainLossPercent;
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <header className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-sm px-6 py-3">
      <div className="flex items-center gap-4 md:hidden">
        <img src="/logo.png" alt="TradeFlow" className="h-8 w-8 rounded-lg object-cover shadow-lg shadow-[var(--primary-glow)]" />
        <span className="font-bold gradient-text">TradeFlow</span>
      </div>

      <div className="hidden items-center gap-6 md:flex">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-[var(--muted)]">Portfolio:</span>
          <span className="font-bold text-white">
            ${portfolio.totalValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-[var(--muted)]">Cash:</span>
          <span className="font-semibold text-[var(--success)]">
            ${portfolio.cash.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>
        {gainLossPercent !== 0 && (
          <div className="flex items-center gap-1 text-sm">
            <span
              className={`font-semibold ${
                gainLossPercent >= 0 ? "text-[var(--success)]" : "text-[var(--danger)]"
              }`}
            >
              {gainLossPercent >= 0 ? "▲" : "▼"} {Math.abs(gainLossPercent).toFixed(2)}%
            </span>
            <span className="text-xs text-[var(--muted)]">all time</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-3 md:flex">
          <div ref={searchRef} className="relative">
            <div className="flex items-center gap-2 rounded-lg border border-[var(--border)] px-3 py-1.5 bg-[var(--background)]/50 focus-within:border-[var(--primary)] transition-colors">
              <svg className="h-4 w-4 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(e.target.value.length > 0);
                }}
                onFocus={() => searchQuery.length > 0 && setShowSearchResults(true)}
                placeholder="Search stocks..."
                className="bg-transparent text-sm text-white placeholder-[var(--muted)] outline-none w-48"
              />
            </div>

            {showSearchResults && filteredStocks.length > 0 && (
              <div className="absolute left-0 top-full mt-2 w-72 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-black/50 z-50 animate-fade-in-up overflow-hidden">
                <div className="px-3 py-2 text-xs font-semibold text-[var(--muted)] uppercase tracking-wider border-b border-[var(--border)]">
                  Stocks ({filteredStocks.length})
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {filteredStocks.map((stock) => (
                    <button
                      key={stock.symbol}
                      onClick={() => handleSearchSelect(stock.symbol)}
                      className="flex w-full items-center justify-between px-4 py-2.5 hover:bg-[var(--card-hover)] transition-colors text-left"
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">{stock.symbol}</p>
                        <p className="text-xs text-[var(--muted)]">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">${stock.price.toFixed(2)}</p>
                        <p className={`text-xs font-semibold ${stock.changePercent >= 0 ? "text-[var(--success)]" : "text-[var(--danger)]"}`}>
                          {stock.changePercent >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showSearchResults && searchQuery.length > 0 && filteredStocks.length === 0 && (
              <div className="absolute left-0 top-full mt-2 w-72 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-black/50 z-50 animate-fade-in-up p-4 text-center">
                <p className="text-sm text-[var(--muted)]">No stocks found</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--muted)]">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{time}</span>
          </div>
        </div>

        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-lg p-2 text-[var(--muted)] hover:bg-[var(--card-hover)] hover:text-white transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[var(--danger)] pulse-green" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-black/50 z-50 animate-fade-in-up">
              <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
                <h3 className="text-sm font-bold text-white">Notifications</h3>
                <span className="rounded-full bg-[var(--primary)]/15 px-2 py-0.5 text-xs font-semibold text-[var(--primary)]">
                  {notifications.length} new
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-[var(--card-hover)] transition-colors cursor-pointer border-b border-[var(--border)]/50 last:border-0"
                  >
                    <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${
                      n.type === "gain" ? "bg-[var(--success)]" : n.type === "loss" ? "bg-[var(--danger)]" : "bg-[var(--primary)]"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">{n.text}</p>
                      <p className="text-xs text-[var(--muted)] mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/trending"
                onClick={() => setShowNotifications(false)}
                className="block text-center text-xs font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)] py-3 border-t border-[var(--border)] transition-colors"
              >
                View all market activity
              </Link>
            </div>
          )}
        </div>

        <div className="relative" ref={userRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent-purple)] text-xs font-bold text-white shadow-lg shadow-[var(--primary-glow)] hover:shadow-xl transition-shadow"
          >
            {initials}
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-black/50 z-50 animate-fade-in-up overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--border)]">
                <p className="text-sm font-bold text-white">{user?.name}</p>
                <p className="text-xs text-[var(--muted)]">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm text-[var(--danger)] hover:bg-[var(--card-hover)] transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
