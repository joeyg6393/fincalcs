// Mortgage Calculators
export interface MortgagePaymentInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  propertyTax: number;
  insurance: number;
}

export interface MortgagePaymentResults {
  monthlyPayment: number;
  monthlyPrincipalInterest: number;
  monthlyTaxes: number;
  monthlyInsurance: number;
  totalPayment: number;
  totalInterest: number;
}

export interface RefinanceInputs {
  currentLoanBalance: number;
  currentInterestRate: number;
  currentLoanTerm: number;
  newInterestRate: number;
  newLoanTerm: number;
  closingCosts: number;
}

export interface RefinanceResults {
  newMonthlyPayment: number;
  oldMonthlyPayment: number;
  monthlySavings: number;
  breakEvenMonths: number;
  lifetimeSavings: number;
}

export interface HomeAffordabilityInputs {
  annualIncome: number;
  monthlyDebts: number;
  downPayment: number;
  interestRate: number;
  propertyTax: number;
  insurance: number;
  monthlyHOA: number;
}

export interface HomeAffordabilityResults {
  maxPurchasePrice: number;
  maxLoanAmount: number;
  monthlyPayment: number;
  requiredIncome: number;
  debtToIncomeRatio: number;
}

// Property Management Calculators
export interface RentVsBuyInputs {
  homePrice: number;
  downPayment: number;
  interestRate: number;
  propertyTax: number;
  insurance: number;
  maintenance: number;
  monthlyRent: number;
  rentIncrease: number;
  homeAppreciation: number;
  timeframe: number;
}

export interface RentVsBuyResults {
  buyingCosts: number;
  rentingCosts: number;
  netDifference: number;
  breakEvenYear: number;
  buyingEquity: number;
}

export interface RentalROIInputs {
  purchasePrice: number;
  downPayment: number;
  closingCosts: number;
  repairCosts: number;
  monthlyRent: number;
  monthlyExpenses: {
    mortgage: number;
    tax: number;
    insurance: number;
    utilities: number;
    maintenance: number;
    management: number;
    other: number;
  };
  vacancy: number;
}

export interface RentalROIResults {
  cashFlow: number;
  netOperatingIncome: number;
  capRate: number;
  cashOnCashReturn: number;
  totalROI: number;
}

// Other Real Estate Costs
export interface ClosingCostInputs {
  purchasePrice: number;
  downPayment: number;
  loanType: 'conventional' | 'fha' | 'va';
  state: string;
}

export interface ClosingCostResults {
  totalClosingCosts: number;
  lenderFees: number;
  thirdPartyFees: number;
  governmentFees: number;
  prepaidItems: number;
  itemizedCosts: Array<{
    name: string;
    amount: number;
  }>;
}

export interface PropertyAppreciationInputs {
  purchasePrice: number;
  annualAppreciation: number;
  yearsToHold: number;
  improvements: Array<{
    year: number;
    cost: number;
    valueAdd: number;
  }>;
}

export interface PropertyAppreciationResults {
  futureValue: number;
  totalAppreciation: number;
  annualizedReturn: number;
  yearByYear: Array<{
    year: number;
    value: number;
    appreciation: number;
    improvements: number;
  }>;
}

export interface InterestOnlyInputs {
  loanAmount: number;
  interestRate: number;
  interestOnlyPeriod: number;
  loanTerm: number;
  propertyValue: number;
  propertyAppreciation: number;
}

export interface InterestOnlyResults {
  interestOnlyPayment: number;
  principalAndInterestPayment: number;
  totalInterest: number;
  paymentIncrease: number;
  equityAfterIO: number;
}

export interface ARMvsFixedInputs {
  loanAmount: number;
  fixedRate: number;
  initialARMRate: number;
  adjustmentPeriod: number;
  rateAdjustmentCap: number;
  lifetimeCap: number;
  loanTerm: number;
  expectedRateIncrease: number;
}

export interface ARMvsFixedResults {
  fixedMonthlyPayment: number;
  initialARMPayment: number;
  maxARMPayment: number;
  fixedTotalCost: number;
  armTotalCost: number;
  breakEvenYear: number;
  yearByYear: Array<{
    year: number;
    armRate: number;
    armPayment: number;
    fixedPayment: number;
    fixedRemaining: number;
    armRemaining: number;
  }>;
}

export interface CapRateInputs {
  propertyValue: number;
  monthlyRent: number;
  operatingExpenses: {
    propertyTax: number;
    insurance: number;
    utilities: number;
    maintenance: number;
    propertyManagement: number;
    hoa: number;
    other: number;
  };
  vacancy: number;
}

export interface CapRateResults {
  capRate: number;
  noi: number;
  effectiveGrossIncome: number;
  operatingExpenseRatio: number;
  cashOnCashReturn: number;
  expenseBreakdown: Array<{
    category: string;
    annual: number;
    percentage: number;
  }>;
}

export interface LandlordExpenseInputs {
  monthlyRent: number;
  propertyValue: number;
  mortgage: {
    payment: number;
    enabled: boolean;
  };
  expenses: {
    propertyTax: number;
    insurance: number;
    utilities: number;
    maintenance: number;
    propertyManagement: number;
    hoa: number;
    marketing: number;
    legal: number;
    other: number;
  };
  vacancy: number;
}

export interface LandlordExpenseResults {
  monthlyExpenses: number;
  annualExpenses: number;
  netOperatingIncome: number;
  cashFlow: number;
  expenseRatio: number;
  expenseBreakdown: Array<{
    category: string;
    monthly: number;
    annual: number;
    percentage: number;
  }>;
}

export interface ARMvsFixedInputs {
  loanAmount: number;
  fixedRate: number;
  initialARMRate: number;
  adjustmentPeriod: number;
  rateAdjustmentCap: number;
  lifetimeCap: number;
  loanTerm: number;
  expectedRateIncrease: number;
}

export interface ARMvsFixedResults {
  fixedMonthlyPayment: number;
  initialARMPayment: number;
  maxARMPayment: number;
  fixedTotalCost: number;
  armTotalCost: number;
  breakEvenYear: number;
  yearByYear: Array<{
    year: number;
    fixedPayment: number;
    armPayment: number;
    armRate: number;
    fixedRemaining: number;
    armRemaining: number;
  }>;
}