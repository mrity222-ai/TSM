export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolBenefit {
  title: string;
  description?: string;
  desc?: string;
}

export interface ToolStep {
  step: number;
  title: string;
  desc: string;
}

export interface ToolMathDeepDive {
  formula: string;
  explanation: string[];
  nominalVsEffectiveExample: {
    title: string;
    description: string;
    nominalRate: string;
    effectiveRate: string;
    workedOutExample: string;
  };
}

export interface FinancialTool {
  slug: string;
  name: string;
  shortTitle: string;
  category: 'Investing' | 'Trading' | 'Loans & Planning';
  description: string;
  seoTitle: string;
  seoDescription: string;
  formulaTitle: string;
  formulaText: string;
  howItWorks: string[];
  faqs: ToolFaq[];
  overviewParagraphs?: string[];
  benefitsList?: ToolBenefit[];
  mathematicalDeepDive?: ToolMathDeepDive;
  howToUseSteps?: ToolStep[];
  keyAdvantages?: ToolBenefit[];
}

export const FINANCIAL_TOOLS: FinancialTool[] = [
  {
    slug: 'sip-calculator',
    name: 'SIP & Mutual Fund Return Calculator',
    shortTitle: 'SIP Calculator',
    category: 'Investing',
    description: 'Calculate the future value of your monthly Systematic Investment Plan (SIP) or one-time Lumpsum investment with compounding returns.',
    seoTitle: 'SIP Calculator — Mutual Fund Wealth Estimator & Return Calculator | The Stock Times',
    seoDescription: 'Free online SIP Calculator to estimate monthly mutual fund returns, total invested amount, and long-term wealth creation with compounding. Supports SIP and Lumpsum modes.',
    formulaTitle: 'SIP Calculation Formula',
    formulaText: 'M = P × ({[1 + i]^n – 1} / i) × (1 + i)',
    howItWorks: [
      'P represents your monthly SIP contribution amount.',
      'i is the periodic monthly rate of return.',
      'n is the total number of monthly installments (Years × 12).',
      'Compounding works best over 10+ years as returns generate additional returns.',
    ],
    overviewParagraphs: [
      'Prospective investors often assume that SIPs and mutual funds are the same entity. However, a Systematic Investment Plan (SIP) is merely a disciplined method of investing in mutual funds, with the alternative method being a one-time lump-sum investment. A SIP calculator is an essential interactive tool that helps you project the returns and wealth accumulation you can generate when parking your funds in such market instruments.',
      'A SIP allows you to invest a fixed sum of money into selected mutual fund schemes at pre-determined regular intervals—typically monthly, quarterly, or weekly. SIPs have become one of the most reliable wealth-creation routes for modern investors because they build financial discipline, average out market volatility, and unleash the exponential power of compounding.',
      'The Stock Times SIP Calculator provides prospective investors with transparent estimates on their mutual fund journey based on projected annual return rates. Please note that actual returns depend on dynamic market cycles, asset allocations, fund performance, and prevailing expense ratios or exit loads (if any).'
    ],
    benefitsList: [
      {
        title: 'Financial Discipline & Regularity',
        description: 'Automates monthly savings directly from your bank account, instilling consistency without needing to time market peaks or troughs.',
      },
      {
        title: 'Rupee Cost Averaging',
        description: 'When equity markets drop, your fixed SIP installment purchases more fund units; when markets rally, it purchases fewer units, naturally bringing down your average cost per unit over time.',
      },
      {
        title: 'Exponential Compounding',
        description: 'Returns earned in earlier years get reinvested into the scheme, generating additional gains that balloon exponentially over a 10 to 20-year horizon.',
      },
      {
        title: 'Low Capital Barrier',
        description: 'You do not need massive capital upfront. Start small with as little as ₹100 or ₹500 per month and scale up your contributions as your income grows.',
      },
    ],
    mathematicalDeepDive: {
      formula: 'M = P × ({[1 + i]^n – 1} / i) × (1 + i)',
      explanation: [
        'P represents the periodic investment amount (your monthly SIP contribution).',
        'i represents the periodic rate of interest (the compounded monthly rate of return).',
        'n represents the total number of payments/installments (Years × 12).',
        'M represents the expected maturity amount / total future value of your portfolio.',
      ],
      nominalVsEffectiveExample: {
        title: 'Nominal Monthly Return vs Compounded Effective Return',
        description: 'A common mistake when calculating SIP returns is to simply divide the annual return rate by 12 (for example, taking a 12% annual return as 12 ÷ 12 = 1% per month). Because mutual funds compound returns continually, simple division inflates the result.',
        nominalRate: 'Simple Division: 12% ÷ 12 = 1.00% per month (which actually compounds to 12.68% annually).',
        effectiveRate: 'True Compounded Rate: i = (1 + Annual Return)^(1/12) - 1. For a 12% annual return, i = (1 + 0.12)^(1/12) - 1 ≈ 0.95% (0.009488) per month.',
        workedOutExample: 'Take for example you invest ₹1,000 per month for 12 months at an expected annual return of 12%. Using the accurate monthly rate i = 0.0095: M = 1,000 × ({[1 + 0.0095]^12 – 1} / 0.0095) × (1 + 0.0095) ≈ ₹12,766 in 1 year (Total Invested: ₹12,000 | Est. Wealth Gain: ₹766).',
      },
    },
    howToUseSteps: [
      {
        step: 1,
        title: 'Select Investment Mode & Amount',
        desc: 'Toggle between Monthly SIP and Lumpsum, then drag the slider or type your installment amount (e.g. ₹5,000 or ₹10,000).',
      },
      {
        step: 2,
        title: 'Input Expected Return Rate (p.a.)',
        desc: 'Set the expected annual rate of return based on historical fund category returns (e.g. 12% to 15% for diversified equities).',
      },
      {
        step: 3,
        title: 'Choose Investment Horizon',
        desc: 'Select the total number of years you plan to stay invested (e.g. 5, 10, or 20 years) to match your financial targets.',
      },
      {
        step: 4,
        title: 'Review Donut Chart & Breakdown',
        desc: 'View your Total Future Value, Invested Capital, and Wealth Gain breakdown instantly on the interactive SVG ring chart.',
      },
    ],
    keyAdvantages: [
      {
        title: '100% Free & Instant',
        desc: 'Run unlimited financial simulations with real-time feedback and zero sign-ups or hidden charges.',
      },
      {
        title: 'Dual SIP & Lumpsum Capability',
        desc: 'Seamlessly compare the wealth creation outcomes of periodic SIPs versus one-time lump-sum capital deployment.',
      },
      {
        title: 'Multi-Currency Support (₹ & $)',
        desc: 'Switch between INR (₹) for domestic Indian mutual funds and USD ($) for international equity portfolios and ETFs.',
      },
      {
        title: 'Institutional Visual Donut Chart',
        desc: 'Get an immediate visual understanding of your capital investment versus pure market appreciation.',
      },
    ],
    faqs: [
      {
        question: 'How much can I invest in a SIP?',
        answer: 'There is no upper ceiling on how much you can invest in a SIP. Most asset management companies (AMCs) and mutual fund houses allow investors to start with as low as ₹100 to ₹500 per month, making it accessible for retail investors while accommodating high-net-worth individuals investing lakhs per month.',
      },
      {
        question: 'What is the maximum tenure of a SIP?',
        answer: 'There is no legal maximum limit on SIP duration. You can choose any tenure ranging from 6 months up to 30+ years, or opt for a "Perpetual SIP" which continues running automatically until you explicitly request to stop it.',
      },
      {
        question: 'Are SIPs similar to mutual funds?',
        answer: 'No, SIPs and mutual funds are fundamentally different concepts. A mutual fund is the investment product itself (a pooled portfolio of stocks, bonds, or gold), whereas a SIP is merely the recurring payment route used to buy units of that mutual fund periodically.',
      },
      {
        question: 'Can I modify or step-up my SIP amount?',
        answer: 'Yes. Most modern mutual fund platforms support a "Step-Up SIP" or "Top-Up SIP" feature. This allows you to automatically increase your monthly investment by a predetermined percentage (e.g., 10% annually) in line with your salary increments.',
      },
      {
        question: 'Do SIPs allow only equity mutual fund investments?',
        answer: 'No. While SIPs are most famous for equity and index funds, you can also start a SIP in debt funds, liquid funds, hybrid funds, and gold ETFs to achieve broad asset diversification and reduce downside volatility.',
      },
      {
        question: 'What are the types of SIPs available?',
        answer: 'Common SIP types include: 1) Regular SIP (fixed amount on a fixed date), 2) Top-Up/Step-Up SIP (increases contribution periodically), 3) Flexible SIP (allows varying installment amounts based on your monthly cash flow), 4) Perpetual SIP (invests continuously without a set end date), and 5) Trigger SIP (invests automatically when market NAV or an index level triggers).',
      },
      {
        question: 'Can I renew an existing SIP?',
        answer: 'Yes. When your SIP tenure ends, you can renew it either manually through your mutual fund account or configure an auto-renewal mandate so your wealth-building compounding chain continues seamlessly.',
      },
      {
        question: 'Can I pause my investments in a SIP?',
        answer: 'Yes. Most fund houses provide a "SIP Pause" feature. If you experience temporary financial constraints, you can pause installments for 1 to 3 months without cancelling your folio or facing any financial penalty, while your existing investments continue earning market returns.',
      },
    ],
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Global Compound Interest Calculator',
    shortTitle: 'Compound Interest',
    category: 'Investing',
    description: 'Estimate lump-sum wealth growth over time using daily, monthly, quarterly, or annual compounding.',
    seoTitle: 'Compound Interest Calculator — Lump Sum Investment Growth | The Stock Times',
    seoDescription: 'Calculate compound interest and future investment value on lump-sum capital with customizable compounding frequency and tenure.',
    formulaTitle: 'Compound Interest Formula',
    formulaText: 'A = P × (1 + r/n)^(n × t)',
    howItWorks: [
      'P is the initial principal lump-sum investment.',
      'r is the annual nominal interest rate (in decimal).',
      'n is the number of times interest is compounded per year.',
      't is the total investment time horizon in years.',
    ],
    faqs: [
      {
        question: 'Why does compounding frequency matter?',
        answer: 'More frequent compounding (such as monthly or daily instead of annually) calculates interest on accumulated gains sooner, resulting in slightly higher total returns.',
      },
      {
        question: 'What is the Rule of 72 in compounding?',
        answer: 'Divide 72 by your annual interest rate to estimate how many years it takes for your money to double. At 12% annual return, capital doubles in roughly 6 years.',
      },
    ],
  },
  {
    slug: 'stock-average-calculator',
    name: 'Stock Average & Profit/Loss Calculator',
    shortTitle: 'Stock Average Calculator',
    category: 'Trading',
    description: 'Calculate your new average buy price after purchasing additional shares at a lower or higher market price.',
    seoTitle: 'Stock Average Price Calculator — Share Averaging Tool | The Stock Times',
    seoDescription: 'Quickly calculate average stock purchase price across multiple buy orders and find your exact breakeven price.',
    formulaTitle: 'Average Share Price Formula',
    formulaText: 'Average Price = ((Qty 1 × Price 1) + (Qty 2 × Price 2)) ÷ (Qty 1 + Qty 2)',
    howItWorks: [
      'Enter your existing share quantity and original purchase price.',
      'Enter the new quantity of shares you plan to buy and the current market price.',
      'The calculator immediately shows total shares held, total capital deployed, and your updated breakeven price.',
    ],
    faqs: [
      {
        question: 'When should investors average down a stock?',
        answer: 'Averaging down is typically considered only when a company’s core fundamentals remain strong and the price dip is driven by temporary market volatility.',
      },
      {
        question: 'Does this include brokerage and taxes?',
        answer: 'This tool calculates pure equity breakeven price. Brokerage fees, STT, and exchange charges may add a small margin depending on your broker.',
      },
    ],
  },
  {
    slug: 'emi-calculator',
    name: 'Loan & Home EMI Calculator',
    shortTitle: 'EMI Calculator',
    category: 'Loans & Planning',
    description: 'Plan your monthly loan repayments, total interest outgo, and principal breakdown for home, car, or personal loans.',
    seoTitle: 'Loan & Home EMI Calculator — Monthly Payment Breakdown | The Stock Times',
    seoDescription: 'Calculate exact monthly EMI, total payable interest, and principal breakdown for home loans, auto loans, and personal loans.',
    formulaTitle: 'EMI Mathematical Formula',
    formulaText: 'EMI = [P × R × (1+R)^N] ÷ [(1+R)^N – 1]',
    howItWorks: [
      'P stands for the total loan principal borrowed.',
      'R is the monthly interest rate (Annual Interest Rate ÷ 12 ÷ 100).',
      'N is the total loan tenure in months.',
    ],
    faqs: [
      {
        question: 'How can I reduce my total loan interest?',
        answer: 'Making partial prepayments early in the loan tenure or opting for a shorter repayment period significantly reduces total interest outgo.',
      },
      {
        question: 'Does EMI change if interest rates float?',
        answer: 'For floating-rate loans, banks usually adjust the loan tenure first when benchmark rates change, unless you request an EMI revision.',
      },
    ],
  },
  {
    slug: 'dividend-calculator',
    name: 'Dividend Yield & Annual Income Calculator',
    shortTitle: 'Dividend Calculator',
    category: 'Investing',
    description: 'Project annual and monthly passive dividend income from your stock portfolio based on share price and dividend yield.',
    seoTitle: 'Dividend Yield & Passive Income Calculator | The Stock Times',
    seoDescription: 'Calculate annual dividend income, monthly passive cashflow, and yield-on-cost for dividend-paying stocks and ETFs.',
    formulaTitle: 'Dividend Yield & Income Formula',
    formulaText: 'Annual Dividend Income = Total Portfolio Value × (Dividend Yield % ÷ 100)',
    howItWorks: [
      'Input your total equity portfolio value or stock investment.',
      'Set the expected annual dividend yield percentage.',
      'View projected annual and monthly passive income before taxes.',
    ],
    faqs: [
      {
        question: 'What is considered a healthy dividend yield?',
        answer: 'In global markets, blue-chip dividend stocks typically yield between 2% and 5%. Extremely high yields above 8% may sometimes indicate payout sustainability risks.',
      },
      {
        question: 'Are stock dividends taxable?',
        answer: 'Yes, dividend income is generally taxed according to your local jurisdiction’s income tax slab or dividend withholding rules.',
      },
    ],
  },
  {
    slug: 'retirement-calculator',
    name: 'Retirement & FIRE Corpus Calculator',
    shortTitle: 'Retirement Calculator',
    category: 'Loans & Planning',
    description: 'Estimate the retirement corpus you will accumulate by your target retirement age based on current savings and monthly investments.',
    seoTitle: 'Retirement & FIRE Corpus Calculator — Wealth Planner | The Stock Times',
    seoDescription: 'Plan your financial independence and retirement corpus using current age, retirement age, monthly savings, and expected return rate.',
    formulaTitle: 'Retirement Corpus Projection',
    formulaText: 'Future Corpus = FV(Existing Savings) + FV(Monthly Contributions)',
    howItWorks: [
      'Set your current age and target retirement age to determine compounding years.',
      'Enter your existing retirement savings and ongoing monthly investment.',
      'Adjust expected annual return to project your final retirement nest egg.',
    ],
    faqs: [
      {
        question: 'What is the 4% safe withdrawal rule?',
        answer: 'The 4% rule suggests that retirees can withdraw 4% of their initial retirement corpus annually (adjusted for inflation) with a high probability of not running out of money over 30 years.',
      },
      {
        question: 'Why should I factor in inflation for retirement?',
        answer: 'Inflation reduces purchasing power over time. Aiming for a portfolio return that beats inflation by 4%–6% helps preserve real wealth.',
      },
    ],
  },
  {
    slug: 'mutual-fund-vs-stock-comparison',
    name: 'Mutual Fund vs. Direct Stock Comparison Calculator',
    shortTitle: 'MF vs Stocks',
    category: 'Investing',
    description: 'Compare long-term post-tax wealth creation between diversified Mutual Funds (with expense ratios) and direct Stocks with custom CAGR and dividend yield.',
    seoTitle: 'Mutual Fund vs Direct Stock Comparison Calculator — Return & Tax Analysis | The Stock Times',
    seoDescription: 'Interactive comparison between Mutual Fund SIPs and direct Equity Stock investing. Analyzes management fee drag, LTCG 12.5% taxation, and 20-year net wealth accumulation.',
    formulaTitle: 'Comparative Wealth Accumulation Formula',
    formulaText: 'Net MF Wealth = FV(SIP, r - Expense Ratio) - 12.5% LTCG | Net Stock Wealth = FV(SIP, Stock CAGR + Div Yield - Charges) - 12.5% LTCG',
    howItWorks: [
      'Input monthly investment amount and expected tenure (5 to 30 years).',
      'Set Mutual Fund expected annual return (e.g. 13%) and Annual Expense Ratio (e.g. 0.8%).',
      'Set Direct Stock expected CAGR (e.g. 16%), Dividend Yield (e.g. 1.5%), and transaction brokerage.',
      'Review side-by-side terminal corpus, tax liability, and net take-home returns.',
    ],
    faqs: [
      {
        question: 'Is direct stock investing always better than mutual funds?',
        answer: 'Not necessarily. While direct stock investing can deliver higher alpha (returns) and saves fund management fees, it requires rigorous research, time commitment, and active risk management. Mutual funds provide instant risk diversification managed by professional fund managers.',
      },
      {
        question: 'How does expense ratio impact mutual fund returns over 20 years?',
        answer: 'Even a seemingly small 1% expense ratio can eat away up to 20% to 25% of your final wealth accumulation over a 20-year horizon due to the compounding effect on deducted management fees.',
      },
      {
        question: 'What is the LTCG tax on mutual funds and stocks in India?',
        answer: 'Long-Term Capital Gains (LTCG) on equity mutual funds and listed stocks held for more than 12 months are exempt up to ₹1.25 Lakh per financial year, and taxed at a flat 12.5% thereafter without indexation.',
      },
    ],
  },
  {
    slug: 'compare-mutual-funds',
    name: 'Mutual Fund Comparison Calculator (Direct vs Regular & Fees)',
    shortTitle: 'Compare Mutual Funds',
    category: 'Investing',
    description: 'Compare two mutual funds side-by-side to evaluate return differences, fee drag, and the compounding advantage of Direct Plans over Regular Plans.',
    seoTitle: 'Mutual Fund Comparison Calculator — Direct vs Regular Plan Fee Saver | The Stock Times',
    seoDescription: 'Compare two mutual funds side-by-side. Calculate how much extra wealth you create by eliminating distributor commission in zero-brokerage Direct Plans.',
    formulaTitle: 'Fee Savings Compounding Equation',
    formulaText: 'Fee Difference = FV(SIP, Rate_B - Expense_B) – FV(SIP, Rate_A - Expense_A)',
    howItWorks: [
      'Enter Fund A and Fund B expected annual return percentages.',
      'Input their respective Total Expense Ratios (TER), such as 1.8% for Regular vs 0.6% for Direct.',
      'Set monthly investment amount and tenure to reveal exact lakhs of rupees saved.',
    ],
    faqs: [
      {
        question: 'What is the main difference between Direct and Regular mutual funds?',
        answer: 'Direct plans are bought directly from the AMC with zero distributor commission, resulting in a significantly lower Expense Ratio (often 0.5%–1.2% lower) and higher net NAV compounding. Regular plans include ongoing commissions paid to brokers or distributors.',
      },
      {
        question: 'How do I switch from Regular to Direct mutual funds?',
        answer: 'You can switch via your AMC portal, MF Central, or direct broker platforms. Note that switching is technically treated as a redemption and fresh purchase, so capital gains tax and exit loads may apply if within the holding period.',
      },
    ],
  },
  {
    slug: 'compare-stocks',
    name: 'Stock Valuation & Graham Intrinsic Value Peer Comparison',
    shortTitle: 'Stock Comparison Tool',
    category: 'Trading',
    description: 'Compare two Indian equities across key valuation metrics: P/E, P/B, ROE %, and Benjamin Graham Intrinsic Value to determine fair market value.',
    seoTitle: 'Stock Valuation & Peer Comparison Tool — Graham Intrinsic Value | The Stock Times',
    seoDescription: 'Evaluate and compare two stocks side-by-side using P/E, EPS, ROE, Book Value, and Benjamin Graham Intrinsic Value formula. Discover undervalued value investments.',
    formulaTitle: 'Benjamin Graham Intrinsic Value Equation',
    formulaText: 'Graham Value = √(22.5 × EPS × Book Value per Share)',
    howItWorks: [
      'Enter Share Price, EPS, P/E Ratio, ROE %, and Book Value per Share for Company A and Company B.',
      'The calculator computes Graham Intrinsic Value, Price-to-Book multiple, and margin of safety.',
      'Review automated valuation badges (Undervalued vs Overvalued) and financial efficiency scores.',
    ],
    faqs: [
      {
        question: 'What is Benjamin Graham’s Number in stock valuation?',
        answer: 'The Graham Number is a conservative valuation metric that determines the maximum fair price an investor should pay for a share, calculated as the square root of (22.5 × EPS × Book Value). If the market price is below this number, the stock is historically considered undervalued.',
      },
      {
        question: 'Why is ROE important when comparing peer stocks?',
        answer: 'Return on Equity (ROE) measures how efficiently a company generates profits from shareholders’ equity. An ROE consistently above 15%–20% indicates strong management execution and pricing power.',
      },
    ],
  },
  {
    slug: 'step-up-sip-calculator',
    name: 'Step-Up SIP & Top-Up Wealth Calculator',
    shortTitle: 'Step-Up SIP',
    category: 'Investing',
    description: 'Calculate how increasing your monthly SIP contribution by 5%, 10%, or 15% each year in line with salary increments exponentially accelerates your ₹1 Crore and ₹5 Crore wealth milestones.',
    seoTitle: 'Step-Up SIP Calculator — Top-Up Annual Growth & ₹1 Crore Goal | The Stock Times',
    seoDescription: 'Free Step-Up SIP calculator with annual contribution top-ups. See how a 10% annual increase reaches your financial goals years ahead of flat SIPs.',
    formulaTitle: 'Step-Up Compounding Mathematical Algorithm',
    formulaText: 'M = Σ [P_t × (1 + i)^n_t] where P_t = Initial_SIP × (1 + Step_Up_Rate)^(t - 1)',
    howItWorks: [
      'Set starting monthly SIP installment (e.g. ₹10,000).',
      'Choose annual top-up percentage (e.g. 10% annually).',
      'Select expected CAGR return (e.g. 12% to 15%) and investment tenure (Years).',
      'Compare standard SIP maturity versus Step-Up SIP maturity side-by-side.',
    ],
    faqs: [
      {
        question: 'What is a Step-Up SIP?',
        answer: 'A Step-Up (or Top-Up) SIP is a mutual fund facility where your monthly installment amount automatically increases by a predetermined percentage (e.g., 10%) or fixed amount (e.g., ₹1,000) every year, usually coinciding with annual salary increments.',
      },
      {
        question: 'How much faster can a Step-Up SIP reach ₹1 Crore?',
        answer: 'A flat ₹10,000/month SIP at 12% annual return takes approximately 20 years to reach ₹1 Crore. With a 10% annual Step-Up, you cross ₹1 Crore in just 14 years—saving 6 whole years!',
      },
    ],
  },
  {
    slug: 'swp-calculator',
    name: 'Systematic Withdrawal Plan (SWP) Pension Calculator',
    shortTitle: 'SWP Calculator',
    category: 'Loans & Planning',
    description: 'Simulate monthly post-retirement pension withdrawals from your mutual fund corpus while calculating remaining capital longevity and returns.',
    seoTitle: 'SWP Calculator — Mutual Fund Systematic Withdrawal Pension Planner | The Stock Times',
    seoDescription: 'Calculate monthly retirement pension cashflows and corpus balance longevity with this interactive Systematic Withdrawal Plan (SWP) calculator.',
    formulaTitle: 'Remaining Corpus Recurrence Formula',
    formulaText: 'Balance_t = (Balance_{t-1} - Withdrawal) × (1 + Monthly_Return_Rate)',
    howItWorks: [
      'Enter your initial accumulated retirement corpus (e.g. ₹50 Lakh or ₹1 Crore).',
      'Set your monthly withdrawal requirement (e.g. ₹35,000 per month).',
      'Set expected portfolio annual return (e.g. 8%–10% in conservative hybrid funds).',
      'View total withdrawn money and remaining portfolio balance over 10, 20, or 30 years.',
    ],
    faqs: [
      {
        question: 'Is SWP better than dividend option or bank FD for monthly income?',
        answer: 'Yes, SWP is far more tax-efficient. In an SWP, only the capital gains portion of each withdrawal is taxed, whereas FD interest is taxed at your peak income slab rate. Furthermore, your remaining principal continues to grow in market-linked funds.',
      },
      {
        question: 'What is a sustainable withdrawal rate for SWP?',
        answer: 'A conservative withdrawal rate of 4% to 6% of your initial portfolio per annum ensures that your capital continues to outlive inflation without depleting the core corpus.',
      },
    ],
  },
  {
    slug: 'lumpsum-calculator',
    name: 'Lumpsum Investment & Inflation-Adjusted Return Calculator',
    shortTitle: 'Lumpsum Calculator',
    category: 'Investing',
    description: 'Calculate the future compounding value and inflation-adjusted real purchasing power of a one-time capital investment in mutual funds, stocks, or ETFs.',
    seoTitle: 'Lumpsum Investment Calculator — Compounding & Inflation Real Value | The Stock Times',
    seoDescription: 'Calculate maturity value, total profit, and inflation-adjusted purchasing power of your one-time lumpsum mutual fund or equity investment.',
    formulaTitle: 'Lumpsum Compounding & Inflation Equation',
    formulaText: 'M = P × (1 + r)^t | Real Value = M ÷ (1 + Inflation)^t',
    howItWorks: [
      'Enter total one-time capital to invest (e.g. ₹1,00,000 or ₹5,00,000).',
      'Adjust expected annual rate of return and investment horizon.',
      'Optionally toggle inflation adjustment (default 6% CPI) to see real future purchasing power.',
    ],
    faqs: [
      {
        question: 'When should an investor choose Lumpsum over SIP?',
        answer: 'Lumpsum investing is ideal when you receive a significant cash influx (such as annual bonuses, gratuity, or property sale) and market valuations are reasonable, allowing 100% of capital to begin compounding from day one.',
      },
      {
        question: 'How does inflation affect my lumpsum returns?',
        answer: 'While your nominal investment may grow from ₹5 Lakh to ₹20 Lakh in 12 years at 12% return, a 6% annual inflation rate means ₹20 Lakh in the future will buy goods worth approximately ₹10 Lakh in today’s money.',
      },
    ],
  },
  {
    slug: 'fd-vs-mutual-fund-calculator',
    name: 'Bank Fixed Deposit vs. Mutual Fund Post-Tax Return Calculator',
    shortTitle: 'FD vs Mutual Fund',
    category: 'Investing',
    description: 'Compare bank Fixed Deposit returns against Debt and Equity Mutual Funds after factoring in your personal income tax slab and capital gains tax rules.',
    seoTitle: 'Bank FD vs Mutual Fund Calculator — Post-Tax Real Return Comparison | The Stock Times',
    seoDescription: 'Compare Bank Fixed Deposits vs Mutual Funds. See how tax slabs (5%, 20%, 30%) affect FD interest vs 12.5% LTCG on mutual funds.',
    formulaTitle: 'Post-Tax Comparative Formula',
    formulaText: 'Net FD Return = Interest × (1 - Tax_Slab) | Net MF Return = Gains - [12.5% × (Gains - ₹1.25L)]',
    howItWorks: [
      'Enter principal investment amount and deposit tenure in years.',
      'Input Bank FD interest rate (e.g. 7.1%) and select your Income Tax Bracket (5%, 20%, or 30%).',
      'Input Mutual Fund expected annual return (e.g. 12% for equity or 8% for hybrid/debt).',
      'View post-tax net take-home gains and real wealth difference.',
    ],
    faqs: [
      {
        question: 'Why are Bank FDs less tax-efficient for high earners?',
        answer: 'Bank FD interest is added to your total annual income and taxed at your marginal slab rate (up to 30% plus cess and surcharge). In contrast, equity mutual funds benefit from a flat 12.5% LTCG rate with an annual ₹1.25 Lakh tax-free exemption.',
      },
      {
        question: 'Is Fixed Deposit safer than Mutual Funds?',
        answer: 'Fixed deposits in scheduled banks offer guaranteed interest and are insured by DICGC up to ₹5 Lakh per bank. Mutual funds carry market risk but historically provide much higher real returns that beat long-term inflation.',
      },
    ],
  },
  {
    slug: 'ipo-allotment-calculator',
    name: 'IPO Allotment Probability & Multi-Account Strategy Calculator',
    shortTitle: 'IPO Allotment Probability',
    category: 'Trading',
    description: 'Calculate your mathematical probability of receiving IPO share allotment based on retail/HNI subscription numbers and optimize multi-PAN family bidding strategy.',
    seoTitle: 'IPO Allotment Probability Calculator — Retail & HNI Odds Estimator | The Stock Times',
    seoDescription: 'Estimate your chances of getting share allotment in oversubscribed Mainboard and SME IPOs. Optimize your bid strategy across family Demat accounts.',
    formulaTitle: 'Lottery Allotment Probability Equation',
    formulaText: 'Allotment Chance (%) = min(100, (Number of Family Accounts ÷ Retail Subscription Times) × 100)',
    howItWorks: [
      'Input total times the Retail Individual Investor (RII) or sHNI quota is oversubscribed (e.g. 25x or 50x).',
      'Enter the number of unique family Demat accounts (different PAN cards) applying for 1 lot each.',
      'The calculator computes exact individual and cumulative allotment probabilities and lottery odds.',
    ],
    faqs: [
      {
        question: 'Does applying for multiple lots in the retail category increase allotment chances?',
        answer: 'No. Under SEBI retail allotment rules for oversubscribed IPOs, allotment is conducted via a computerized lottery where each valid PAN applicant can receive at most 1 retail lot. Applying for multiple lots from the same PAN card does NOT increase your lottery odds; applying 1 lot from multiple family PAN cards does.',
      },
      {
        question: 'What is the best bidding strategy for highly oversubscribed IPOs?',
        answer: 'Always bid at the "Cut-Off Price" to prevent disqualification, ensure UPI mandates are approved before deadline, and apply 1 lot each across multiple unique family members’ Demat accounts with individual PAN cards.',
      },
    ],
  },
  {
    slug: 'brokerage-calculator',
    name: 'Brokerage, STT & Intraday Net Profit/Loss Calculator',
    shortTitle: 'Brokerage Calculator',
    category: 'Trading',
    description: 'Calculate regulatory transaction costs—STT, GST, Exchange Turnover, SEBI charges, and Stamp Duty—to determine exact breakeven and net take-home profit for equity delivery, intraday, and F&O trades.',
    seoTitle: 'Stock Brokerage & Intraday Profit Calculator — STT & Regulatory Charges | The Stock Times',
    seoDescription: 'Accurately calculate net trading profits and all regulatory charges (STT, Exchange fee, SEBI turnover, GST 18%, Stamp Duty) for NSE and BSE trades.',
    formulaTitle: 'Net Trading Profit Equation',
    formulaText: 'Net Profit = Gross Profit – (Brokerage + STT + Exchange Fee + GST + SEBI Fee + Stamp Duty)',
    howItWorks: [
      'Select Trading Segment: Equity Delivery, Equity Intraday, Futures, or Options.',
      'Enter Buy Price, Sell Price, and Share Quantity.',
      'Set Brokerage rate (e.g. ₹0 for delivery, ₹20 flat for discount brokers).',
      'Review detailed itemized charge sheet, breakeven price points, and net realized profit.',
    ],
    faqs: [
      {
        question: 'What is Securities Transaction Tax (STT)?',
        answer: 'STT is a direct federal tax levied on every purchase and sale of securities listed on recognized Indian stock exchanges (NSE/BSE). For equity delivery, it is 0.1% on both buy and sell; for intraday equity, it is 0.025% on the sell side only.',
      },
      {
        question: 'How do discount brokers charge ₹20 per trade?',
        answer: 'Most top discount brokers follow a flat fee model: ₹20 or 0.03% (whichever is lower) per executed order for intraday equity and F&O, while offering ₹0 brokerage on delivery trades.',
      },
    ],
  },
];
