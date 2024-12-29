export interface MortgageInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  downPayment: number;
}

export interface MortgageResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  principalAmount: number;
}

export interface InvestmentInputs {
  initialInvestment: number;
  monthlyContribution: number;
  annualReturn: number;
  timeHorizon: number;
}

export interface InvestmentResults {
  finalBalance: number;
  totalContributions: number;
  totalEarnings: number;
  monthlyProjections: Array<{ month: number; balance: number }>;
}

export interface RetirementInputs {
  salary: number;
  contribution: number;
  employerMatch: number;
  matchLimit: number;
  currentAge: number;
  retirementAge: number;
  currentBalance: number;
  annualReturn: number;
}

export interface RetirementResults {
  projectedBalance: number;
  totalContributions: number;
  employerContributions: number;
  monthlyContribution: number;
}

export interface SavingsInputs {
  targetAmount: number;
  timeframe: number;
  initialSavings: number;
  interestRate: number;
}

export interface SavingsResults {
  monthlyRequired: number;
  totalContributions: number;
  totalInterest: number;
  finalBalance: number;
}

export interface CreditCardInputs {
  balance: number;
  interestRate: number;
  monthlyPayment: number;
  additionalPayment: number;
}

export interface CreditCardResults {
  monthsToPayoff: number;
  totalInterest: number;
  totalPayment: number;
  payoffDate: Date;
}

export interface SavingsGoalInputs {
  targetAmount: number;
  timeframe: number;
  initialSavings: number;
  interestRate: number;
}

export interface SavingsGoalResults {
  monthlyRequired: number;
  totalContributions: number;
  totalInterest: number;
  finalBalance: number;
}

export interface BudgetPlannerInputs {
  monthlyIncome: number;
  expenses: {
    housing: number;
    utilities: number;
    food: number;
    transportation: number;
    healthcare: number;
    entertainment: number;
    other: number;
  };
}

export interface BudgetPlannerResults {
  totalExpenses: number;
  remainingIncome: number;
  expenseBreakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}

export interface EmergencyFundInputs {
  monthlyExpenses: number;
  desiredMonths: number;
  currentSavings: number;
}

export interface EmergencyFundResults {
  targetAmount: number;
  additionalNeeded: number;
  monthlyContribution: number;
  timeToReach: number;
}

export interface CollegeSavingsInputs {
  childAge: number;
  collegeStartAge: number;
  yearsInCollege: number;
  annualCost: number;
  currentSavings: number;
  expectedReturn: number;
}

export interface CollegeSavingsResults {
  totalCost: number;
  monthlyContribution: number;
  projectedSavings: number;
  shortfall: number;
}

export interface RainyDayInputs {
  monthlyIncome: number;
  targetPercentage: number;
  currentSavings: number;
  timeframe: number;
}

export interface RainyDayResults {
  targetAmount: number;
  monthlyContribution: number;
  timeToReach: number;
  progressPercentage: number;
}

export interface LoanPayoffInputs {
  loanAmount: number;
  interestRate: number;
  monthlyPayment: number;
  additionalPayment: number;
}

export interface LoanPayoffResults {
  monthsToPayoff: number;
  totalInterest: number;
  totalPayment: number;
  payoffDate: Date;
}

export interface DebtSnowballInputs {
  debts: Array<{
    name: string;
    balance: number;
    interestRate: number;
    minimumPayment: number;
  }>;
  additionalPayment: number;
}

export interface DebtSnowballResults {
  totalMonths: number;
  totalInterest: number;
  totalPayment: number;
  payoffSchedule: Array<{
    debtName: string;
    payoffMonth: number;
    interestPaid: number;
  }>;
}

export interface DebtAvalancheInputs {
  debts: Array<{
    name: string;
    balance: number;
    interestRate: number;
    minimumPayment: number;
  }>;
  additionalPayment: number;
}

export interface DebtAvalancheResults {
  totalMonths: number;
  totalInterest: number;
  totalPayment: number;
  payoffSchedule: Array<{
    debtName: string;
    payoffMonth: number;
    interestPaid: number;
  }>;
}

export interface DebtToIncomeInputs {
  monthlyIncome: number;
  debts: Array<{
    name: string;
    monthlyPayment: number;
  }>;
}

export interface DebtToIncomeResults {
  ratio: number;
  totalMonthlyDebt: number;
  status: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  recommendations: string[];
}

export interface SalaryInputs {
  hourlyRate: number;
  hoursPerWeek: number;
  weeksPerYear: number;
}

export interface SalaryResults {
  annualSalary: number;
  monthlySalary: number;
  biweeklySalary: number;
  weeklyPay: number;
  dailyPay: number;
}

export interface TaxWithholdingInputs {
  annualSalary: number;
  filingStatus: string;
  allowances: number;
  state: string;
  additionalWithholding: number;
}

export interface TaxWithholdingResults {
  federalWithholding: number;
  stateWithholding: number;
  socialSecurity: number;
  medicare: number;
  totalWithholding: number;
  netPay: number;
}

export interface CostOfLivingInputs {
  currentCity: string;
  newCity: string;
  currentIncome: number;
  currentRent: number;
  currentUtilities: number;
  currentGroceries: number;
  currentTransportation: number;
}

export interface CostOfLivingResults {
  requiredIncome: number;
  rentDifference: number;
  utilitiesDifference: number;
  groceriesDifference: number;
  transportationDifference: number;
  totalDifference: number;
  percentageDifference: number;
}

export interface SubscriptionInputs {
  subscriptions: Array<{
    name: string;
    cost: number;
    billingCycle: 'monthly' | 'yearly';
    category: string;
  }>;
}

export interface SubscriptionResults {
  monthlyTotal: number;
  yearlyTotal: number;
  categoryBreakdown: Array<{
    category: string;
    monthlyAmount: number;
    yearlyAmount: number;
    percentage: number;
  }>;
}

export interface VacationSavingsInputs {
  destination: string;
  travelCost: number;
  accommodationCost: number;
  activities: number;
  food: number;
  miscExpenses: number;
  startDate: Date;
  currentSavings: number;
}

export interface VacationSavingsResults {
  totalCost: number;
  monthlyRequired: number;
  weeksUntilTrip: number;
  savingsProgress: number;
  breakdown: {
    travel: number;
    accommodation: number;
    activities: number;
    food: number;
    misc: number;
  };
}

export interface EntertainmentBudgetInputs {
  monthlyIncome: number;
  categories: {
    dining: number;
    movies: number;
    concerts: number;
    sports: number;
    hobbies: number;
    streaming: number;
    other: number;
  };
}

export interface EntertainmentBudgetResults {
  totalBudget: number;
  percentageOfIncome: number;
  categoryBreakdown: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
  recommendations: string[];
}

export interface MonthlyExpenseInputs {
  income: number;
  expenses: Array<{
    category: string;
    name: string;
    amount: number;
    dueDate?: number;
    isRecurring: boolean;
  }>;
}

export interface MonthlyExpenseResults {
  totalExpenses: number;
  remainingIncome: number;
  expensesByCategory: Array<{
    category: string;
    total: number;
    percentage: number;
  }>;
  upcomingExpenses: Array<{
    name: string;
    amount: number;
    dueDate: number;
  }>;
}
export interface SelfEmploymentInputs {
  netEarnings: number;
  expenses: number;
  otherIncome: number;
  businessMiles: number;
  homeOfficePercent: number;
}

export interface SelfEmploymentResults {
  selfEmploymentTax: number;
  socialSecurityTax: number;
  medicareTax: number;
  taxableIncome: number;
  estimatedQuarterlyTax: number;
  deductions: number;
}
export interface NetIncomeInputs {
  grossIncome: number;
  payFrequency: string;
  filingStatus: string;
  allowances: number;
  state: string;
  retirement401k: number;
  healthInsurance: number;
  otherDeductions: number;
}

export interface NetIncomeResults {
  grossPay: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  retirement401k: number;
  healthInsurance: number;
  otherDeductions: number;
  netPay: number;
}

export interface StockReturnInputs {
  initialPrice: number;
  finalPrice: number;
  dividends: number[];
  holdingPeriod: number;
}

export interface StockReturnResults {
  totalReturn: number;
  annualizedReturn: number;
  capitalGains: number;
  dividendIncome: number;
}

export interface DividendYieldInputs {
  stockPrice: number;
  annualDividend: number;
  payoutFrequency: 'annual' | 'semi-annual' | 'quarterly' | 'monthly';
}

export interface DividendYieldResults {
  dividendYield: number;
  monthlyIncome: number;
  annualIncome: number;
  payoutSchedule: Date[];
}

export interface DividendReinvestmentInputs {
  initialInvestment: number;
  sharePrice: number;
  annualDividend: number;
  growthRate: number;
  years: number;
}

export interface DividendReinvestmentResults {
  finalValue: number;
  totalDividends: number;
  totalShares: number;
  yearlyBreakdown: Array<{
    year: number;
    shares: number;
    dividends: number;
    value: number;
  }>;
}

export interface DCAInputs {
  monthlyInvestment: number;
  initialPrice: number;
  priceHistory: number[];
  years: number;
}

export interface DCAResults {
  totalInvested: number;
  currentValue: number;
  totalShares: number;
  averageCost: number;
  returnOnInvestment: number;
}

export interface BetaInputs {
  stockReturns: number[];
  marketReturns: number[];
  riskFreeRate: number;
}

export interface BetaResults {
  beta: number;
  correlation: number;
  rSquared: number;
  standardDeviation: number;
}

export interface AssetAllocationInputs {
  riskTolerance: number;
  investmentHorizon: number;
  currentAge: number;
  retirementAge: number;
  portfolioValue: number;
}

export interface AssetAllocationResults {
  stocks: number;
  bonds: number;
  cash: number;
  other: number;
  recommendations: string[];
}

export interface PortfolioRebalancingInputs {
  targetAllocations: { [key: string]: number };
  currentHoldings: { [key: string]: { value: number; price: number } };
}

export interface PortfolioRebalancingResults {
  trades: Array<{
    asset: string;
    action: 'buy' | 'sell';
    shares: number;
    amount: number;
  }>;
  newAllocations: { [key: string]: number };
  totalValue: number;
}

export interface SharpeRatioInputs {
  returns: number[];
  riskFreeRate: number;
  period: 'daily' | 'monthly' | 'annual';
}

export interface SharpeRatioResults {
  sharpeRatio: number;
  excessReturn: number;
  standardDeviation: number;
  annualizedSharpe: number;
}

export interface CorrelationInputs {
  asset1Returns: number[];
  asset2Returns: number[];
  period: 'daily' | 'monthly' | 'annual';
}

export interface CorrelationResults {
  correlation: number;
  rSquared: number;
  covariance: number;
  significance: number;
}

export interface PortfolioRiskInputs {
  assets: Array<{
    name: string;
    weight: number;
    returns: number[];
  }>;
  riskFreeRate: number;
}

export interface PortfolioRiskResults {
  portfolioReturn: number;
  portfolioRisk: number;
  sharpeRatio: number;
  varFivePercent: number;
  maxDrawdown: number;
}

export interface CompoundInterestInputs {
  principal: number;
  annualRate: number;
  years: number;
  compoundingFrequency: 'annually' | 'semi-annually' | 'quarterly' | 'monthly' | 'daily';
  monthlyContribution: number;
}

export interface CompoundInterestResults {
  finalAmount: number;
  totalInterest: number;
  totalContributions: number;
  yearlyBreakdown: Array<{
    year: number;
    balance: number;
    interest: number;
    contributions: number;
  }>;
}

export interface SimpleInterestInputs {
  principal: number;
  rate: number;
  time: number;
}

export interface SimpleInterestResults {
  interest: number;
  finalAmount: number;
  dailyInterest: number;
}

export interface Rule72Inputs {
  interestRate: number;
  initialAmount: number;
}

export interface Rule72Results {
  yearsToDouble: number;
  doubledAmount: number;
  effectiveRate: number;
}

export interface FutureValueInputs {
  presentValue: number;
  rate: number;
  years: number;
  payments: number;
  paymentFrequency: 'annually' | 'monthly';
  compoundingFrequency: 'annually' | 'semi-annually' | 'quarterly' | 'monthly' | 'daily';
}

export interface FutureValueResults {
  futureValue: number;
  totalContributions: number;
  totalInterest: number;
  timeline: Array<{
    year: number;
    value: number;
    contributions: number;
    interest: number;
  }>;
}

export interface InvestmentGrowthInputs {
  initialAmount: number;
  monthlyContribution: number;
  years: number;
  expectedReturn: number;
  inflationRate: number;
  taxRate: number;
}

export interface InvestmentGrowthResults {
  nominalValue: number;
  realValue: number;
  totalContributions: number;
  totalTaxes: number;
  yearlyBreakdown: Array<{
    year: number;
    nominal: number;
    real: number;
    contributions: number;
    taxes: number;
  }>;
}

export interface BlackScholesInputs {
  stockPrice: number;
  strikePrice: number;
  timeToExpiry: number;
  riskFreeRate: number;
  volatility: number;
  optionType: 'call' | 'put';
}

export interface BlackScholesResults {
  optionPrice: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
}

export interface CoveredCallInputs {
  stockPrice: number;
  strikePrice: number;
  premium: number;
  contracts: number;
  daysToExpiry: number;
}

export interface CoveredCallResults {
  maxProfit: number;
  maxLoss: number;
  breakeven: number;
  returnIfUnchanged: number;
  annualizedReturn: number;
}

export interface PutCallParityInputs {
  callPrice: number;
  putPrice: number;
  stockPrice: number;
  strikePrice: number;
  riskFreeRate: number;
  timeToExpiry: number;
}

export interface PutCallParityResults {
  parityValue: number;
  deviation: number;
  arbitrageOpportunity: boolean;
  recommendedAction: string;
}

export interface ImpliedVolatilityInputs {
  optionPrice: number;
  stockPrice: number;
  strikePrice: number;
  timeToExpiry: number;
  riskFreeRate: number;
  optionType: 'call' | 'put';
}

export interface ImpliedVolatilityResults {
  impliedVolatility: number;
  annualizedVolatility: number;
  confidenceInterval: {
    lower: number;
    upper: number;
  };
  historicalComparison: number;
}