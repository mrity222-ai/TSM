export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolBodySection {
  heading: string;
  paragraphs?: string[];
  orderedSteps?: string[];
  bullets?: string[];
  formula?: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface FinancialTool {
  slug: string;
  name: string;
  shortTitle: string;
  h1Title: string;
  category: 'Investing' | 'Trading' | 'Loans & Planning';
  description: string;
  seoTitle: string;
  seoDescription: string;
  schemaName: string;
  schemaDescription: string;
  disclaimer: string;
  formulaTitle: string;
  formulaText: string;
  howItWorks: string[];
  bodySections: ToolBodySection[];
  faqs: ToolFaq[];
  relatedSlugs: string[];
  showRelatedIpoArticles?: boolean;
}

export const CALCULATOR_DISCLAIMER =
  'Results are estimates based on the inputs you provide. They are not investment advice or a guarantee of returns. Mutual fund investments are subject to market risks.';

export const FINANCIAL_TOOLS: FinancialTool[] = [
  {
    slug: 'sip-calculator',
    name: 'SIP Calculator',
    shortTitle: 'SIP Calculator',
    h1Title: 'SIP Calculator: Estimate Your Mutual Fund Returns',
    category: 'Investing',
    description:
      'Free SIP calculator to estimate your mutual fund returns. Enter monthly amount, expected return and tenure to see invested amount, gains and maturity value.',
    seoTitle: 'SIP Calculator – Estimate SIP Returns | The Stock Times',
    seoDescription:
      'Free SIP calculator to estimate your mutual fund returns. Enter monthly amount, expected return and tenure to see invested amount, gains and maturity value.',
    schemaName: 'SIP Calculator',
    schemaDescription:
      'Free SIP calculator to estimate mutual fund returns from a monthly investment.',
    disclaimer: CALCULATOR_DISCLAIMER,
    formulaTitle: 'SIP calculator formula',
    formulaText: 'FV = P × [((1 + i)^n − 1) / i] × (1 + i)',
    howItWorks: [],
    bodySections: [
      {
        heading: 'What is a SIP calculator?',
        paragraphs: [
          'A SIP calculator estimates how much your monthly Systematic Investment Plan (SIP) can grow over time. You enter the monthly amount, the expected annual return and the number of years. The tool shows your total invested amount, estimated returns and final maturity value.',
        ],
      },
      {
        heading: 'How to use the SIP calculator',
        orderedSteps: [
          'Enter your monthly SIP amount.',
          'Enter the expected annual return (for example 12%).',
          'Select the investment period in years.',
          'Read the invested amount, estimated returns and total value. The results update as you change the inputs.',
        ],
      },
      {
        heading: 'SIP calculator formula',
        paragraphs: [
          'The calculator uses the future value formula for a series of equal monthly payments:',
          'Here P is the monthly SIP amount, i is the monthly rate of return (annual rate ÷ 12) and n is the number of monthly instalments.',
        ],
        formula: 'FV = P × [((1 + i)^n − 1) / i] × (1 + i)',
      },
      {
        heading: 'SIP calculation example',
        paragraphs: [
          'A SIP of ₹5,000 per month for 10 years at 12% expected annual return gives about ₹11.62 lakh. You invest ₹6,00,000 in total, so the estimated gain is about ₹5.62 lakh.',
        ],
      },
      {
        heading: 'Why use a SIP calculator?',
        bullets: [
          'See how compounding grows small monthly amounts.',
          'Set a realistic monthly amount for a goal such as a house, education or retirement.',
          'Compare different tenures and return rates in seconds.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How is SIP return calculated?',
        answer:
          'SIP return is calculated with the future value formula for monthly investments, using the monthly rate of return and the number of instalments. The calculator does this for you.',
      },
      {
        question: 'What return should I assume in a SIP calculator?',
        answer:
          'Equity mutual funds have no fixed return. Many investors use 10% to 12% for long-term planning. Use a lower figure for a safer estimate.',
      },
      {
        question: 'Is the SIP calculator result guaranteed?',
        answer:
          'No. Mutual fund returns change with the market. The result is an estimate based on your inputs.',
      },
      {
        question: 'Does the calculator include tax?',
        answer:
          'No. The result is before tax. Capital gains tax on mutual funds depends on the fund type and holding period.',
      },
      {
        question: 'What is the minimum amount for a SIP?',
        answer:
          'Many mutual funds accept SIPs from ₹100 to ₹500 per month. Check the scheme document for the exact minimum.',
      },
    ],
    relatedSlugs: [
      'step-up-sip-calculator',
      'lumpsum-calculator',
      'swp-calculator',
      'fd-vs-mutual-fund-calculator',
      'retirement-calculator',
    ],
  },
  {
    slug: 'step-up-sip-calculator',
    name: 'Step-Up SIP Calculator',
    shortTitle: 'Step-Up SIP',
    h1Title: 'Step-Up SIP Calculator: See the Effect of Raising Your SIP Every Year',
    category: 'Investing',
    description:
      'Free step-up SIP calculator. Increase your SIP every year by a fixed percentage and see the invested amount, returns and maturity value instantly.',
    seoTitle: 'Step-Up SIP Calculator – Annual Increase Returns | The Stock Times',
    seoDescription:
      'Free step-up SIP calculator. Increase your SIP every year by a fixed percentage and see the invested amount, returns and maturity value instantly.',
    schemaName: 'Step-Up SIP Calculator',
    schemaDescription:
      'Free step-up SIP calculator to estimate returns when you increase your SIP every year.',
    disclaimer: CALCULATOR_DISCLAIMER,
    formulaTitle: 'How the calculation works',
    formulaText: 'Yearly Step-Up SIP compounded monthly across each year',
    howItWorks: [],
    bodySections: [
      {
        heading: 'What is a step-up SIP?',
        paragraphs: [
          'A step-up SIP (top-up SIP) is a SIP where you raise the monthly amount by a fixed percentage or amount every year. It matches your investing to your income growth. The step-up SIP calculator shows how much extra corpus this builds compared with a flat SIP.',
        ],
      },
      {
        heading: 'How to use the step-up SIP calculator',
        orderedSteps: [
          'Enter your starting monthly SIP amount.',
          'Enter the yearly step-up percentage (for example 10%).',
          'Enter the expected annual return and the number of years.',
          'Read the total invested amount, estimated returns and final value.',
        ],
      },
      {
        heading: 'How the calculation works',
        paragraphs: [
          "The SIP amount stays the same within a year and rises by the step-up percentage at the start of each new year. Each year's instalments are compounded monthly at the expected return until the end of the period, and all years are added together.",
        ],
      },
      {
        heading: 'Step-up SIP example',
        paragraphs: [
          'A SIP of ₹5,000 per month with a 10% yearly step-up for 10 years at 12% expected return grows to about ₹16.87 lakh. Your total investment is about ₹9.56 lakh. A flat ₹5,000 SIP for the same period gives about ₹11.62 lakh, so the yearly step-up adds about ₹5.25 lakh.',
        ],
      },
      {
        heading: 'Step-up SIP vs regular SIP',
        bullets: [
          'A regular SIP keeps the amount fixed for the whole period.',
          'A step-up SIP grows with your salary, so inflation matters less.',
          'Step-up SIP reaches the same goal in fewer years or with a smaller starting amount.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is a good step-up percentage for SIP?',
        answer:
          'Many investors choose 5% to 10% a year, in line with their expected salary growth. Pick a number you can keep up.',
      },
      {
        question: 'Is a step-up SIP better than a regular SIP?',
        answer:
          'If your income rises each year, a step-up SIP usually builds a larger corpus because you invest more as you earn more.',
      },
      {
        question: 'Can I set up a step-up SIP in any mutual fund?',
        answer:
          'Most fund houses and platforms offer a top-up or step-up option when you start a SIP. Check the option on your platform.',
      },
      {
        question: 'Are the results guaranteed?',
        answer:
          'No. The result is an estimate based on the return you enter. Actual returns change with the market.',
      },
    ],
    relatedSlugs: [
      'sip-calculator',
      'lumpsum-calculator',
      'swp-calculator',
      'retirement-calculator',
    ],
  },
  {
    slug: 'lumpsum-calculator',
    name: 'Lumpsum Calculator',
    shortTitle: 'Lumpsum Calculator',
    h1Title: 'Lumpsum Calculator: Estimate Returns on a One-Time Investment',
    category: 'Investing',
    description:
      'Free lumpsum calculator. Enter a one-time investment, expected return and years to see the estimated maturity value of your mutual fund investment.',
    seoTitle: 'Lumpsum Calculator – One-Time Investment Returns | The Stock Times',
    seoDescription:
      'Free lumpsum calculator. Enter a one-time investment, expected return and years to see the estimated maturity value of your mutual fund investment.',
    schemaName: 'Lumpsum Calculator',
    schemaDescription:
      'Free lumpsum calculator to estimate the future value of a one-time investment.',
    disclaimer: CALCULATOR_DISCLAIMER,
    formulaTitle: 'Lumpsum formula',
    formulaText: 'A = P × (1 + r)^t',
    howItWorks: [],
    bodySections: [
      {
        heading: 'What is a lumpsum calculator?',
        paragraphs: [
          'A lumpsum calculator estimates the future value of a one-time investment in a mutual fund or similar asset. You enter the amount, the expected annual return and the period. The tool shows the estimated gain and the maturity value.',
        ],
      },
      {
        heading: 'How to use the lumpsum calculator',
        orderedSteps: [
          'Enter the amount you want to invest at once.',
          'Enter the expected annual return.',
          'Select the investment period in years.',
          'Read the estimated returns and final value.',
        ],
      },
      {
        heading: 'Lumpsum formula',
        paragraphs: [
          'Here A is the maturity value, P is the amount invested, r is the annual rate of return as a decimal and t is the time in years.',
        ],
        formula: 'A = P × (1 + r)^t',
      },
      {
        heading: 'Lumpsum example',
        paragraphs: [
          'A one-time investment of ₹1,00,000 at 12% expected annual return for 10 years grows to about ₹3.11 lakh. The estimated gain is about ₹2.11 lakh.',
        ],
      },
      {
        heading: 'Lumpsum vs SIP',
        bullets: [
          'A lumpsum puts all your money to work on day one. It suits you when you receive a bonus or a large amount.',
          'A SIP spreads purchases over time and reduces the risk of buying at a market peak.',
          'Many investors use both: a lumpsum for a windfall and a SIP for regular income.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How do I calculate lumpsum returns?',
        answer:
          'Multiply the invested amount by (1 + annual return) raised to the number of years. The calculator does this instantly.',
      },
      {
        question: 'Is lumpsum better than SIP?',
        answer:
          'Neither is always better. A lumpsum can earn more in a steadily rising market. A SIP is easier on cash flow and reduces timing risk.',
      },
      {
        question: 'What return should I enter?',
        answer:
          'There is no fixed return in equity funds. Use a realistic long-term figure, and try a lower one to see a cautious case.',
      },
      {
        question: 'Does the calculator include tax and expense ratio?',
        answer:
          'No. The result is before tax and assumes the return you enter is after fund costs.',
      },
    ],
    relatedSlugs: [
      'sip-calculator',
      'step-up-sip-calculator',
      'compound-interest-calculator',
      'fd-vs-mutual-fund-calculator',
    ],
  },
  {
    slug: 'swp-calculator',
    name: 'SWP Calculator',
    shortTitle: 'SWP Calculator',
    h1Title: 'SWP Calculator: Plan Monthly Income from Your Mutual Fund',
    category: 'Loans & Planning',
    description:
      'Free SWP calculator. Enter your corpus, monthly withdrawal, expected return and years to see how long your money lasts and the balance left.',
    seoTitle: 'SWP Calculator – Monthly Withdrawal Plan | The Stock Times',
    seoDescription:
      'Free SWP calculator. Enter your corpus, monthly withdrawal, expected return and years to see how long your money lasts and the balance left.',
    schemaName: 'SWP Calculator',
    schemaDescription:
      'Free SWP calculator to plan monthly withdrawals and see the balance left in your mutual fund.',
    disclaimer: CALCULATOR_DISCLAIMER,
    formulaTitle: 'How the SWP calculation works',
    formulaText: 'Balance after n months = P × (1 + i)^n − W × [((1 + i)^n − 1) / i]',
    howItWorks: [],
    bodySections: [
      {
        heading: 'What is a SWP calculator?',
        paragraphs: [
          'A Systematic Withdrawal Plan (SWP) lets you take a fixed amount from your mutual fund every month while the rest stays invested. The SWP calculator shows how the balance changes over time, how much you withdraw in total and how long your corpus can last.',
        ],
      },
      {
        heading: 'How to use the SWP calculator',
        orderedSteps: [
          'Enter your total investment (corpus).',
          'Enter the monthly amount you want to withdraw.',
          'Enter the expected annual return and the number of years.',
          'Read the total withdrawals and the balance left at the end.',
        ],
      },
      {
        heading: 'How the SWP calculation works',
        paragraphs: [
          'Each month the balance earns the monthly return and then the withdrawal is deducted:',
          'Here P is the starting corpus, W is the monthly withdrawal, i is the monthly return (annual rate ÷ 12) and n is the number of months.',
        ],
        formula: 'Balance after n months = P × (1 + i)^n − W × [((1 + i)^n − 1) / i]',
      },
      {
        heading: 'SWP example',
        paragraphs: [
          'A corpus of ₹10,00,000 with a withdrawal of ₹8,000 a month at 8% expected annual return for 10 years gives total withdrawals of ₹9.6 lakh. The balance left is about ₹7.6 lakh.',
        ],
      },
      {
        heading: 'Who should use an SWP?',
        bullets: [
          'Retirees who want a regular income from their savings.',
          'Investors who want a monthly payout without selling the whole fund.',
          'Anyone planning a gap-year or career-break budget.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between SWP and SIP?',
        answer:
          'A SIP adds money to a fund every month. An SWP takes money out of a fund every month.',
      },
      {
        question: 'How much can I withdraw safely in an SWP?',
        answer:
          "If the withdrawal is higher than the fund's return, the corpus falls. Try different amounts in the calculator to see when the money runs out.",
      },
      {
        question: 'Is SWP income taxable?',
        answer:
          'Each withdrawal is a redemption, so the gain part can attract capital gains tax. The rate depends on the fund type and holding period.',
      },
      {
        question: 'Is the SWP result guaranteed?',
        answer:
          'No. Returns change with the market, so the balance can be higher or lower than the estimate.',
      },
    ],
    relatedSlugs: [
      'sip-calculator',
      'lumpsum-calculator',
      'retirement-calculator',
      'fd-vs-mutual-fund-calculator',
    ],
  },
  {
    slug: 'emi-calculator',
    name: 'EMI Calculator',
    shortTitle: 'EMI Calculator',
    h1Title: 'EMI Calculator: Calculate Your Monthly Loan EMI',
    category: 'Loans & Planning',
    description:
      'Free EMI calculator for home, car and personal loans. Enter loan amount, interest rate and tenure to see your monthly EMI, total interest and total payment.',
    seoTitle: 'EMI Calculator – Home, Car & Personal Loan EMI | The Stock Times',
    seoDescription:
      'Free EMI calculator for home, car and personal loans. Enter loan amount, interest rate and tenure to see your monthly EMI, total interest and total payment.',
    schemaName: 'EMI Calculator',
    schemaDescription: 'Free EMI calculator for home, car and personal loans.',
    disclaimer: CALCULATOR_DISCLAIMER,
    formulaTitle: 'EMI formula',
    formulaText: 'EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)',
    howItWorks: [],
    bodySections: [
      {
        heading: 'What is an EMI calculator?',
        paragraphs: [
          'An EMI (Equated Monthly Instalment) calculator shows the fixed amount you pay each month to repay a loan. You enter the loan amount, the annual interest rate and the tenure. The tool shows your EMI, the total interest and the total amount payable.',
        ],
      },
      {
        heading: 'How to use the EMI calculator',
        orderedSteps: [
          'Enter the loan amount.',
          'Enter the annual interest rate.',
          'Enter the tenure in years or months.',
          'Read the monthly EMI, total interest and total payment.',
        ],
      },
      {
        heading: 'EMI formula',
        paragraphs: [
          'Here P is the loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100) and n is the number of monthly instalments.',
        ],
        formula: 'EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)',
      },
      {
        heading: 'EMI example',
        paragraphs: [
          'A home loan of ₹50,00,000 at 8.5% for 20 years has an EMI of about ₹43,391. You pay about ₹1.04 crore in total, of which about ₹54.1 lakh is interest.',
        ],
      },
      {
        heading: 'How to reduce your EMI',
        bullets: [
          'Choose a longer tenure. The EMI falls, but the total interest rises.',
          'Make a bigger down payment to reduce the loan amount.',
          'Compare lenders and negotiate a lower interest rate.',
          'Part-prepay the loan when you have extra money.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How is EMI calculated?',
        answer:
          'EMI is calculated from the loan amount, the monthly interest rate and the number of instalments using the standard EMI formula. The calculator does this for you.',
      },
      {
        question: 'Does a longer tenure lower the EMI?',
        answer:
          'Yes, a longer tenure gives a lower EMI. But you pay interest for more months, so the total interest is higher.',
      },
      {
        question: 'Does the EMI change if the interest rate changes?',
        answer:
          'On a floating rate loan, the lender can change the rate. This can change your EMI or your tenure. Check with your lender.',
      },
      {
        question: 'Does the calculator include processing fees?',
        answer:
          'No. The result covers principal and interest only. Fees and charges are extra.',
      },
    ],
    relatedSlugs: [
      'retirement-calculator',
      'compound-interest-calculator',
      'fd-vs-mutual-fund-calculator',
      'sip-calculator',
    ],
  },
  {
    slug: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    shortTitle: 'Compound Interest',
    h1Title: 'Compound Interest Calculator: See How Your Money Grows',
    category: 'Investing',
    description:
      'Free compound interest calculator. Enter principal, rate, time and compounding frequency to see your final amount and total interest earned.',
    seoTitle: 'Compound Interest Calculator – Daily to Yearly | The Stock Times',
    seoDescription:
      'Free compound interest calculator. Enter principal, rate, time and compounding frequency to see your final amount and total interest earned.',
    schemaName: 'Compound Interest Calculator',
    schemaDescription:
      'Free compound interest calculator to find the final amount and interest earned.',
    disclaimer: CALCULATOR_DISCLAIMER,
    formulaTitle: 'Compound interest formula',
    formulaText: 'A = P × (1 + r/n)^(n × t)',
    howItWorks: [],
    bodySections: [
      {
        heading: 'What is compound interest?',
        paragraphs: [
          'Compound interest is interest earned on both your original amount and on the interest already added. Over time this "interest on interest" makes your money grow faster than simple interest. The calculator shows the final amount and the total interest for any period.',
        ],
      },
      {
        heading: 'How to use the compound interest calculator',
        orderedSteps: [
          'Enter the principal amount.',
          'Enter the annual interest rate.',
          'Enter the time period in years.',
          'Select how often the interest compounds (yearly, half-yearly, quarterly or monthly).',
          'Read the final amount and the interest earned.',
        ],
      },
      {
        heading: 'Compound interest formula',
        paragraphs: [
          'Here A is the final amount, P is the principal, r is the annual rate as a decimal, n is the number of times interest compounds per year and t is the time in years.',
        ],
        formula: 'A = P × (1 + r/n)^(n × t)',
      },
      {
        heading: 'Compound interest example',
        paragraphs: [
          '₹1,00,000 invested at 8% a year, compounded yearly for 10 years, grows to about ₹2.16 lakh. The interest earned is about ₹1.16 lakh. Simple interest on the same amount would give only ₹80,000.',
        ],
      },
      {
        heading: 'Compound interest vs simple interest',
        bullets: [
          'Simple interest is calculated on the principal only.',
          'Compound interest is calculated on the principal plus earlier interest.',
          'The longer the period, the bigger the difference between the two.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How is compound interest calculated?',
        answer:
          'Multiply the principal by (1 + rate ÷ number of compounding periods) raised to the total number of periods. Subtract the principal to get the interest.',
      },
      {
        question: 'Which compounding frequency gives the highest return?',
        answer:
          'The more often interest compounds, the higher the final amount. Monthly compounding gives slightly more than yearly at the same rate.',
      },
      {
        question: 'What is the Rule of 72?',
        answer:
          'Divide 72 by the annual rate to estimate how many years it takes to double your money. At 8%, it takes about 9 years.',
      },
      {
        question: 'Is compound interest the same as CAGR?',
        answer:
          'No. Compound interest is how interest is added. CAGR is the average yearly growth rate of an investment over a period.',
      },
    ],
    relatedSlugs: [
      'lumpsum-calculator',
      'sip-calculator',
      'fd-vs-mutual-fund-calculator',
      'retirement-calculator',
    ],
  },
  {
    slug: 'stock-average-calculator',
    name: 'Stock Average Calculator',
    shortTitle: 'Stock Average Calculator',
    h1Title: 'Stock Average Calculator: Find Your Average Buy Price',
    category: 'Trading',
    description:
      'Free stock average calculator. Add your buys at different prices to find your new average price per share and the total cost of your holding.',
    seoTitle: 'Stock Average Calculator – Average Buy Price | The Stock Times',
    seoDescription:
      'Free stock average calculator. Add your buys at different prices to find your new average price per share and the total cost of your holding.',
    schemaName: 'Stock Average Calculator',
    schemaDescription:
      'Free stock average calculator to find your average buy price across multiple purchases.',
    disclaimer: CALCULATOR_DISCLAIMER,
    formulaTitle: 'Average price formula',
    formulaText: 'Average price = Total amount invested ÷ Total number of shares',
    howItWorks: [],
    bodySections: [
      {
        heading: 'What is a stock average calculator?',
        paragraphs: [
          'A stock average calculator finds the average price per share when you buy the same stock at different prices. It is useful when you buy more shares after a price fall (averaging down) or after a rise (averaging up). The tool shows your new average price and total investment.',
        ],
      },
      {
        heading: 'How to use the stock average calculator',
        orderedSteps: [
          'Enter the number of shares and the price of your first purchase.',
          'Add the shares and price of each extra purchase.',
          'Read the new average price, total shares and total cost.',
        ],
      },
      {
        heading: 'Average price formula',
        formula: 'Average price = Total amount invested ÷ Total number of shares',
      },
      {
        heading: 'Stock averaging example',
        paragraphs: [
          'You buy 100 shares at ₹500 and later buy 100 more at ₹400. Total invested is ₹90,000 for 200 shares, so your average price is ₹450 per share. The stock now needs to trade above ₹450 for you to be in profit, before charges.',
        ],
      },
      {
        heading: 'Things to remember before averaging down',
        bullets: [
          'Average down only in a company whose business you still trust.',
          'A falling price can keep falling. Do not put in more money than you can afford to lose.',
          'Do not let one stock become too large a part of your portfolio.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How do I calculate the average price of a stock?',
        answer:
          'Divide the total money spent by the total number of shares bought. The calculator does this when you add each purchase.',
      },
      {
        question: 'What is averaging down?',
        answer:
          'Averaging down means buying more shares at a lower price to reduce your average cost per share.',
      },
      {
        question: 'Does averaging down always work?',
        answer:
          'No. It lowers your average price, but it does not stop losses if the stock keeps falling. It also increases your exposure to one stock.',
      },
      {
        question: 'Does the calculator include brokerage and taxes?',
        answer:
          'No. The average is based on the price and quantity you enter. Add charges separately if you want your exact break-even.',
      },
    ],
    relatedSlugs: [
      'brokerage-calculator',
      'compare-stocks',
      'dividend-calculator',
      'mutual-fund-vs-stock-comparison',
    ],
  },
  {
    slug: 'dividend-calculator',
    name: 'Dividend Calculator',
    shortTitle: 'Dividend Calculator',
    h1Title: 'Dividend Calculator: Calculate Dividend Income and Yield',
    category: 'Investing',
    description:
      'Free dividend calculator. Enter shares, dividend per share and price to see your dividend income and dividend yield. Plan your passive income.',
    seoTitle: 'Dividend Calculator – Income & Yield | The Stock Times',
    seoDescription:
      'Free dividend calculator. Enter shares, dividend per share and price to see your dividend income and dividend yield. Plan your passive income.',
    schemaName: 'Dividend Calculator',
    schemaDescription:
      'Free dividend calculator to find dividend income and dividend yield.',
    disclaimer: CALCULATOR_DISCLAIMER,
    formulaTitle: 'Dividend formulas',
    formulaText:
      'Dividend income = Number of shares × Dividend per share | Dividend yield (%) = (Annual dividend per share ÷ Share price) × 100',
    howItWorks: [],
    bodySections: [
      {
        heading: 'What is a dividend calculator?',
        paragraphs: [
          'A dividend calculator estimates the income you earn from the dividends of a stock. You enter the number of shares, the dividend per share and the share price. The tool shows your total dividend income and the dividend yield.',
        ],
      },
      {
        heading: 'How to use the dividend calculator',
        orderedSteps: [
          'Enter the number of shares you own.',
          'Enter the dividend per share you expect in a year.',
          'Enter the current share price to see the yield.',
          'Read the annual dividend income and the dividend yield.',
        ],
      },
      {
        heading: 'Dividend formulas',
        formula:
          'Dividend income = Number of shares × Dividend per share\nDividend yield (%) = (Annual dividend per share ÷ Share price) × 100',
      },
      {
        heading: 'Dividend example',
        paragraphs: [
          'You own 500 shares and the company pays ₹10 per share in a year. Your dividend income is ₹5,000. If the share price is ₹250, the dividend yield is 4%.',
        ],
      },
      {
        heading: 'What to check in a dividend stock',
        bullets: [
          'Dividend yield alone is not enough. A very high yield can mean the share price has fallen.',
          'Look at the payout ratio and at how steady the dividends have been.',
          "Check the company's profit and debt, since dividends come from profits.",
        ],
      },
    ],
    faqs: [
      {
        question: 'How is dividend yield calculated?',
        answer:
          'Divide the annual dividend per share by the current share price and multiply by 100.',
      },
      {
        question: 'Is dividend income taxable in India?',
        answer:
          'Dividend income is added to your income and taxed at your slab rate. TDS may apply above a limit. Check the current rules or ask a tax professional.',
      },
      {
        question: 'What is a good dividend yield?',
        answer:
          'There is no single good number. Compare the yield with similar companies and with interest rates on fixed deposits.',
      },
      {
        question: 'Are dividends guaranteed?',
        answer: 'No. A company can cut or stop its dividend at any time.',
      },
    ],
    relatedSlugs: [
      'stock-average-calculator',
      'compare-stocks',
      'mutual-fund-vs-stock-comparison',
      'compound-interest-calculator',
    ],
  },
  {
    slug: 'retirement-calculator',
    name: 'Retirement Calculator',
    shortTitle: 'Retirement Calculator',
    h1Title: 'Retirement Calculator: Plan the Corpus You Need',
    category: 'Loans & Planning',
    description:
      'Free retirement calculator. Enter your age, expenses, inflation and returns to estimate the corpus you need and the monthly SIP to reach it.',
    seoTitle: 'Retirement Calculator – How Much Corpus Do You Need? | The Stock Times',
    seoDescription:
      'Free retirement calculator. Enter your age, expenses, inflation and returns to estimate the corpus you need and the monthly SIP to reach it.',
    schemaName: 'Retirement Calculator',
    schemaDescription:
      'Free retirement calculator to estimate the corpus you need and the monthly investment to reach it.',
    disclaimer: CALCULATOR_DISCLAIMER,
    formulaTitle: 'How the retirement corpus is calculated',
    formulaText:
      'Expense at retirement = Current expense × (1 + inflation)^years | Corpus = Yearly expense at retirement ÷ Withdrawal rate',
    howItWorks: [],
    bodySections: [
      {
        heading: 'What is a retirement calculator?',
        paragraphs: [
          'A retirement calculator estimates how much money you need to stop working and still meet your monthly expenses. It uses your current age, retirement age, current expenses, expected inflation and expected investment return. It then shows the corpus you need and the monthly investment to build it.',
        ],
      },
      {
        heading: 'How to use the retirement calculator',
        orderedSteps: [
          'Enter your current age and the age you want to retire.',
          'Enter your current monthly expenses.',
          'Enter the expected inflation rate and the return on your investments.',
          'Read the corpus you need and the monthly investment required.',
        ],
      },
      {
        heading: 'How the retirement corpus is calculated',
        paragraphs: [
          'First your expenses are increased for inflation up to the retirement year, then the corpus is estimated from the yearly expense and a safe withdrawal rate:',
        ],
        formula:
          'Expense at retirement = Current expense × (1 + inflation)^years\nCorpus = Yearly expense at retirement ÷ Withdrawal rate',
      },
      {
        heading: 'Retirement planning example',
        paragraphs: [
          'You are 30 and plan to retire at 60. Your monthly expense is ₹50,000 today and inflation is 6%. After 30 years the same lifestyle costs about ₹2.87 lakh a month, or about ₹34.5 lakh a year. With a 4% withdrawal rate, the corpus needed is about ₹8.6 crore.',
        ],
      },
      {
        heading: 'Tips to build a retirement corpus',
        bullets: [
          'Start early. Time and compounding do most of the work.',
          'Raise your SIP every year with a step-up.',
          'Review your plan every year and adjust for inflation and returns.',
          'Keep an emergency fund separate from your retirement money.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How much money do I need to retire?',
        answer:
          'It depends on your expenses, inflation, retirement age and how long you expect to live. The calculator estimates a corpus from your own numbers.',
      },
      {
        question: 'What inflation rate should I use?',
        answer:
          'Many planners use 5% to 7% for India. A higher number gives a more cautious plan.',
      },
      {
        question: 'What is a safe withdrawal rate?',
        answer:
          'It is the share of your corpus you take out each year. A lower rate such as 3% to 4% makes your money last longer.',
      },
      {
        question: 'Is the result financial advice?',
        answer:
          'No. It is an estimate based on your inputs. Speak to a qualified financial planner for a full plan.',
      },
    ],
    relatedSlugs: [
      'sip-calculator',
      'step-up-sip-calculator',
      'swp-calculator',
      'compound-interest-calculator',
    ],
  },
  {
    slug: 'fd-vs-mutual-fund-calculator',
    name: 'FD vs Mutual Fund Calculator',
    shortTitle: 'FD vs Mutual Fund',
    h1Title: 'FD vs Mutual Fund Calculator: Which Gives Better Returns?',
    category: 'Investing',
    description:
      'Compare a fixed deposit with a mutual fund. Enter amount, FD rate, expected fund return and years to see the estimated value of each side by side.',
    seoTitle: 'FD vs Mutual Fund Calculator – Compare Returns | The Stock Times',
    seoDescription:
      'Compare a fixed deposit with a mutual fund. Enter amount, FD rate, expected fund return and years to see the estimated value of each side by side.',
    schemaName: 'FD vs Mutual Fund Calculator',
    schemaDescription:
      'Free calculator to compare the estimated returns of a fixed deposit and a mutual fund.',
    disclaimer: CALCULATOR_DISCLAIMER,
    formulaTitle: 'FD vs Mutual Fund Comparison',
    formulaText: 'A = P × (1 + r)^t',
    howItWorks: [],
    bodySections: [
      {
        heading: 'What does the FD vs mutual fund calculator do?',
        paragraphs: [
          'This calculator compares the estimated maturity value of a fixed deposit (FD) and a mutual fund for the same amount and period. You enter the investment, the FD interest rate and the return you expect from the fund. The tool shows both results next to each other.',
        ],
      },
      {
        heading: 'How to use the calculator',
        orderedSteps: [
          'Enter the amount you want to invest.',
          'Enter the FD interest rate and the expected mutual fund return.',
          'Select the investment period in years.',
          'Compare the maturity values and the difference.',
        ],
      },
      {
        heading: 'Example comparison',
        paragraphs: [
          'A one-time investment of ₹5,00,000 for 5 years. An FD at 7% a year grows to about ₹7.01 lakh. A mutual fund with an assumed 12% a year grows to about ₹8.81 lakh. The fund return is an assumption and can be lower or even negative.',
        ],
      },
      {
        heading: 'FD vs mutual fund: key differences',
        table: {
          headers: ['Point', 'Fixed deposit', 'Mutual fund'],
          rows: [
            ['Return', 'Fixed at the time of investing', 'Changes with the market'],
            ['Risk', 'Low', 'Low to high, depends on the fund'],
            [
              'Liquidity',
              'Early exit may carry a penalty',
              'Can be redeemed on any business day (some funds have exit loads)',
            ],
            [
              'Tax',
              'Interest is taxed at your slab rate',
              'Depends on the fund type and holding period',
            ],
          ],
        },
      },
      {
        heading: 'Which one should you choose?',
        paragraphs: [
          'FDs suit short-term goals and money you cannot afford to lose. Equity mutual funds suit long-term goals where you can handle ups and downs. Many people hold both.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is a mutual fund better than an FD?',
        answer:
          'A mutual fund can give higher returns over the long term, but the return is not guaranteed. An FD gives a fixed return with low risk.',
      },
      {
        question: 'Are FD returns guaranteed?',
        answer:
          'The interest rate is fixed when you invest. Safety also depends on the bank or institution. Check deposit insurance limits.',
      },
      {
        question: 'What return should I enter for a mutual fund?',
        answer:
          'Use a cautious long-term figure and test a lower case too. Past returns do not guarantee future returns.',
      },
      {
        question: 'Does the calculator include tax?',
        answer:
          'No. Both results are before tax. Tax rules differ for FD interest and mutual fund gains.',
      },
    ],
    relatedSlugs: [
      'lumpsum-calculator',
      'sip-calculator',
      'compound-interest-calculator',
      'mutual-fund-vs-stock-comparison',
    ],
  },
  {
    slug: 'mutual-fund-vs-stock-comparison',
    name: 'Mutual Fund vs Stocks Calculator',
    shortTitle: 'MF vs Stocks',
    h1Title: 'Mutual Funds vs Stocks: Compare Estimated Returns',
    category: 'Investing',
    description:
      'Compare mutual fund and direct stock investing. Enter your monthly amount, expected returns and years to see the estimated value of each option.',
    seoTitle: 'Mutual Fund vs Stocks Calculator – Compare Returns | The Stock Times',
    seoDescription:
      'Compare mutual fund and direct stock investing. Enter your monthly amount, expected returns and years to see the estimated value of each option.',
    schemaName: 'Mutual Fund vs Stocks Calculator',
    schemaDescription:
      'Free tool to compare the estimated returns of mutual funds and direct stocks.',
    disclaimer: CALCULATOR_DISCLAIMER,
    formulaTitle: 'Mutual Fund vs Stocks Return Comparison',
    formulaText: 'FV = P × [((1 + i)^n − 1) / i] × (1 + i)',
    howItWorks: [],
    bodySections: [
      {
        heading: 'What does this comparison tool do?',
        paragraphs: [
          'This tool compares the estimated value of investing the same amount in a mutual fund and in direct stocks. You enter the monthly investment, the return you expect from each and the time period. It shows both results side by side so you can see how a small change in return affects your corpus.',
        ],
      },
      {
        heading: 'How to use the tool',
        orderedSteps: [
          'Enter the monthly (or one-time) amount.',
          'Enter the expected return for the mutual fund and for your stock portfolio.',
          'Select the investment period.',
          'Compare the final values and the gap between them.',
        ],
      },
      {
        heading: 'Example comparison',
        paragraphs: [
          'A SIP of ₹10,000 a month for 10 years. At an assumed 12% return a mutual fund grows to about ₹23.2 lakh. At an assumed 15% return a stock portfolio grows to about ₹27.9 lakh. These are examples only. A stock portfolio can earn less than a mutual fund, and it carries more risk if it is not well spread.',
        ],
      },
      {
        heading: 'Mutual funds vs stocks: key differences',
        table: {
          headers: ['Point', 'Mutual fund', 'Direct stocks'],
          rows: [
            ['Management', 'A fund manager picks and tracks the stocks', 'You pick and track the stocks'],
            ['Diversification', 'Built in across many companies', 'Depends on how many stocks you hold'],
            ['Cost', 'Fund expense ratio', 'Brokerage and other charges'],
            ['Time needed', 'Low', 'High, you must research and review'],
            ['Risk', 'Spread across holdings', 'Higher if the portfolio is concentrated'],
          ],
        },
      },
      {
        heading: 'Which one is right for you?',
        paragraphs: [
          'If you do not have time to research companies, mutual funds are the simpler route. If you understand businesses and can handle larger swings, you can add some direct stocks. Many investors use a mix of both.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do stocks give higher returns than mutual funds?',
        answer:
          'Not always. Stocks can give higher or lower returns than a mutual fund. The result depends on the stocks you pick and when you buy and sell.',
      },
      {
        question: 'Which is safer, mutual funds or stocks?',
        answer:
          'Mutual funds spread money across many companies, so they are usually less risky than a few individual stocks. Risk still depends on the type of fund.',
      },
      {
        question: 'Can a beginner invest directly in stocks?',
        answer:
          'Yes, but it takes research and discipline. Many beginners start with mutual funds and add stocks as they learn.',
      },
      {
        question: 'Does the tool include costs and tax?',
        answer:
          'No. The results are before fees, brokerage and tax. Include these costs when you estimate your return.',
      },
    ],
    relatedSlugs: [
      'sip-calculator',
      'compare-mutual-funds',
      'compare-stocks',
      'fd-vs-mutual-fund-calculator',
    ],
  },
  {
    slug: 'compare-mutual-funds',
    name: 'Compare Mutual Funds',
    shortTitle: 'Compare Mutual Funds',
    h1Title: 'Compare Mutual Funds Side by Side',
    category: 'Investing',
    description:
      'Compare mutual funds side by side. Check returns, expense ratio, risk and fund size, and see how each fund could grow your SIP or lumpsum.',
    seoTitle: 'Compare Mutual Funds – Returns, Risk & Expense Ratio | The Stock Times',
    seoDescription:
      'Compare mutual funds side by side. Check returns, expense ratio, risk and fund size, and see how each fund could grow your SIP or lumpsum.',
    schemaName: 'Compare Mutual Funds',
    schemaDescription:
      'Free tool to compare mutual funds on returns, expense ratio and risk.',
    disclaimer: CALCULATOR_DISCLAIMER,
    formulaTitle: 'Expense Ratio & Compounding Difference',
    formulaText: 'Net Return = Expected Return − Total Expense Ratio (TER)',
    howItWorks: [],
    bodySections: [
      {
        heading: 'How to compare mutual funds',
        paragraphs: [
          "Pick two or more funds and compare them on the same points: returns over the same periods, expense ratio, risk, fund size and the fund manager's track record. Comparing funds of the same category, such as two large cap funds, gives a fair result.",
        ],
      },
      {
        heading: 'How to use the comparison tool',
        orderedSteps: [
          'Select the funds you want to compare.',
          'Choose the period, such as 1, 3 or 5 years.',
          'Review the returns, expense ratio and risk side by side.',
          'Enter an amount to see how each fund could have grown your investment.',
        ],
      },
      {
        heading: 'What to look at when comparing funds',
        table: {
          headers: ['Point', 'Why it matters'],
          rows: [
            ['Returns over 3, 5 and 10 years', 'Shows consistency, not just one good year'],
            ['Expense ratio', 'A lower cost leaves more return for you'],
            ['Risk (volatility, drawdown)', 'Shows how much the fund fell in bad markets'],
            ['Fund size (AUM)', 'Very small or very large funds can have limits'],
            ['Benchmark comparison', 'Shows whether the fund beat its index'],
          ],
        },
      },
      {
        heading: 'Common mistakes',
        bullets: [
          "Choosing a fund only because of last year's return.",
          'Comparing funds from different categories.',
          'Ignoring the expense ratio and exit load.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How do I choose between two mutual funds?',
        answer:
          'Compare funds of the same category on long-term returns, expense ratio, risk and consistency against the benchmark.',
      },
      {
        question: 'Are past returns a guide for the future?',
        answer:
          'Past returns show how a fund behaved. They do not guarantee future returns.',
      },
      {
        question: 'What is an expense ratio?',
        answer:
          'It is the yearly fee a fund charges, shown as a percentage of your investment. A lower ratio means lower costs for you.',
      },
      {
        question: 'Which period is best for comparing funds?',
        answer:
          'Look at 3, 5 and 10 years if the fund is old enough. Longer periods show how the fund handled different market cycles.',
      },
    ],
    relatedSlugs: [
      'sip-calculator',
      'lumpsum-calculator',
      'mutual-fund-vs-stock-comparison',
      'fd-vs-mutual-fund-calculator',
    ],
  },
  {
    slug: 'compare-stocks',
    name: 'Stock Comparison Tool',
    shortTitle: 'Stock Comparison Tool',
    h1Title: 'Compare Stocks Side by Side',
    category: 'Trading',
    description:
      'Compare two or more stocks side by side. Check price, P/E ratio, market cap, dividend yield and returns to understand which stock fits your goals.',
    seoTitle: 'Compare Stocks – Side-by-Side Stock Comparison | The Stock Times',
    seoDescription:
      'Compare two or more stocks side by side. Check price, P/E ratio, market cap, dividend yield and returns to understand which stock fits your goals.',
    schemaName: 'Stock Comparison Tool',
    schemaDescription:
      'Free tool to compare stocks side by side on price, P/E ratio, market cap and returns.',
    disclaimer: CALCULATOR_DISCLAIMER,
    formulaTitle: 'Graham Intrinsic Value Formula',
    formulaText: 'Graham Value = √(22.5 × EPS × Book Value per Share)',
    howItWorks: [],
    bodySections: [
      {
        heading: 'What is a stock comparison tool?',
        paragraphs: [
          'A stock comparison tool puts the key numbers of two or more companies next to each other. This helps you judge price, valuation, size, dividends and past performance in one view. It works best when you compare companies from the same sector.',
        ],
      },
      {
        heading: 'How to use the stock comparison tool',
        orderedSteps: [
          'Select the stocks you want to compare.',
          'Review the price, market cap, P/E ratio, dividend yield and returns.',
          'Compare the numbers against the sector average.',
          'Use the result as one input for your own research.',
        ],
      },
      {
        heading: 'Key numbers to compare',
        table: {
          headers: ['Metric', 'What it tells you'],
          rows: [
            ['Market cap', 'The size of the company'],
            ['P/E ratio', 'How much investors pay for each ₹1 of profit'],
            ['Dividend yield', 'Yearly dividend as a percentage of the share price'],
            ['Return over 1, 3 and 5 years', 'How the stock has performed in the past'],
            ['Debt to equity', 'How much the company depends on borrowed money'],
          ],
        },
      },
      {
        heading: 'Tips for comparing stocks',
        bullets: [
          'Compare companies in the same sector. A bank and an IT company are not like for like.',
          'A low P/E is not always cheap and a high P/E is not always costly. Look at growth and quality too.',
          'Read the latest results and company announcements before deciding.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How do I compare two stocks?',
        answer:
          'Compare them on market cap, P/E ratio, dividend yield, debt and long-term returns. Choose stocks from the same sector for a fair view.',
      },
      {
        question: 'What is a good P/E ratio?',
        answer:
          "There is no single good number. Compare the P/E with the sector average and with the company's own history.",
      },
      {
        question: 'Does the tool tell me which stock to buy?',
        answer:
          'No. It shows data side by side. The decision is yours, and you should do your own research or speak to an advisor.',
      },
    ],
    relatedSlugs: [
      'stock-average-calculator',
      'dividend-calculator',
      'mutual-fund-vs-stock-comparison',
      'brokerage-calculator',
    ],
  },
  {
    slug: 'ipo-allotment-calculator',
    name: 'IPO Allotment Probability Calculator',
    shortTitle: 'IPO Allotment Probability',
    h1Title: 'IPO Allotment Probability Calculator',
    category: 'Trading',
    description:
      'Estimate your chance of getting IPO shares. Enter the lots reserved for retail and the number of applications to see your approximate allotment probability.',
    seoTitle: 'IPO Allotment Probability Calculator | The Stock Times',
    seoDescription:
      'Estimate your chance of getting IPO shares. Enter the lots reserved for retail and the number of applications to see your approximate allotment probability.',
    schemaName: 'IPO Allotment Probability Calculator',
    schemaDescription: 'Free calculator to estimate your chance of getting IPO shares.',
    disclaimer: CALCULATOR_DISCLAIMER,
    formulaTitle: 'Allotment probability formula',
    formulaText: 'Probability (%) = (Lots reserved for retail ÷ Valid retail applications) × 100',
    howItWorks: [],
    bodySections: [
      {
        heading: 'What is the IPO allotment probability calculator?',
        paragraphs: [
          'When an IPO is oversubscribed, shares are given by lottery. This calculator estimates your chance of getting at least one lot in the retail category. You enter the number of lots reserved for retail investors and the number of valid applications. The tool shows an approximate probability.',
        ],
      },
      {
        heading: 'How to use the calculator',
        orderedSteps: [
          'Find the number of lots reserved for retail investors in the IPO details.',
          'Enter the number of valid retail applications (or the retail subscription figure).',
          'Read the approximate chance of allotment.',
        ],
      },
      {
        heading: 'Allotment probability formula',
        paragraphs: [
          'If the number of applications is lower than the lots, every valid applicant can get a lot, so the probability is 100%.',
        ],
        formula: 'Probability (%) = (Lots reserved for retail ÷ Valid retail applications) × 100',
      },
      {
        heading: 'Example',
        paragraphs: [
          'An IPO reserves 50,000 lots for retail investors and receives 5,00,000 valid applications. The chance of getting one lot is 50,000 ÷ 5,00,000 × 100 = 10%. That is the same as a retail subscription of about 10 times.',
        ],
      },
      {
        heading: 'Things to know before you apply',
        bullets: [
          'This is a rough estimate. The final allotment is decided by a computer-based lottery.',
          'Each person can apply once per PAN in the retail category.',
          'A high grey market premium (GMP) is not a guarantee of listing gains.',
          'Apply only if you like the business and can accept a loss on listing.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How can I improve my chance of IPO allotment?',
        answer:
          "There is no sure way. Allotment is by lottery, and each valid PAN gets one application. Applying separately from each family member's own demat account gives each person an independent chance.",
      },
      {
        question: 'What is IPO subscription?',
        answer:
          'Subscription shows how many times the shares on offer have been applied for. A 10 times subscription means ten shares were applied for each share on offer.',
      },
      {
        question: 'Where can I check my allotment status?',
        answer:
          "Check the IPO registrar's website, BSE or NSE after the allotment date. Always use the official links.",
      },
      {
        question: 'Does the calculator guarantee allotment?',
        answer:
          'No. It gives an estimate based on the numbers you enter. The real result depends on the lottery.',
      },
    ],
    relatedSlugs: [
      'brokerage-calculator',
      'stock-average-calculator',
      'compare-stocks',
      'lumpsum-calculator',
    ],
    showRelatedIpoArticles: true,
  },
  {
    slug: 'brokerage-calculator',
    name: 'Brokerage Calculator',
    shortTitle: 'Brokerage Calculator',
    h1Title: 'Brokerage Calculator: Calculate Trading Charges and Net Profit',
    category: 'Trading',
    description:
      'Free brokerage calculator. Enter buy price, sell price and quantity to see brokerage, taxes and charges, your break-even price and net profit.',
    seoTitle: 'Brokerage Calculator – Trading Charges & Net Profit | The Stock Times',
    seoDescription:
      'Free brokerage calculator. Enter buy price, sell price and quantity to see brokerage, taxes and charges, your break-even price and net profit.',
    schemaName: 'Brokerage Calculator',
    schemaDescription:
      'Free brokerage calculator to find trading charges, break-even price and net profit.',
    disclaimer: CALCULATOR_DISCLAIMER,
    formulaTitle: 'Net profit formula',
    formulaText: 'Net profit = (Sell price − Buy price) × Quantity − Total charges',
    howItWorks: [],
    bodySections: [
      {
        heading: 'What is a brokerage calculator?',
        paragraphs: [
          'A brokerage calculator shows the total cost of a trade, including brokerage and other charges. You enter the buy price, sell price and quantity. The tool shows the charges, the break-even price and your net profit or loss.',
        ],
      },
      {
        heading: 'How to use the brokerage calculator',
        orderedSteps: [
          'Select the segment (delivery, intraday, futures or options).',
          'Enter the buy price, sell price and quantity.',
          "Enter your broker's brokerage rate.",
          'Read the total charges, break-even point and net profit or loss.',
        ],
      },
      {
        heading: 'Charges included in a trade',
        table: {
          headers: ['Charge', 'What it is'],
          rows: [
            ['Brokerage', 'Fee charged by your broker'],
            ['STT', 'Securities Transaction Tax charged by the government'],
            ['Exchange transaction charges', 'Fee charged by NSE or BSE'],
            ['GST', 'Tax charged on brokerage and some other fees'],
            ['SEBI charges', 'Small regulatory fee on turnover'],
            ['Stamp duty', 'Charged on the buy side'],
            ['DP charges', 'Fee charged on selling shares from your demat account'],
          ],
        },
        paragraphs: [
          'Rates change from time to time and differ by segment and broker. Always check the latest rates.',
        ],
      },
      {
        heading: 'Net profit formula',
        formula: 'Net profit = (Sell price − Buy price) × Quantity − Total charges',
      },
      {
        heading: 'Example',
        paragraphs: [
          'You buy 100 shares at ₹500 and sell them at ₹510. The gross profit is ₹1,000. If the total charges for the trade are ₹80 (an assumed figure), your net profit is ₹920. The charges reduce your profit, so small price moves can be cancelled out by costs.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How is brokerage calculated?',
        answer:
          'Brokerage is a percentage of the trade value or a flat fee per order, depending on your broker. The calculator adds the other taxes and charges to show the total cost.',
      },
      {
        question: 'What is the break-even price in trading?',
        answer:
          'It is the price at which your profit is zero after all charges. You need the price to move beyond it to make a net profit.',
      },
      {
        question: 'Why are intraday charges different from delivery charges?',
        answer:
          'Tax and charge rates differ by segment. Brokers also charge different brokerage for delivery, intraday and derivatives.',
      },
      {
        question: 'Are the results exact?',
        answer:
          'The results are estimates. Your contract note from the broker shows the exact charges.',
      },
    ],
    relatedSlugs: [
      'stock-average-calculator',
      'compare-stocks',
      'ipo-allotment-calculator',
      'dividend-calculator',
    ],
  },
];
