'use client';

import { useState } from 'react';
import {
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Zap,
  ShieldCheck,
  Scale,
} from 'lucide-react';

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

  // 7. Mutual Fund vs Stock Comparison State
  const [mfVsStockMonthly, setMfVsStockMonthly] = useState(10000);
  const [mfVsStockYears, setMfVsStockYears] = useState(15);
  const [mfExpectedReturn, setMfExpectedReturn] = useState(13);
  const [mfExpenseRatio, setMfExpenseRatio] = useState(0.8);
  const [stockExpectedReturn, setStockExpectedReturn] = useState(16);
  const [stockCharges, setStockCharges] = useState(0.2);

  // 8. Compare Mutual Funds State
  const [compMfMonthly, setCompMfMonthly] = useState(10000);
  const [compMfYears, setCompMfYears] = useState(15);
  const [fundAName, setFundAName] = useState('Fund A (Regular Plan)');
  const [fundAReturn, setFundAReturn] = useState(13);
  const [fundAExpense, setFundAExpense] = useState(1.8);
  const [fundBName, setFundBName] = useState('Fund B (Direct Plan)');
  const [fundBReturn, setFundBReturn] = useState(13);
  const [fundBExpense, setFundBExpense] = useState(0.6);

  // 9. Compare Stocks State
  const [stock1Name, setStock1Name] = useState('Tata Motors');
  const [stock1Price, setStock1Price] = useState(780);
  const [stock1Eps, setStock1Eps] = useState(65);
  const [stock1Roe, setStock1Roe] = useState(22.5);
  const [stock1Bv, setStock1Bv] = useState(380);

  const [stock2Name, setStock2Name] = useState('Maruti Suzuki');
  const [stock2Price, setStock2Price] = useState(11200);
  const [stock2Eps, setStock2Eps] = useState(415);
  const [stock2Roe, setStock2Roe] = useState(15.2);
  const [stock2Bv, setStock2Bv] = useState(2850);

  // 10. Step-Up SIP State
  const [stepUpMonthly, setStepUpMonthly] = useState(10000);
  const [stepUpRate, setStepUpRate] = useState(10);
  const [stepUpReturn, setStepUpReturn] = useState(13);
  const [stepUpYears, setStepUpYears] = useState(15);

  // 11. SWP State
  const [swpCorpus, setSwpCorpus] = useState(5000000);
  const [swpMonthly, setSwpMonthly] = useState(35000);
  const [swpReturn, setSwpReturn] = useState(8.5);
  const [swpYears, setSwpYears] = useState(20);

  // 12. Lumpsum State
  const [lumpInv, setLumpInv] = useState(200000);
  const [lumpReturn, setLumpReturn] = useState(12);
  const [lumpYears, setLumpYears] = useState(10);
  const [lumpInflation, setLumpInflation] = useState(6);
  const [adjustInflation, setAdjustInflation] = useState(true);

  // 13. FD vs Mutual Fund State
  const [fdDeposit, setFdDeposit] = useState(500000);
  const [fdYears, setFdYears] = useState(5);
  const [fdRate, setFdRate] = useState(7.1);
  const [taxSlab, setTaxSlab] = useState<number>(20);
  const [mfRateFd, setMfRateFd] = useState(12);

  // 14. IPO Allotment State
  const [ipoSubscription, setIpoSubscription] = useState(45);
  const [ipoFamilyDemat, setIpoFamilyDemat] = useState(3);

  // 15. Brokerage State
  const [tradeSegment, setTradeSegment] = useState<'delivery' | 'intraday' | 'fno'>('delivery');
  const [tradeBuyPrice, setTradeBuyPrice] = useState(1000);
  const [tradeSellPrice, setTradeSellPrice] = useState(1040);
  const [tradeQty, setTradeQty] = useState(100);
  const [tradeBrokerageFlat, setTradeBrokerageFlat] = useState(0);

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

      {/* 7. MUTUAL FUND VS STOCK COMPARISON CALCULATOR */}
      {slug === 'mutual-fund-vs-stock-comparison' && (() => {
        const months = mfVsStockYears * 12;
        const netMfRate = Math.max(1, mfExpectedReturn - mfExpenseRatio) / 100 / 12;
        const mfFv = mfVsStockMonthly * ((Math.pow(1 + netMfRate, months) - 1) / netMfRate) * (1 + netMfRate);
        const mfInvested = mfVsStockMonthly * months;
        const mfGains = Math.max(0, mfFv - mfInvested);
        const mfTax = Math.max(0, mfGains - 125000) * 0.125;
        const mfNet = mfFv - mfTax;

        const netStockRate = Math.max(1, stockExpectedReturn - stockCharges) / 100 / 12;
        const stockFv = mfVsStockMonthly * ((Math.pow(1 + netStockRate, months) - 1) / netStockRate) * (1 + netStockRate);
        const stockInvested = mfVsStockMonthly * months;
        const stockGains = Math.max(0, stockFv - stockInvested);
        const stockTax = Math.max(0, stockGains - 125000) * 0.125;
        const stockNet = stockFv - stockTax;

        const diff = Math.abs(stockNet - mfNet);
        const stockWins = stockNet >= mfNet;

        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Investment ({currency})</label>
                <input
                  type="number"
                  value={mfVsStockMonthly}
                  onChange={(e) => setMfVsStockMonthly(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Horizon ({mfVsStockYears} Years)</label>
                <input
                  type="range"
                  min="3"
                  max="30"
                  value={mfVsStockYears}
                  onChange={(e) => setMfVsStockYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg accent-blue-600 cursor-pointer mt-3"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">MF Return (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={mfExpectedReturn}
                    onChange={(e) => setMfExpectedReturn(Number(e.target.value))}
                    className="w-full px-2 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Stock CAGR (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={stockExpectedReturn}
                    onChange={(e) => setStockExpectedReturn(Number(e.target.value))}
                    className="w-full px-2 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Verdict Highlight */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
                <div>
                  <p className="text-xs font-extrabold text-blue-900 uppercase">Comparison Verdict (Post-Tax)</p>
                  <p className="text-xs text-blue-800">
                    {stockWins
                      ? `Direct Stock Portfolio generates ${fmt(diff)} extra post-tax wealth over ${mfVsStockYears} years!`
                      : `Mutual Fund portfolio delivers ${fmt(diff)} extra post-tax wealth with professional diversification!`}
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold">
                12.5% LTCG Deducted
              </span>
            </div>

            {/* Side-by-Side Comparison Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600">Mutual Fund SIP</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">Expense: {mfExpenseRatio}%</span>
                </div>
                <p className="text-2xl font-black text-slate-900">{fmt(mfNet)}</p>
                <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-200">
                  <div className="flex justify-between"><span>Capital Invested:</span><span className="font-bold">{fmt(mfInvested)}</span></div>
                  <div className="flex justify-between"><span>Pre-Tax Wealth:</span><span className="font-bold">{fmt(mfFv)}</span></div>
                  <div className="flex justify-between text-rose-600"><span>LTCG Tax (12.5%):</span><span>–{fmt(mfTax)}</span></div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">Direct Stocks</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">Zero Fund Fee</span>
                </div>
                <p className="text-2xl font-black text-emerald-900">{fmt(stockNet)}</p>
                <div className="space-y-1 text-xs text-emerald-800 pt-2 border-t border-emerald-200">
                  <div className="flex justify-between"><span>Capital Invested:</span><span className="font-bold">{fmt(stockInvested)}</span></div>
                  <div className="flex justify-between"><span>Pre-Tax Wealth:</span><span className="font-bold">{fmt(stockFv)}</span></div>
                  <div className="flex justify-between text-rose-600"><span>LTCG Tax (12.5%):</span><span>–{fmt(stockTax)}</span></div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 8. COMPARE TWO MUTUAL FUNDS (DIRECT VS REGULAR) */}
      {slug === 'compare-mutual-funds' && (() => {
        const months = compMfYears * 12;
        const netA = Math.max(1, fundAReturn - fundAExpense) / 100 / 12;
        const netB = Math.max(1, fundBReturn - fundBExpense) / 100 / 12;
        const fvA = compMfMonthly * ((Math.pow(1 + netA, months) - 1) / netA) * (1 + netA);
        const fvB = compMfMonthly * ((Math.pow(1 + netB, months) - 1) / netB) * (1 + netB);
        const savedFees = Math.abs(fvB - fvA);

        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Monthly SIP ({currency})</label>
                <input
                  type="number"
                  value={compMfMonthly}
                  onChange={(e) => setCompMfMonthly(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tenure ({compMfYears} Years)</label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={compMfYears}
                  onChange={(e) => setCompMfYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg accent-blue-600 cursor-pointer mt-3"
                />
              </div>
            </div>

            {/* Savings Callout Banner */}
            <div className="p-4 rounded-xl bg-emerald-500 text-white flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-emerald-100 shrink-0" />
                <div>
                  <p className="text-xs font-extrabold uppercase">Direct Plan Fee Advantage</p>
                  <p className="text-sm font-bold">
                    You save {fmt(savedFees)} in distributor commissions over {compMfYears} years!
                  </p>
                </div>
              </div>
            </div>

            {/* Dual Fund Input Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <input
                  type="text"
                  value={fundAName}
                  onChange={(e) => setFundAName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-800"
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Return Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={fundAReturn}
                      onChange={(e) => setFundAReturn(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Expense Ratio (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={fundAExpense}
                      onChange={(e) => setFundAExpense(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold"
                    />
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-200">
                  <p className="text-xs text-slate-500">Maturity Corpus</p>
                  <p className="text-2xl font-black text-slate-900">{fmt(fvA)}</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-300 space-y-4">
                <input
                  type="text"
                  value={fundBName}
                  onChange={(e) => setFundBName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-emerald-300 text-xs font-bold text-emerald-950"
                />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-emerald-800 mb-1">Return Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={fundBReturn}
                      onChange={(e) => setFundBReturn(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-xl border border-emerald-300 text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-emerald-800 mb-1">Expense Ratio (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={fundBExpense}
                      onChange={(e) => setFundBExpense(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-xl border border-emerald-300 text-xs font-bold"
                    />
                  </div>
                </div>
                <div className="pt-3 border-t border-emerald-200">
                  <p className="text-xs text-emerald-800">Maturity Corpus (Winner)</p>
                  <p className="text-2xl font-black text-emerald-900">{fmt(fvB)}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 9. STOCK VALUATION & PEER COMPARISON TOOL */}
      {slug === 'compare-stocks' && (() => {
        const graham1 = Math.sqrt(Math.max(0, 22.5 * stock1Eps * stock1Bv));
        const graham2 = Math.sqrt(Math.max(0, 22.5 * stock2Eps * stock2Bv));
        const pe1 = stock1Eps > 0 ? (stock1Price / stock1Eps).toFixed(1) : 'N/A';
        const pe2 = stock2Eps > 0 ? (stock2Price / stock2Eps).toFixed(1) : 'N/A';
        const pb1 = stock1Bv > 0 ? (stock1Price / stock1Bv).toFixed(1) : 'N/A';
        const pb2 = stock2Bv > 0 ? (stock2Price / stock2Bv).toFixed(1) : 'N/A';

        const isUndervalued1 = stock1Price < graham1;
        const isUndervalued2 = stock2Price < graham2;

        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Stock 1 Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                <input
                  type="text"
                  value={stock1Name}
                  onChange={(e) => setStock1Name(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-800"
                />
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">Price ({currency})</label>
                    <input
                      type="number"
                      value={stock1Price}
                      onChange={(e) => setStock1Price(Number(e.target.value))}
                      className="w-full p-1.5 border rounded-lg font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">EPS ({currency})</label>
                    <input
                      type="number"
                      value={stock1Eps}
                      onChange={(e) => setStock1Eps(Number(e.target.value))}
                      className="w-full p-1.5 border rounded-lg font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">ROE (%)</label>
                    <input
                      type="number"
                      value={stock1Roe}
                      onChange={(e) => setStock1Roe(Number(e.target.value))}
                      className="w-full p-1.5 border rounded-lg font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">Book Value ({currency})</label>
                    <input
                      type="number"
                      value={stock1Bv}
                      onChange={(e) => setStock1Bv(Number(e.target.value))}
                      className="w-full p-1.5 border rounded-lg font-bold"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-slate-500">Graham Intrinsic Value</p>
                    <p className="text-lg font-extrabold text-slate-900">{fmt(graham1)}</p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded text-xs font-bold ${
                      isUndervalued1 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {isUndervalued1 ? 'Undervalued' : 'Overvalued'}
                  </span>
                </div>
              </div>

              {/* Stock 2 Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                <input
                  type="text"
                  value={stock2Name}
                  onChange={(e) => setStock2Name(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-800"
                />
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">Price ({currency})</label>
                    <input
                      type="number"
                      value={stock2Price}
                      onChange={(e) => setStock2Price(Number(e.target.value))}
                      className="w-full p-1.5 border rounded-lg font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">EPS ({currency})</label>
                    <input
                      type="number"
                      value={stock2Eps}
                      onChange={(e) => setStock2Eps(Number(e.target.value))}
                      className="w-full p-1.5 border rounded-lg font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">ROE (%)</label>
                    <input
                      type="number"
                      value={stock2Roe}
                      onChange={(e) => setStock2Roe(Number(e.target.value))}
                      className="w-full p-1.5 border rounded-lg font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold">Book Value ({currency})</label>
                    <input
                      type="number"
                      value={stock2Bv}
                      onChange={(e) => setStock2Bv(Number(e.target.value))}
                      className="w-full p-1.5 border rounded-lg font-bold"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-slate-500">Graham Intrinsic Value</p>
                    <p className="text-lg font-extrabold text-slate-900">{fmt(graham2)}</p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded text-xs font-bold ${
                      isUndervalued2 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {isUndervalued2 ? 'Undervalued' : 'Overvalued'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Comparison Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold">
                  <tr>
                    <th className="p-3">Financial Metric</th>
                    <th className="p-3">{stock1Name}</th>
                    <th className="p-3">{stock2Name}</th>
                    <th className="p-3">Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-semibold">P/E Ratio</td>
                    <td className="p-3">{pe1}x</td>
                    <td className="p-3">{pe2}x</td>
                    <td className="p-3 text-emerald-600 font-bold">Lower P/E is better value</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">P/B Ratio</td>
                    <td className="p-3">{pb1}x</td>
                    <td className="p-3">{pb2}x</td>
                    <td className="p-3 text-emerald-600 font-bold">Lower P/B indicates margin</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold">ROE %</td>
                    <td className="p-3">{stock1Roe}%</td>
                    <td className="p-3">{stock2Roe}%</td>
                    <td className="p-3 text-blue-600 font-bold">{stock1Roe > stock2Roe ? stock1Name : stock2Name} higher efficiency</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      })()}

      {/* 10. STEP-UP SIP CALCULATOR */}
      {slug === 'step-up-sip-calculator' && (() => {
        const rMonthly = stepUpReturn / 12 / 100;
        let stepUpTotalInvested = 0;
        let stepUpFv = 0;

        for (let y = 1; y <= stepUpYears; y++) {
          const installment = stepUpMonthly * Math.pow(1 + stepUpRate / 100, y - 1);
          stepUpTotalInvested += installment * 12;
          for (let m = 1; m <= 12; m++) {
            const monthsLeft = (stepUpYears - y) * 12 + (12 - m + 1);
            stepUpFv += installment * Math.pow(1 + rMonthly, monthsLeft);
          }
        }

        const flatMonths = stepUpYears * 12;
        const flatInvested = stepUpMonthly * flatMonths;
        const flatFv =
          rMonthly > 0
            ? stepUpMonthly * ((Math.pow(1 + rMonthly, flatMonths) - 1) / rMonthly) * (1 + rMonthly)
            : flatInvested;

        const extraWealth = Math.max(0, stepUpFv - flatFv);

        return (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Starting Monthly SIP ({currency})</label>
                <input
                  type="number"
                  value={stepUpMonthly}
                  onChange={(e) => setStepUpMonthly(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Annual Step-Up (%)</label>
                  <input
                    type="number"
                    value={stepUpRate}
                    onChange={(e) => setStepUpRate(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Expected Return (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={stepUpReturn}
                    onChange={(e) => setStepUpReturn(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tenure ({stepUpYears} Years)</label>
                <input
                  type="range"
                  min="3"
                  max="30"
                  value={stepUpYears}
                  onChange={(e) => setStepUpYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Step-Up Maturity Value
                </span>
                <p className="text-3xl font-black text-slate-900 mt-2">{fmt(stepUpFv)}</p>
                <p className="text-xs text-slate-500 mt-1">Invested: {fmt(stepUpTotalInvested)}</p>
              </div>
              <div className="pt-3 border-t border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Regular Flat SIP:</span>
                  <span className="font-bold">{fmt(flatFv)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold bg-emerald-50 p-2 rounded-lg">
                  <span>Bonus Wealth via Step-Up:</span>
                  <span>+{fmt(extraWealth)}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 11. SWP (SYSTEMATIC WITHDRAWAL PLAN) */}
      {slug === 'swp-calculator' && (() => {
        const totalMonths = swpYears * 12;
        const rMonth = swpReturn / 12 / 100;
        let balance = swpCorpus;
        let totalWithdrawn = 0;
        let depleted = false;

        for (let m = 1; m <= totalMonths; m++) {
          if (balance < swpMonthly) {
            totalWithdrawn += balance;
            balance = 0;
            depleted = true;
            break;
          }
          balance -= swpMonthly;
          balance += balance * rMonth;
          totalWithdrawn += swpMonthly;
        }

        return (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Total Initial Corpus ({currency})</label>
                <input
                  type="number"
                  value={swpCorpus}
                  onChange={(e) => setSwpCorpus(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Withdrawal ({currency})</label>
                  <input
                    type="number"
                    value={swpMonthly}
                    onChange={(e) => setSwpMonthly(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Portfolio Return (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={swpReturn}
                    onChange={(e) => setSwpReturn(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Withdrawal Horizon ({swpYears} Years)</label>
                <input
                  type="range"
                  min="1"
                  max="35"
                  value={swpYears}
                  onChange={(e) => setSwpYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg accent-blue-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  Total Withdrawn Pension
                </span>
                <p className="text-3xl font-black text-slate-900 mt-2">{fmt(totalWithdrawn)}</p>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-xs">
                <div>
                  <p className="text-slate-500">Remaining Corpus</p>
                  <p className="text-xl font-bold text-emerald-600">{fmt(balance)}</p>
                </div>
                <span className={`px-2 py-1 rounded font-bold text-[11px] ${depleted ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                  {depleted ? 'Corpus Depleted' : 'Healthy Corpus'}
                </span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 12. LUMPSUM INVESTMENT CALCULATOR */}
      {slug === 'lumpsum-calculator' && (() => {
        const lumpFv = lumpInv * Math.pow(1 + lumpReturn / 100, lumpYears);
        const realPurchasingPower = adjustInflation
          ? lumpFv / Math.pow(1 + lumpInflation / 100, lumpYears)
          : lumpFv;
        const wealthGain = Math.max(0, lumpFv - lumpInv);

        return (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">One-Time Lumpsum ({currency})</label>
                <input
                  type="number"
                  value={lumpInv}
                  onChange={(e) => setLumpInv(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Expected Return (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={lumpReturn}
                    onChange={(e) => setLumpReturn(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tenure ({lumpYears} Years)</label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={lumpYears}
                    onChange={(e) => setLumpYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg accent-blue-600 cursor-pointer mt-3"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="inflToggle"
                  checked={adjustInflation}
                  onChange={(e) => setAdjustInflation(e.target.checked)}
                  className="rounded text-blue-600"
                />
                <label htmlFor="inflToggle" className="text-xs text-slate-700 font-semibold cursor-pointer">
                  Adjust for Inflation (6% CPI)
                </label>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Maturity Future Value</p>
                <p className="text-3xl font-black text-slate-900 mt-1">{fmt(lumpFv)}</p>
                <p className="text-xs text-emerald-600 font-bold mt-1">Total Wealth Gain: +{fmt(wealthGain)}</p>
              </div>
              {adjustInflation && (
                <div className="pt-3 border-t border-slate-200 text-xs">
                  <p className="text-slate-500">Inflation-Adjusted Real Value</p>
                  <p className="text-lg font-bold text-slate-800">{fmt(realPurchasingPower)}</p>
                  <p className="text-[11px] text-slate-500">Purchasing power in today's currency equivalent.</p>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* 13. BANK FD VS MUTUAL FUND CALCULATOR */}
      {slug === 'fd-vs-mutual-fund-calculator' && (() => {
        const fdMaturity = fdDeposit * Math.pow(1 + fdRate / 100, fdYears);
        const fdInterest = fdMaturity - fdDeposit;
        const fdTax = fdInterest * (taxSlab / 100);
        const fdNet = fdDeposit + (fdInterest - fdTax);

        const mfMaturity = fdDeposit * Math.pow(1 + mfRateFd / 100, fdYears);
        const mfGains = mfMaturity - fdDeposit;
        const mfTax = Math.max(0, mfGains - 125000) * 0.125;
        const mfNet = fdDeposit + (mfGains - mfTax);
        const diff = Math.max(0, mfNet - fdNet);

        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Deposit Amount ({currency})</label>
                <input
                  type="number"
                  value={fdDeposit}
                  onChange={(e) => setFdDeposit(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tenure ({fdYears} Years)</label>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={fdYears}
                  onChange={(e) => setFdYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg accent-blue-600 cursor-pointer mt-3"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Income Tax Slab</label>
                <select
                  value={taxSlab}
                  onChange={(e) => setTaxSlab(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold bg-white"
                >
                  <option value={5}>5% Slab</option>
                  <option value={20}>20% Slab</option>
                  <option value={30}>30% Slab (Peak)</option>
                </select>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-500 text-white flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase">Post-Tax Gain Advantage</p>
                <p className="text-sm font-bold">Mutual Funds deliver {fmt(diff)} extra in-hand wealth over FD!</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold uppercase text-slate-500">Bank Fixed Deposit (FD)</span>
                <p className="text-2xl font-black text-slate-900">{fmt(fdNet)}</p>
                <div className="text-xs space-y-1 pt-2 border-t text-slate-600">
                  <div className="flex justify-between"><span>Gross Interest ({fdRate}%):</span><span>{fmt(fdInterest)}</span></div>
                  <div className="flex justify-between text-rose-600"><span>Tax Paid ({taxSlab}% Slab):</span><span>–{fmt(fdTax)}</span></div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-2">
                <span className="text-xs font-bold uppercase text-emerald-800">Mutual Fund (Equity/Debt)</span>
                <p className="text-2xl font-black text-emerald-900">{fmt(mfNet)}</p>
                <div className="text-xs space-y-1 pt-2 border-t text-emerald-800">
                  <div className="flex justify-between"><span>Gross Gain ({mfRateFd}%):</span><span>{fmt(mfGains)}</span></div>
                  <div className="flex justify-between text-rose-600"><span>12.5% LTCG Tax:</span><span>–{fmt(mfTax)}</span></div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 14. IPO ALLOTMENT PROBABILITY CALCULATOR */}
      {slug === 'ipo-allotment-calculator' && (() => {
        const singleChance = Math.min(100, (1 / Math.max(1, ipoSubscription)) * 100);
        const multiChance = (1 - Math.pow(1 - singleChance / 100, ipoFamilyDemat)) * 100;
        const odds1InX = Math.round(ipoSubscription);

        return (
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Retail / sHNI Over-Subscription (Times)
                </label>
                <input
                  type="number"
                  value={ipoSubscription}
                  onChange={(e) => setIpoSubscription(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Unique Family Demat Accounts (Different PANs)
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={ipoFamilyDemat}
                  onChange={(e) => setIpoFamilyDemat(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                />
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase">Single Account Allotment Chance</p>
                <p className="text-3xl font-black text-slate-900 mt-1">{singleChance.toFixed(2)}%</p>
                <p className="text-xs text-slate-500">Lottery Odds: Approx 1 in {odds1InX} applicants</p>
              </div>
              <div className="pt-3 border-t border-slate-200">
                <p className="text-xs font-semibold text-emerald-800 uppercase">
                  Multi-Account Family Probability ({ipoFamilyDemat} Demats)
                </p>
                <p className="text-2xl font-black text-emerald-600 mt-1">{multiChance.toFixed(2)}%</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Applying 1 lot each across {ipoFamilyDemat} PANs drastically increases lottery success rate.
                </p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 15. BROKERAGE & INTRADAY PROFIT CALCULATOR */}
      {slug === 'brokerage-calculator' && (() => {
        const buyTurn = tradeBuyPrice * tradeQty;
        const sellTurn = tradeSellPrice * tradeQty;
        const totalTurn = buyTurn + sellTurn;
        const grossPnl = sellTurn - buyTurn;

        const brokerage = tradeSegment === 'delivery' ? 0 : Math.min(40, totalTurn * 0.0003);
        const stt =
          tradeSegment === 'delivery'
            ? totalTurn * 0.001
            : tradeSegment === 'intraday'
            ? sellTurn * 0.00025
            : sellTurn * 0.000125;
        const exchangeFee = totalTurn * 0.0000345;
        const sebiFee = totalTurn * 0.000001;
        const stampDuty = buyTurn * 0.00015;
        const gst = (brokerage + exchangeFee + sebiFee) * 0.18;
        const totalCharges = brokerage + stt + exchangeFee + sebiFee + stampDuty + gst;
        const netPnl = grossPnl - totalCharges;
        const breakeven = tradeQty > 0 ? tradeBuyPrice + totalCharges / tradeQty : tradeBuyPrice;

        return (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-2">
              {(['delivery', 'intraday', 'fno'] as const).map((seg) => (
                <button
                  key={seg}
                  type="button"
                  onClick={() => setTradeSegment(seg)}
                  className={`py-2 rounded-xl text-xs font-bold uppercase transition ${
                    tradeSegment === seg ? 'bg-[#0B1C2D] text-white shadow-sm' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {seg === 'delivery' ? 'Equity Delivery' : seg === 'intraday' ? 'Intraday' : 'F&O Trade'}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Buy Price ({currency})</label>
                <input
                  type="number"
                  value={tradeBuyPrice}
                  onChange={(e) => setTradeBuyPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sell Price ({currency})</label>
                <input
                  type="number"
                  value={tradeSellPrice}
                  onChange={(e) => setTradeSellPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Share Quantity</label>
                <input
                  type="number"
                  value={tradeQty}
                  onChange={(e) => setTradeQty(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <span className="font-extrabold uppercase text-slate-500">Government & Exchange Charges</span>
                <div className="flex justify-between"><span>Brokerage:</span><span>{fmt(brokerage)}</span></div>
                <div className="flex justify-between"><span>STT / CTT:</span><span>{fmt(stt)}</span></div>
                <div className="flex justify-between"><span>Exchange Turnover Charges:</span><span>{fmt(exchangeFee)}</span></div>
                <div className="flex justify-between"><span>GST (18%):</span><span>{fmt(gst)}</span></div>
                <div className="flex justify-between"><span>SEBI & Stamp Duty:</span><span>{fmt(sebiFee + stampDuty)}</span></div>
                <div className="pt-2 border-t font-bold flex justify-between text-slate-900">
                  <span>Total Regulatory Charges:</span>
                  <span>{fmt(totalCharges)}</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase">Net Realized Profit / Loss</p>
                  <p className={`text-3xl font-black mt-1 ${netPnl >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {netPnl >= 0 ? `+${fmt(netPnl)}` : `-${fmt(Math.abs(netPnl))}`}
                  </p>
                </div>
                <div className="pt-2 border-t text-xs text-slate-600">
                  <p>Breakeven Sell Price: <span className="font-bold text-slate-900">{fmt(breakeven)}</span></p>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
