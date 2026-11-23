'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function CalculatorEngine({ slug }: { slug: string }) {
  const [currency, setCurrency] = useState<'₹' | '$'>('₹');

  // 1. SIP Calculator State (Groww-Style SIP & Lumpsum)
  const [sipMode, setSipMode] = useState<'sip' | 'lumpsum'>('sip');
  const [sipMonthly, setSipMonthly] = useState(10000);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(10);
  const [lumpAmount, setLumpAmount] = useState(100000);

  // 2. Compound Interest State
  const [ciPrincipal, setCiPrincipal] = useState(100000);
  const [ciRate, setCiRate] = useState(10);
  const [ciYears, setCiYears] = useState(10);
  const [ciFreq, setCiFreq] = useState(1);

  // 3. Stock Average State
  const [qty1, setQty1] = useState(50);
  const [price1, setPrice1] = useState(200);
  const [qty2, setQty2] = useState(50);
  const [price2, setPrice2] = useState(150);

  // 4. EMI Calculator State
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [loanRate, setLoanRate] = useState(8.5);
  const [loanYears, setLoanYears] = useState(20);

  // 5. Dividend Calculator State
  const [portfolioVal, setPortfolioVal] = useState(500000);
  const [divYield, setDivYield] = useState(4.2);

  // 6. Retirement Calculator State
  const [currentAge, setCurrentAge] = useState(28);
  const [retireAge, setRetireAge] = useState(55);
  const [existingCorpus, setExistingCorpus] = useState(200000);
  const [monthlySave, setMonthlySave] = useState(15000);
  const [retireReturn, setRetireReturn] = useState(11);

  const fmt = (num: number) =>
    `${currency}${Math.round(num).toLocaleString(currency === '₹' ? 'en-IN' : 'en-US')}`;

  return (
    <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Currency Switcher (Global + India) */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Interactive Calculator
        </span>
        <div className="inline-flex rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setCurrency('₹')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              currency === '₹' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
            }`}
          >
            INR (₹)
          </button>
          <button
            type="button"
            onClick={() => setCurrency('$')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              currency === '$' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
            }`}
          >
            USD ($)
          </button>
        </div>
      </div>

      {/* 1. GROWW-STYLE SIP & LUMPSUM CALCULATOR */}
      {slug === 'sip-calculator' && (() => {
        const isSip = sipMode === 'sip';
        const months = sipYears * 12;
        const monthlyRate = sipRate / 12 / 100;

        let invested = 0;
        let futureVal = 0;

        if (isSip) {
          invested = sipMonthly * months;
          futureVal =
            monthlyRate > 0
              ? sipMonthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
              : invested;
        } else {
          invested = lumpAmount;
          futureVal = lumpAmount * Math.pow(1 + sipRate / 100, sipYears);
        }

        const gains = Math.max(0, futureVal - invested);
        const investedPct = futureVal > 0 ? Math.min(100, Math.max(0, (invested / futureVal) * 100)) : 50;
        const returnsPct = futureVal > 0 ? Math.min(100, Math.max(0, (gains / futureVal) * 100)) : 50;
        const circumference = 389.56; // 2 * PI * 62
        const returnsStroke = (returnsPct / 100) * circumference;

        return (
          <div className="space-y-6">
            {/* Mode Switcher: SIP vs Lumpsum */}
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <button
                type="button"
                onClick={() => setSipMode('sip')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition shadow-2xs ${
                  isSip
                    ? 'bg-[#0B1C2D] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Systematic Investment Plan (SIP)
              </button>
              <button
                type="button"
                onClick={() => setSipMode('lumpsum')}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition shadow-2xs ${
                  !isSip
                    ? 'bg-[#0B1C2D] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Lumpsum (One-Time)
              </button>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Left Controls: Sliders + Numeric Input Boxes */}
              <div className="lg:col-span-7 space-y-6">
                {/* Input 1: Investment Amount */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-slate-700">
                      {isSip ? 'Monthly Investment' : 'Total Investment (Lumpsum)'}
                    </label>
                    <div className="flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-extrabold text-blue-600 shadow-2xs">
                      <span>{currency}</span>
                      <input
                        type="number"
                        min={500}
                        max={isSip ? 500000 : 10000000}
                        step={500}
                        value={isSip ? sipMonthly : lumpAmount}
                        onChange={(e) => {
                          const val = Math.max(0, Number(e.target.value));
                          if (isSip) setSipMonthly(val);
                          else setLumpAmount(val);
                        }}
                        className="w-24 sm:w-28 text-right focus:outline-none font-bold text-slate-900"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={isSip ? 200000 : 2000000}
                    step={500}
                    value={isSip ? sipMonthly : lumpAmount}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (isSip) setSipMonthly(val);
                      else setLumpAmount(val);
                    }}
                    className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                    <span>{fmt(500)}</span>
                    <span>{isSip ? fmt(200000) : fmt(2000000)}</span>
                  </div>
                </div>

                {/* Input 2: Expected Return Rate (p.a) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-slate-700">
                      Expected Return Rate (p.a)
                    </label>
                    <div className="flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-extrabold text-blue-600 shadow-2xs">
                      <input
                        type="number"
                        min={1}
                        max={35}
                        step={0.5}
                        value={sipRate}
                        onChange={(e) => setSipRate(Math.max(1, Number(e.target.value)))}
                        className="w-14 sm:w-16 text-right focus:outline-none font-bold text-slate-900"
                      />
                      <span>%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={30}
                    step={0.5}
                    value={sipRate}
                    onChange={(e) => setSipRate(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                    <span>1%</span>
                    <span>30%</span>
                  </div>
                </div>

                {/* Input 3: Time Period */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-slate-700">
                      Time Period (Years)
                    </label>
                    <div className="flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-extrabold text-blue-600 shadow-2xs">
                      <input
                        type="number"
                        min={1}
                        max={40}
                        step={1}
                        value={sipYears}
                        onChange={(e) => setSipYears(Math.max(1, Number(e.target.value)))}
                        className="w-12 sm:w-14 text-right focus:outline-none font-bold text-slate-900"
                      />
                      <span>Yr</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={40}
                    step={1}
                    value={sipYears}
                    onChange={(e) => setSipYears(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                    <span>1 Yr</span>
                    <span>40 Yrs</span>
                  </div>
                </div>
              </div>

              {/* Right Output: Results + SVG Donut Chart */}
              <div className="lg:col-span-5 bg-slate-50 border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-6">
                {/* SVG Visual Donut Chart */}
                <div className="flex items-center justify-center gap-6">
                  <div className="relative w-36 h-36 shrink-0">
                    <svg viewBox="0 0 150 150" className="w-full h-full -rotate-90">
                      {/* Background / Invested Circle */}
                      <circle
                        cx="75"
                        cy="75"
                        r="62"
                        fill="transparent"
                        stroke="#0B1C2D"
                        strokeWidth="18"
                      />
                      {/* Estimated Returns Arc */}
                      <circle
                        cx="75"
                        cy="75"
                        r="62"
                        fill="transparent"
                        stroke="#10B981"
                        strokeWidth="18"
                        strokeDasharray={`${returnsStroke} ${circumference}`}
                        strokeLinecap="round"
                        className="transition-all duration-500 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Returns
                      </span>
                      <span className="text-sm font-extrabold text-emerald-600">
                        {Math.round(returnsPct)}%
                      </span>
                    </div>
                  </div>

                  {/* Chart Legend */}
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full bg-[#0B1C2D] shrink-0" />
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase">Invested</p>
                        <p className="font-extrabold text-slate-800">{Math.round(investedPct)}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shrink-0" />
                      <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase">Est. Returns</p>
                        <p className="font-extrabold text-emerald-600">{Math.round(returnsPct)}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Numerical Breakdown Cards */}
                <div className="space-y-3 border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Invested Amount</span>
                    <span className="text-sm font-bold text-slate-900">{fmt(invested)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Est. Returns</span>
                    <span className="text-sm font-bold text-emerald-600">+{fmt(gains)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                      Total Value
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-slate-950">
                      {fmt(futureVal)}
                    </span>
                  </div>
                </div>

                {/* Groww-Style Action CTA */}
                <a
                  href="https://thestocktimes.online"
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm transition shadow-sm"
                >
                  <span>INVEST NOW (Zero Commission Direct MFs)</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 2. COMPOUND INTEREST CALCULATOR */}
      {slug === 'compound-interest-calculator' && (() => {
        const totalAmount = ciPrincipal * Math.pow(1 + ciRate / 100 / ciFreq, ciFreq * ciYears);
        const interestEarned = totalAmount - ciPrincipal;

        return (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Initial Lump-Sum Investment ({currency})
                </label>
                <input
                  type="number"
                  value={ciPrincipal}
                  onChange={(e) => setCiPrincipal(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Annual Rate (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={ciRate}
                    onChange={(e) => setCiRate(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Duration (Years)</label>
                  <input
                    type="number"
                    value={ciYears}
                    onChange={(e) => setCiYears(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Compounding Frequency</label>
                <select
                  value={ciFreq}
                  onChange={(e) => setCiFreq(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900"
                >
                  <option value={1}>Annually (1x/year)</option>
                  <option value={4}>Quarterly (4x/year)</option>
                  <option value={12}>Monthly (12x/year)</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Maturity Value</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">{fmt(totalAmount)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200/80">
                <div>
                  <p className="text-xs text-slate-500">Principal</p>
                  <p className="text-base font-bold text-slate-800">{fmt(ciPrincipal)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Compound Interest</p>
                  <p className="text-base font-bold text-emerald-600">+{fmt(interestEarned)}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 3. STOCK AVERAGE CALCULATOR */}
      {slug === 'stock-average-calculator' && (() => {
        const totalQty = qty1 + qty2;
        const totalInvested = qty1 * price1 + qty2 * price2;
        const avgPrice = totalQty > 0 ? totalInvested / totalQty : 0;

        return (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">1st Buy Quantity</label>
                  <input
                    type="number"
                    value={qty1}
                    onChange={(e) => setQty1(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">1st Buy Price ({currency})</label>
                  <input
                    type="number"
                    value={price1}
                    onChange={(e) => setPrice1(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">2nd Buy Quantity</label>
                  <input
                    type="number"
                    value={qty2}
                    onChange={(e) => setQty2(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">2nd Buy Price ({currency})</label>
                  <input
                    type="number"
                    value={price2}
                    onChange={(e) => setPrice2(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">New Average Share Price</p>
                <p className="text-3xl font-extrabold text-blue-600 mt-1">
                  {currency}{avgPrice.toFixed(2)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200/80">
                <div>
                  <p className="text-xs text-slate-500">Total Shares</p>
                  <p className="text-base font-bold text-slate-800">{totalQty} Shares</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Total Capital</p>
                  <p className="text-base font-bold text-slate-900">{fmt(totalInvested)}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 4. EMI CALCULATOR */}
      {slug === 'emi-calculator' && (() => {
        const r = loanRate / 12 / 100;
        const n = loanYears * 12;
        const emi = r > 0 ? (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : loanAmount / n;
        const totalPayable = emi * n;
        const totalInterest = totalPayable - loanAmount;

        return (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-semibold mb-1">
                  <span>Loan Amount</span>
                  <span className="text-blue-600 font-bold">{fmt(loanAmount)}</span>
                </div>
                <input
                  type="range"
                  min={50000}
                  max={20000000}
                  step={50000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm font-semibold mb-1">
                  <span>Interest Rate (p.a.)</span>
                  <span className="text-blue-600 font-bold">{loanRate}%</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={0.1}
                  value={loanRate}
                  onChange={(e) => setLoanRate(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm font-semibold mb-1">
                  <span>Loan Tenure (Years)</span>
                  <span className="text-blue-600 font-bold">{loanYears} Yrs</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={loanYears}
                  onChange={(e) => setLoanYears(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Monthly EMI</p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">{fmt(emi)} / mo</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200/80">
                <div>
                  <p className="text-xs text-slate-500">Total Interest</p>
                  <p className="text-base font-bold text-amber-600">{fmt(totalInterest)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Total Payment</p>
                  <p className="text-base font-bold text-slate-900">{fmt(totalPayable)}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 5. DIVIDEND YIELD CALCULATOR */}
      {slug === 'dividend-calculator' && (() => {
        const annualDiv = portfolioVal * (divYield / 100);
        const monthlyDiv = annualDiv / 12;

        return (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm font-semibold mb-1">
                  <span>Total Portfolio Value</span>
                  <span className="text-blue-600 font-bold">{fmt(portfolioVal)}</span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={10000000}
                  step={10000}
                  value={portfolioVal}
                  onChange={(e) => setPortfolioVal(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
              <div>
                <div className="flex justify-between text-sm font-semibold mb-1">
                  <span>Annual Dividend Yield (%)</span>
                  <span className="text-blue-600 font-bold">{divYield}%</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={15}
                  step={0.1}
                  value={divYield}
                  onChange={(e) => setDivYield(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Annual Dividend Income</p>
                <p className="text-3xl font-extrabold text-emerald-600 mt-1">{fmt(annualDiv)} / yr</p>
              </div>
              <div className="pt-3 border-t border-slate-200/80">
                <p className="text-xs text-slate-500">Average Monthly Passive Cashflow</p>
                <p className="text-lg font-bold text-slate-900">{fmt(monthlyDiv)} / month</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 6. RETIREMENT CORPUS CALCULATOR */}
      {slug === 'retirement-calculator' && (() => {
        const years = Math.max(1, retireAge - currentAge);
        const months = years * 12;
        const r = retireReturn / 12 / 100;
        const fvExisting = existingCorpus * Math.pow(1 + retireReturn / 100, years);
        const fvMonthly = r > 0 ? monthlySave * ((Math.pow(1 + r, months) - 1) / r) * (1 + r) : monthlySave * months;
        const totalCorpus = fvExisting + fvMonthly;
        const safeMonthlyIncome = (totalCorpus * 0.04) / 12;

        return (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Age</label>
                  <input
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Retirement Age</label>
                  <input
                    type="number"
                    value={retireAge}
                    onChange={(e) => setRetireAge(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Current Savings ({currency})</label>
                <input
                  type="number"
                  value={existingCorpus}
                  onChange={(e) => setExistingCorpus(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Monthly SIP ({currency})</label>
                  <input
                    type="number"
                    value={monthlySave}
                    onChange={(e) => setMonthlySave(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Est. Return (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={retireReturn}
                    onChange={(e) => setRetireReturn(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">
                  Projected Corpus at Age {retireAge}
                </p>
                <p className="text-3xl font-extrabold text-slate-900 mt-1">{fmt(totalCorpus)}</p>
              </div>
              <div className="pt-3 border-t border-slate-200/80">
                <p className="text-xs text-slate-500">Est. Monthly Withdrawal (4% Safe Rule)</p>
                <p className="text-base font-bold text-emerald-600">{fmt(safeMonthlyIncome)} / month</p>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
