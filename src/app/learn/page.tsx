"use client";

import { useState } from "react";

interface CrashFactor {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  glow: string;
  description: string;
  warningSigns: string[];
  example: string;
  preventionTips: string[];
}

const crashFactors: CrashFactor[] = [
  {
    id: "bubbles",
    title: "Speculative Bubbles Bursting",
    subtitle: "When hype meets reality",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    color: "text-amber-400",
    gradient: "from-amber-500 to-yellow-400",
    glow: "shadow-amber-500/30",
    description:
      "When investors become overly optimistic about a sector or the market as a whole, prices can rise far above their true economic value. At first, everyone feels like a winner as prices keep climbing, drawing in even more buyers. However, when reality sets in — disappointing earnings, slowing growth, or inability to deliver real-world utility — stockholders sell in a panic, causing prices to drop rapidly.",
    warningSigns: [
      "Stock prices rising far faster than company earnings",
      "Mass media hype and \"everyone is investing\" sentiment",
      "New investors entering the market with little knowledge",
      "Valuations at historically extreme levels (P/E ratios)",
      "\"This time is different\" narrative becoming dominant",
    ],
    example:
      "The Dot-com Bubble (1999-2000): Internet company valuations soared to absurd levels based on speculation rather than fundamentals. When the bubble burst, the NASDAQ lost 78% of its value, wiping out $5 trillion in market capitalization.",
    preventionTips: [
      "Research a company's fundamentals before investing",
      "Be wary of investments that \"seem too good to be true\"",
      "Diversify across sectors and asset classes",
      "Set stop-loss orders to limit potential downside",
    ],
  },
  {
    id: "leverage",
    title: "Excessive Leverage",
    subtitle: "Borrowed money, magnified risk",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
      </svg>
    ),
    color: "text-red-400",
    gradient: "from-red-500 to-orange-400",
    glow: "shadow-red-500/30",
    description:
      "Leverage involves borrowing money to invest, which magnifies both gains and losses. In good times, this can turbocharge returns. But when markets turn, highly leveraged positions can unravel quickly. As prices fall, lenders demand more collateral or force investors to sell assets to cover their debts, creating a vicious cycle of selling pressure. This dynamic is particularly dangerous when combined with complex financial products that are poorly understood by the wider market.",
    warningSigns: [
      "Rapidly rising margin debt in the market",
      "Complex derivative products with layered risk",
      "Institutions with dangerously high debt-to-equity ratios",
      "Easy credit conditions encouraging overborrowing",
      "Hedge funds with extreme leverage ratios",
    ],
    example:
      "The 2008 Financial Crisis: Banks had leveraged mortgage-backed securities at ratios as high as 30:1. When housing prices fell, the losses were catastrophic. Lehman Brothers collapsed with $639 billion in assets, triggering a global financial meltdown.",
    preventionTips: [
      "Avoid investing with borrowed money (margin trading)",
      "Understand the leverage embedded in any financial product",
      "Monitor corporate debt levels in your portfolio companies",
      "Maintain a healthy cash reserve for market downturns",
    ],
  },
  {
    id: "shocks",
    title: "Sudden Economic Shocks",
    subtitle: "Unpredictable disruptions",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    color: "text-cyan-400",
    gradient: "from-cyan-500 to-blue-400",
    glow: "shadow-cyan-500/30",
    description:
      "The stock market is closely intertwined with macroeconomic factors. Unexpected events can send shockwaves through financial markets. These shocks disrupt business activity, weaken consumer confidence, and create uncertainty about future growth. Examples include pandemics, major corporate bankruptcies, or sudden changes in global trade. Because they are so unpredictable, these shocks can trigger panic selling almost overnight.",
    warningSigns: [
      "Declining consumer confidence indices",
      "Sudden credit market freezes",
      "Major corporate defaults or bankruptcies",
      "Supply chain disruptions becoming widespread",
      "Rapid shifts in economic indicators (GDP, employment)",
    ],
    example:
      "COVID-19 Market Crash (2020): The S&P 500 dropped 34% in just 23 trading days as the pandemic shut down global economies. The speed of the decline was the fastest in history, with circuit breakers triggered multiple times.",
    preventionTips: [
      "Maintain an emergency fund separate from investments",
      "Hold defensive stocks (healthcare, utilities, consumer staples)",
      "Consider portfolio insurance strategies like options",
      "Stay informed about global events but avoid emotional trading",
    ],
  },
  {
    id: "geopolitics",
    title: "Geopolitical Events & Wars",
    subtitle: "Global tensions, market tremors",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    color: "text-purple-400",
    gradient: "from-purple-500 to-pink-400",
    glow: "shadow-purple-500/30",
    description:
      "Markets dislike uncertainty, and geopolitical tensions such as wars, sanctions, or political instability can make investors fearful of future economic disruption. Even if the conflict is localised, global supply chains and trade can be severely affected. Conflicts in the Middle East can disrupt oil production, leading to sharp spikes in oil prices that lower business forecasts and consumer confidence. Geopolitical events can also disrupt shipping routes or trigger investor flight to safe-haven assets like gold and U.S. Treasuries.",
    warningSigns: [
      "Escalating international tensions or sanctions",
      "Oil price spikes due to supply concerns",
      "Increased military activity in strategic regions",
      "Trade disputes or tariff escalations",
      "Capital flight from emerging markets to safe havens",
    ],
    example:
      "Russia-Ukraine Conflict (2022): The invasion triggered energy price spikes, with European natural gas prices rising over 400%. Global stock markets declined sharply, and inflation surged worldwide due to supply chain disruptions.",
    preventionTips: [
      "Diversify geographically across different markets",
      "Include commodities and real assets in your portfolio",
      "Monitor geopolitical risk indicators",
      "Consider defensive positions during periods of high tension",
    ],
  },
  {
    id: "policy",
    title: "Policy Changes & Interest Rates",
    subtitle: "When the rules change",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "text-emerald-400",
    gradient: "from-emerald-500 to-teal-400",
    glow: "shadow-emerald-500/30",
    description:
      "Governments and central banks play a key role in the interconnected global economy. When they change key policies — such as raising interest rates, tightening credit, or introducing new regulations — the market can react strongly, especially if the move catches investors by surprise. Higher interest rates make borrowing more expensive and can slow economic growth. If rates rise too quickly, they can tip an overheated economy into recession and trigger a crash.",
    warningSigns: [
      "Central bank signaling hawkish policy shifts",
      "Rapid interest rate increases in a short period",
      "New regulations targeting key market sectors",
      "Inflation running significantly above targets",
      "Bond yield curve inversions (recession indicator)",
    ],
    example:
      "2022-2023 Rate Hike Cycle: The Federal Reserve raised interest rates from near-zero to over 5% in the fastest tightening cycle in decades. The S&P 500 fell 25% from peak to trough, and the tech-heavy NASDAQ dropped over 33%.",
    preventionTips: [
      "Monitor central bank communications and meeting schedules",
      "Adjust portfolio duration based on interest rate outlook",
      "Hold a mix of growth and value stocks",
      "Consider Treasury bonds or CDs when rates are attractive",
    ],
  },
];

export default function LearnPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"warning-signs" | "tips">("warning-signs");

  return (
    <div className="space-y-6">
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          Market Crash Warning Signs
        </h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          Understanding why markets crash is the first step to protecting your investments
        </p>
      </div>

      <div className="glass-card rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-red-500 shadow-lg shadow-amber-500/20">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Why Understanding Crashes Matters</h2>
            <p className="text-xs text-[var(--muted)]">Knowledge is your best defense against market downturns</p>
          </div>
        </div>
        <p className="text-sm text-[var(--foreground)]/80 leading-relaxed">
          Stock market crashes rarely happen without warning signs, though these signs are not always easy to spot.
          While each crash is unique, there are common factors that tend to play a role. At the heart of almost every
          crash is <span className="text-[var(--danger)] font-semibold">fear overpowering rational decision-making</span>,
          creating a domino effect where falling prices fuel even more panic selling. Understanding these patterns helps you
          make better decisions and protect your portfolio.
        </p>
      </div>

      <div className="flex gap-2 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <button
          onClick={() => setActiveTab("warning-signs")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
            activeTab === "warning-signs"
              ? "bg-gradient-to-r from-amber-500 to-red-500 text-white shadow-lg shadow-amber-500/20"
              : "border border-[var(--border)] text-[var(--muted)] hover:text-white"
          }`}
        >
          Warning Signs
        </button>
        <button
          onClick={() => setActiveTab("tips")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
            activeTab === "tips"
              ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/20"
              : "border border-[var(--border)] text-[var(--muted)] hover:text-white"
          }`}
        >
          Protect Yourself
        </button>
      </div>

      {activeTab === "tips" ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 animate-fade-in-up">
          {[
            {
              title: "Diversify Your Portfolio",
              desc: "Spread investments across different asset classes, sectors, and geographies to reduce concentration risk.",
              icon: "🌍",
              gradient: "from-blue-500 to-cyan-400",
            },
            {
              title: "Maintain an Emergency Fund",
              desc: "Keep 3-6 months of expenses in liquid savings so you never have to sell investments at a loss during a crisis.",
              icon: "🛡️",
              gradient: "from-emerald-500 to-teal-400",
            },
            {
              title: "Use Stop-Loss Orders",
              desc: "Set automatic sell triggers at predetermined price levels to limit your downside during sudden market drops.",
              icon: "📉",
              gradient: "from-amber-500 to-yellow-400",
            },
            {
              title: "Invest Regularly (DCA)",
              desc: "Dollar-cost averaging smooths out volatility by investing fixed amounts at regular intervals regardless of price.",
              icon: "📊",
              gradient: "from-purple-500 to-pink-400",
            },
            {
              title: "Stay Informed, Stay Calm",
              desc: "Monitor economic indicators and central bank policies but avoid making emotional decisions based on daily headlines.",
              icon: "📰",
              gradient: "from-cyan-500 to-blue-400",
            },
            {
              title: "Avoid Excessive Leverage",
              desc: "Never invest with money you can't afford to lose. Margin trading amplifies losses just as much as gains.",
              icon: "⚠️",
              gradient: "from-red-500 to-orange-400",
            },
          ].map((tip, i) => (
            <div
              key={tip.title}
              className="glass-card rounded-xl p-5 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${tip.gradient} text-xl shadow-lg shrink-0`}>
                  {tip.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{tip.title}</h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">{tip.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {crashFactors.map((factor, index) => {
            const isExpanded = expandedId === factor.id;
            return (
              <div
                key={factor.id}
                className="glass-card rounded-xl overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : factor.id)}
                  className="w-full p-5 text-left transition-all hover:bg-[var(--card-hover)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${factor.gradient} text-white shadow-lg ${factor.glow} shrink-0`}>
                        {factor.icon}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">{factor.title}</h3>
                        <p className="text-sm text-[var(--muted)]">{factor.subtitle}</p>
                      </div>
                    </div>
                    <svg
                      className={`h-5 w-5 text-[var(--muted)] transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 space-y-4 animate-fade-in-up">
                    <p className="text-sm text-[var(--foreground)]/80 leading-relaxed border-t border-[var(--border)] pt-4">
                      {factor.description}
                    </p>

                    <div className="rounded-lg bg-[var(--background)]/50 p-4 border border-[var(--border)]/50">
                      <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                        <svg className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Warning Signs to Watch For
                      </h4>
                      <ul className="space-y-2">
                        {factor.warningSigns.map((sign, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[var(--foreground)]/70">
                            <span className="text-amber-400 mt-0.5 shrink-0">•</span>
                            {sign}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-4">
                      <h4 className="text-sm font-bold text-amber-400 mb-1">Real-World Example</h4>
                      <p className="text-xs text-[var(--foreground)]/70 leading-relaxed">
                        {factor.example}
                      </p>
                    </div>

                    <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-4">
                      <h4 className="text-sm font-bold text-emerald-400 mb-2">How to Protect Yourself</h4>
                      <ul className="space-y-2">
                        {factor.preventionTips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-[var(--foreground)]/70">
                            <span className="text-emerald-400 mt-0.5 shrink-0">✓</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="glass-card rounded-xl p-6 animate-fade-in-up" style={{ animationDelay: "700ms" }}>
        <h2 className="text-lg font-semibold text-white mb-3">Key Takeaway</h2>
        <p className="text-sm text-[var(--foreground)]/80 leading-relaxed">
          While it&apos;s impossible to predict exactly when a crash will happen, being aware of these five warning signs
          can help you make more informed decisions. The best strategy combines{" "}
          <span className="text-[var(--primary)] font-semibold">diversification</span>,{" "}
          <span className="text-[var(--success)] font-semibold">discipline</span>, and{" "}
          <span className="text-[var(--accent-purple)] font-semibold">a long-term perspective</span>.
          Remember: time in the market generally beats timing the market.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="/trade"
            className="rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--accent-purple)] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[var(--primary-glow)] hover:shadow-xl transition-all btn-glow"
          >
            Start Trading Safely
          </a>
          <a
            href="/ai-recommendations"
            className="rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-semibold text-[var(--muted)] hover:text-white hover:border-[var(--primary)] transition-all"
          >
            View AI Recommendations
          </a>
        </div>
      </div>
    </div>
  );
}
