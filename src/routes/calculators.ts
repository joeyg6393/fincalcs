import {
  Calculator,
  Home,
  Building,
  DollarSign,
  Percent,
  Scale,
  TrendingUp,
  Briefcase,
  PiggyBank,
  CreditCard,
  Wallet,
  Building2,
  Calendar,
  Coins,
  BadgeDollarSign,
  Receipt,
  Plane,
  Music,
  LayoutList,
  Umbrella,
  GraduationCap,
  CloudSun,
  RefreshCw,
  Repeat,
  LineChart,
  PieChart,
  RefreshCcw,
  Activity,
  GitBranch,
  AlertTriangle,
  Plus,
  Clock,
  Shield
} from 'lucide-react';

export interface CalculatorRoute {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: typeof Calculator;
  category: string;
  comingSoon?: boolean;
}

export const categories = {
  SAVINGS: 'Savings and Budgeting',
  DEBT: 'Debt Management',
  INCOME: 'Income and Taxes',
  SPENDING: 'Spending and Lifestyle',
  INVESTING: 'Investing and Retirement',
  STOCK_MARKET: 'Stock Market',
  PORTFOLIO: 'Portfolio Management',
  GROWTH: 'Growth Projections',
  OPTIONS: 'Options and Derivatives',
  REAL_ESTATE: 'Real Estate',
};

export const calculators: CalculatorRoute[] = [
  // Savings and Budgeting
  {
    id: 'savings-goal',
    title: 'Savings Goal Calculator',
    description: 'Plan and track your savings goals',
    path: '/savings-goal',
    icon: PiggyBank,
    category: categories.SAVINGS
  },
  {
    id: 'budget-planner',
    title: 'Budget Planner',
    description: 'Create and manage your monthly budget',
    path: '/budget-planner',
    icon: LayoutList,
    category: categories.SAVINGS
  },
  {
    id: 'emergency-fund',
    title: 'Emergency Fund Calculator',
    description: 'Calculate your emergency fund needs',
    path: '/emergency-fund',
    icon: Umbrella,
    category: categories.SAVINGS
  },
  {
    id: 'college-savings',
    title: 'College Savings Calculator',
    description: 'Plan for education expenses',
    path: '/college-savings',
    icon: GraduationCap,
    category: categories.SAVINGS
  },
  {
    id: 'rainy-day-fund',
    title: 'Rainy Day Fund Calculator',
    description: 'Plan for unexpected expenses',
    path: '/rainy-day-fund',
    icon: CloudSun,
    category: categories.SAVINGS
  },
  
  // Debt Management
  {
    id: 'loan-payoff',
    title: 'Loan Payoff Calculator',
    description: 'Plan your loan repayment strategy',
    path: '/loan-payoff',
    icon: Calculator,
    category: categories.DEBT
  },
  {
    id: 'credit-card',
    title: 'Credit Card Payoff',
    description: 'Plan your credit card debt payoff strategy',
    path: '/credit-card',
    icon: CreditCard,
    category: categories.DEBT
  },
  {
    id: 'debt-snowball',
    title: 'Debt Snowball Calculator',
    description: 'Optimize debt payoff with the snowball method',
    path: '/debt-snowball',
    icon: Coins,
    category: categories.DEBT
  },
  {
    id: 'debt-avalanche',
    title: 'Debt Avalanche Calculator',
    description: 'Optimize debt payoff with the avalanche method',
    path: '/debt-avalanche',
    icon: TrendingUp,
    category: categories.DEBT
  },
  {
    id: 'debt-to-income',
    title: 'Debt-to-Income Calculator',
    description: 'Calculate your debt-to-income ratio',
    path: '/debt-to-income',
    icon: Percent,
    category: categories.DEBT
  },
  
  // Income and Taxes
  {
    id: 'salary',
    title: 'Salary Calculator',
    description: 'Calculate your annual, monthly, and hourly pay',
    path: '/salary',
    icon: Wallet,
    category: categories.INCOME
  },
  {
    id: 'tax-withholding',
    title: 'Tax Withholding Calculator',
    description: 'Estimate your tax withholdings',
    path: '/tax-withholding',
    icon: Receipt,
    category: categories.INCOME
  },
  {
    id: 'net-income',
    title: 'Net Income Calculator',
    description: 'Calculate your take-home pay',
    path: '/net-income',
    icon: DollarSign,
    category: categories.INCOME
  },
  {
    id: 'self-employment-tax',
    title: 'Self-Employment Tax Calculator',
    description: 'Calculate self-employment taxes',
    path: '/self-employment-tax',
    icon: BadgeDollarSign,
    category: categories.INCOME
  },
  {
    id: 'overtime-pay',
    title: 'Overtime Pay Calculator',
    description: 'Calculate overtime earnings',
    path: '/overtime-pay',
    icon: Wallet,
    category: categories.INCOME,
    comingSoon: true
  },
  
  // Spending and Lifestyle
  {
    id: 'cost-of-living',
    title: 'Cost of Living Calculator',
    description: 'Compare living costs between cities',
    path: '/cost-of-living',
    icon: Building2,
    category: categories.SPENDING
  },
  {
    id: 'subscription-management',
    title: 'Subscription Management',
    description: 'Track and optimize subscription costs',
    path: '/subscription-management',
    icon: Calendar,
    category: categories.SPENDING
  },
  {
    id: 'vacation-savings',
    title: 'Vacation Savings Calculator',
    description: 'Plan and save for your vacation',
    path: '/vacation-savings',
    icon: Plane,
    category: categories.SPENDING
  },
  {
    id: 'entertainment-budget',
    title: 'Entertainment Budget',
    description: 'Plan your entertainment spending',
    path: '/entertainment-budget',
    icon: Music,
    category: categories.SPENDING
  },
  {
    id: 'monthly-expense',
    title: 'Monthly Expense Calculator',
    description: 'Track and categorize monthly expenses',
    path: '/monthly-expense',
    icon: LayoutList,
    category: categories.SPENDING
  },
  
  // Investing and Retirement
  {
    id: 'investment',
    title: 'Investment Calculator',
    description: 'Project investment growth with compound interest',
    path: '/investment',
    icon: TrendingUp,
    category: categories.INVESTING
  },
  {
    id: 'retirement',
    title: '401(k) Calculator',
    description: 'Plan your retirement savings and employer matching',
    path: '/retirement',
    icon: Briefcase,
    category: categories.INVESTING
  },
  {
    id: 'mortgage',
    title: 'Mortgage Calculator',
    description: 'Calculate monthly mortgage payments and more',
    path: '/mortgage',
    icon: Home,
    category: categories.INVESTING
  },
  
  // Stock Market
  {
    id: 'stock-return',
    title: 'Stock Return Calculator',
    description: 'Calculate total returns including dividends and capital gains',
    path: '/stock-return',
    icon: TrendingUp,
    category: categories.STOCK_MARKET
  },
  {
    id: 'dividend-yield',
    title: 'Dividend Yield Calculator',
    description: 'Calculate dividend yield and income potential',
    path: '/dividend-yield',
    icon: DollarSign,
    category: categories.STOCK_MARKET
  },
  {
    id: 'dividend-reinvestment',
    title: 'Dividend Reinvestment Calculator',
    description: 'Project growth with reinvested dividends',
    path: '/dividend-reinvestment',
    icon: RefreshCw,
    category: categories.STOCK_MARKET
  },
  {
    id: 'dca',
    title: 'Dollar-Cost Averaging Calculator',
    description: 'Calculate the benefits of regular investing',
    path: '/dca',
    icon: Repeat,
    category: categories.STOCK_MARKET
  },
  {
    id: 'beta',
    title: 'Beta Calculator',
    description: 'Calculate stock beta and volatility metrics',
    path: '/beta',
    icon: LineChart,
    category: categories.STOCK_MARKET
  },
  
  // Portfolio Management
  {
    id: 'asset-allocation',
    title: 'Asset Allocation Calculator',
    description: 'Optimize your portfolio allocation',
    path: '/asset-allocation',
    icon: PieChart,
    category: categories.PORTFOLIO
  },
  {
    id: 'portfolio-rebalancing',
    title: 'Portfolio Rebalancing Calculator',
    description: 'Calculate rebalancing adjustments',
    path: '/portfolio-rebalancing',
    icon: RefreshCcw,
    category: categories.PORTFOLIO
  },
  {
    id: 'sharpe-ratio',
    title: 'Sharpe Ratio Calculator',
    description: 'Calculate risk-adjusted returns',
    path: '/sharpe-ratio',
    icon: Activity,
    category: categories.PORTFOLIO
  },
  {
    id: 'correlation',
    title: 'Correlation Calculator',
    description: 'Calculate correlation between assets',
    path: '/correlation',
    icon: GitBranch,
    category: categories.PORTFOLIO
  },
  {
    id: 'portfolio-risk',
    title: 'Portfolio Risk Calculator',
    description: 'Analyze portfolio risk metrics',
    path: '/portfolio-risk',
    icon: AlertTriangle,
    category: categories.PORTFOLIO
  },
  
  // Growth Projections
  {
    id: 'compound-interest',
    title: 'Compound Interest Calculator',
    description: 'Calculate compound interest growth',
    path: '/compound-interest',
    icon: TrendingUp,
    category: categories.GROWTH
  },
  {
    id: 'simple-interest',
    title: 'Simple Interest Calculator',
    description: 'Calculate simple interest returns',
    path: '/simple-interest',
    icon: Plus,
    category: categories.GROWTH
  },
  {
    id: 'rule-72',
    title: 'Rule of 72 Calculator',
    description: 'Calculate investment doubling time',
    path: '/rule-72',
    icon: Clock,
    category: categories.GROWTH
  },
  {
    id: 'future-value',
    title: 'Future Value Calculator',
    description: 'Project future investment value',
    path: '/future-value',
    icon: Calendar,
    category: categories.GROWTH
  },
  {
    id: 'investment-growth',
    title: 'Investment Growth Calculator',
    description: 'Model investment growth scenarios',
    path: '/investment-growth',
    icon: LineChart,
    category: categories.GROWTH
  },
  
  // Options and Derivatives
  {
    id: 'black-scholes',
    title: 'Black-Scholes Calculator',
    description: 'Calculate option prices',
    path: '/black-scholes',
    icon: Calculator,
    category: categories.OPTIONS
  },
  {
    id: 'covered-call',
    title: 'Covered Call Calculator',
    description: 'Analyze covered call strategies',
    path: '/covered-call',
    icon: Shield,
    category: categories.OPTIONS
  },
  {
    id: 'put-call-parity',
    title: 'Put-Call Parity Calculator',
    description: 'Verify put-call parity relationships',
    path: '/put-call-parity',
    icon: Scale,
    category: categories.OPTIONS
  },
  {
    id: 'implied-volatility',
    title: 'Implied Volatility Calculator',
    description: 'Calculate implied volatility from option prices',
    path: '/implied-volatility',
    icon: Activity,
    category: categories.OPTIONS
  },
  
  // Mortgages
  {
    id: 'mortgage-payment',
    title: 'Mortgage Payment Calculator',
    description: 'Calculate your monthly mortgage payments including taxes and insurance',
    path: '/mortgage-payment',
    icon: Home,
    category: categories.REAL_ESTATE
  },
  {
    id: 'refinance',
    title: 'Refinance Calculator',
    description: 'Compare your current mortgage with refinancing options',
    path: '/refinance',
    icon: Scale,
    category: categories.REAL_ESTATE
  },
  {
    id: 'home-affordability',
    title: 'Home Affordability Calculator',
    description: 'Determine how much house you can afford',
    path: '/home-affordability',
    icon: Building,
    category: categories.REAL_ESTATE
  },
  // Property Management
  {
    id: 'rent-vs-buy',
    title: 'Rent vs. Buy Calculator',
    description: 'Compare the costs of renting versus buying a home',
    path: '/rent-vs-buy',
    icon: Scale,
    category: categories.REAL_ESTATE
  },
  {
    id: 'rental-roi',
    title: 'Rental Property ROI',
    description: 'Calculate return on investment for rental properties',
    path: '/rental-roi',
    icon: TrendingUp,
    category: categories.REAL_ESTATE
  },
  // Other Real Estate Costs
  {
    id: 'closing-costs',
    title: 'Closing Cost Calculator',
    description: 'Estimate closing costs for buying a home',
    path: '/closing-costs',
    icon: DollarSign,
    category: categories.REAL_ESTATE
  },
  {
    id: 'property-appreciation',
    title: 'Property Appreciation Calculator',
    description: 'Project future property value with improvements',
    path: '/property-appreciation',
    icon: Percent,
    category: categories.REAL_ESTATE
  },
  {
    id: 'arm-vs-fixed',
    title: 'ARM vs Fixed Rate Calculator',
    description: 'Compare adjustable and fixed-rate mortgages',
    path: '/arm-vs-fixed',
    icon: Scale,
    category: categories.REAL_ESTATE
  },
];