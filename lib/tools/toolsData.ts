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
];
