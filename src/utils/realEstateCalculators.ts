import {
  MortgagePaymentInputs,
  MortgagePaymentResults,
  RefinanceInputs,
  RefinanceResults,
  HomeAffordabilityInputs,
  HomeAffordabilityResults,
  RentVsBuyInputs,
  RentVsBuyResults,
  RentalROIInputs,
  RentalROIResults,
  ClosingCostInputs,
  ClosingCostResults,
  PropertyAppreciationInputs,
  PropertyAppreciationResults,
} from '../types/realEstateCalculator';

export const calculateMortgagePayment = (
  inputs: MortgagePaymentInputs
): MortgagePaymentResults => {
  const { loanAmount, interestRate, loanTerm, propertyTax, insurance } = inputs;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  const monthlyPrincipalInterest =
    (loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const monthlyTaxes = propertyTax / 12;
  const monthlyInsurance = insurance / 12;
  const monthlyPayment = monthlyPrincipalInterest + monthlyTaxes + monthlyInsurance;
  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;

  return {
    monthlyPayment: Math.round(monthlyPayment),
    monthlyPrincipalInterest: Math.round(monthlyPrincipalInterest),
    monthlyTaxes: Math.round(monthlyTaxes),
    monthlyInsurance: Math.round(monthlyInsurance),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
  };
};

export const calculateRefinance = (inputs: RefinanceInputs): RefinanceResults => {
  const {
    currentLoanBalance,
    currentInterestRate,
    currentLoanTerm,
    newInterestRate,
    newLoanTerm,
    closingCosts,
  } = inputs;

  const oldMonthlyPayment = calculateMonthlyPayment(
    currentLoanBalance,
    currentInterestRate,
    currentLoanTerm
  );
  const newMonthlyPayment = calculateMonthlyPayment(
    currentLoanBalance + closingCosts,
    newInterestRate,
    newLoanTerm
  );

  const monthlySavings = oldMonthlyPayment - newMonthlyPayment;
  const breakEvenMonths = Math.ceil(closingCosts / monthlySavings);
  const lifetimeSavings =
    monthlySavings * newLoanTerm * 12 - closingCosts;

  return {
    newMonthlyPayment: Math.round(newMonthlyPayment),
    oldMonthlyPayment: Math.round(oldMonthlyPayment),
    monthlySavings: Math.round(monthlySavings),
    breakEvenMonths,
    lifetimeSavings: Math.round(lifetimeSavings),
  };
};

export const calculateHomeAffordability = (
  inputs: HomeAffordabilityInputs
): HomeAffordabilityResults => {
  const {
    annualIncome,
    monthlyDebts,
    downPayment,
    interestRate,
    propertyTax,
    insurance,
    monthlyHOA,
  } = inputs;

  const monthlyIncome = annualIncome / 12;
  const maxMonthlyPayment = monthlyIncome * 0.28; // Front-end ratio
  const maxTotalPayment = monthlyIncome * 0.36 - monthlyDebts; // Back-end ratio
  const maxAllowedPayment = Math.min(maxMonthlyPayment, maxTotalPayment);

  // Calculate max loan amount using monthly payment
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = 30 * 12; // Assume 30-year mortgage
  const monthlyTaxInsurance = (propertyTax + insurance) / 12 + monthlyHOA;
  const maxPIPayment = maxAllowedPayment - monthlyTaxInsurance;

  const maxLoanAmount =
    (maxPIPayment * (Math.pow(1 + monthlyRate, numberOfPayments) - 1)) /
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments));

  const maxPurchasePrice = maxLoanAmount + downPayment;
  const debtToIncomeRatio = ((maxAllowedPayment + monthlyDebts) / monthlyIncome) * 100;

  return {
    maxPurchasePrice: Math.round(maxPurchasePrice),
    maxLoanAmount: Math.round(maxLoanAmount),
    monthlyPayment: Math.round(maxAllowedPayment),
    requiredIncome: Math.round(annualIncome),
    debtToIncomeRatio: Math.round(debtToIncomeRatio * 10) / 10,
  };
};

export const calculateRentVsBuy = (inputs: RentVsBuyInputs): RentVsBuyResults => {
  const {
    homePrice,
    downPayment,
    interestRate,
    propertyTax,
    insurance,
    maintenance,
    monthlyRent,
    rentIncrease,
    homeAppreciation,
    timeframe,
  } = inputs;

  let buyingCosts = downPayment;
  let rentingCosts = 0;
  let currentHomeValue = homePrice;
  let currentRent = monthlyRent;
  let breakEvenYear = 0;

  const loanAmount = homePrice - downPayment;
  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, 30);
  const monthlyTaxInsurance = (propertyTax + insurance) / 12;
  const monthlyMaintenance = maintenance / 12;

  for (let year = 1; year <= timeframe; year++) {
    // Buying costs
    const yearlyMortgage = monthlyPayment * 12;
    const yearlyTaxInsurance = monthlyTaxInsurance * 12;
    const yearlyMaintenance = monthlyMaintenance * 12;
    buyingCosts += yearlyMortgage + yearlyTaxInsurance + yearlyMaintenance;

    // Renting costs
    const yearlyRent = currentRent * 12;
    rentingCosts += yearlyRent;
    currentRent *= (1 + rentIncrease / 100);

    // Home appreciation
    currentHomeValue *= (1 + homeAppreciation / 100);

    // Check break-even
    if (breakEvenYear === 0 && rentingCosts > buyingCosts) {
      breakEvenYear = year;
    }
  }

  const buyingEquity = currentHomeValue - loanAmount;

  return {
    buyingCosts: Math.round(buyingCosts),
    rentingCosts: Math.round(rentingCosts),
    netDifference: Math.round(rentingCosts - buyingCosts),
    breakEvenYear: breakEvenYear || timeframe,
    buyingEquity: Math.round(buyingEquity),
  };
};

export const calculateRentalROI = (inputs: RentalROIInputs): RentalROIResults => {
  const {
    purchasePrice,
    downPayment,
    closingCosts,
    repairCosts,
    monthlyRent,
    monthlyExpenses,
    vacancy,
  } = inputs;

  const totalInvestment = downPayment + closingCosts + repairCosts;
  const yearlyRent = monthlyRent * 12;
  const vacancyLoss = yearlyRent * (vacancy / 100);
  const effectiveGrossIncome = yearlyRent - vacancyLoss;

  const yearlyExpenses = Object.values(monthlyExpenses).reduce(
    (total, expense) => total + expense * 12,
    0
  );

  const netOperatingIncome = effectiveGrossIncome - yearlyExpenses;
  const cashFlow = netOperatingIncome - monthlyExpenses.mortgage * 12;
  const capRate = (netOperatingIncome / purchasePrice) * 100;
  const cashOnCashReturn = (cashFlow / totalInvestment) * 100;
  const totalROI = ((cashFlow + (purchasePrice * 0.03)) / totalInvestment) * 100; // Assumes 3% appreciation

  return {
    cashFlow: Math.round(cashFlow),
    netOperatingIncome: Math.round(netOperatingIncome),
    capRate: Math.round(capRate * 10) / 10,
    cashOnCashReturn: Math.round(cashOnCashReturn * 10) / 10,
    totalROI: Math.round(totalROI * 10) / 10,
  };
};

export const calculateClosingCosts = (
  inputs: ClosingCostInputs
): ClosingCostResults => {
  const { purchasePrice, downPayment, loanType, state } = inputs;
  const loanAmount = purchasePrice - downPayment;

  // Base calculations (simplified - would need actual state-specific data)
  const lenderFees = Math.min(loanAmount * 0.01, 3000);
  const originationFee = loanAmount * 0.01;
  const thirdPartyFees = 2500; // Appraisal, inspection, etc.
  const governmentFees = purchasePrice * 0.002;
  const prepaidItems = (purchasePrice * 0.015); // Insurance, taxes, etc.

  const itemizedCosts = [
    { name: 'Loan Origination Fee', amount: originationFee },
    { name: 'Appraisal', amount: 500 },
    { name: 'Credit Report', amount: 50 },
    { name: 'Title Insurance', amount: loanAmount * 0.004 },
    { name: 'Recording Fees', amount: 125 },
    { name: 'Survey', amount: 400 },
    { name: 'Inspection', amount: 400 },
  ];

  return {
    totalClosingCosts: Math.round(
      lenderFees + thirdPartyFees + governmentFees + prepaidItems
    ),
    lenderFees: Math.round(lenderFees),
    thirdPartyFees: Math.round(thirdPartyFees),
    governmentFees: Math.round(governmentFees),
    prepaidItems: Math.round(prepaidItems),
    itemizedCosts: itemizedCosts.map(item => ({
      ...item,
      amount: Math.round(item.amount),
    })),
  };
};

export const calculatePropertyAppreciation = (
  inputs: PropertyAppreciationInputs
): PropertyAppreciationResults => {
  const { purchasePrice, annualAppreciation, yearsToHold, improvements } = inputs;

  let currentValue = purchasePrice;
  const yearByYear = [];
  let totalImprovements = 0;

  for (let year = 1; year <= yearsToHold; year++) {
    const yearImprovements = improvements
      .filter(imp => imp.year === year)
      .reduce(
        (total, imp) => ({
          cost: total.cost + imp.cost,
          valueAdd: total.valueAdd + imp.valueAdd,
        }),
        { cost: 0, valueAdd: 0 }
      );

    totalImprovements += yearImprovements.cost;
    currentValue *= 1 + annualAppreciation / 100;
    currentValue += yearImprovements.valueAdd;

    yearByYear.push({
      year,
      value: Math.round(currentValue),
      appreciation: Math.round(currentValue - purchasePrice),
      improvements: yearImprovements.cost,
    });
  }

  const totalAppreciation = currentValue - purchasePrice;
  const annualizedReturn =
    (Math.pow(currentValue / purchasePrice, 1 / yearsToHold) - 1) * 100;

  return {
    futureValue: Math.round(currentValue),
    totalAppreciation: Math.round(totalAppreciation),
    annualizedReturn: Math.round(annualizedReturn * 10) / 10,
    yearByYear,
  };
};

export const calculateLandlordExpenses = (
  inputs: LandlordExpenseInputs
): LandlordExpenseResults => {
  const { monthlyRent, mortgage, expenses, vacancy } = inputs;
  
  // Calculate gross income and vacancy loss
  const annualGrossIncome = monthlyRent * 12;
  const vacancyLoss = (annualGrossIncome * vacancy) / 100;
  const effectiveGrossIncome = annualGrossIncome - vacancyLoss;

  // Calculate total expenses
  const annualExpenses = Object.values(expenses).reduce((sum, expense) => sum + expense, 0);
  const totalAnnualExpenses = mortgage.enabled ? annualExpenses + (mortgage.payment * 12) : annualExpenses;
  const monthlyExpenses = totalAnnualExpenses / 12;

  // Calculate NOI and cash flow
  const netOperatingIncome = effectiveGrossIncome - annualExpenses;
  const cashFlow = netOperatingIncome - (mortgage.enabled ? mortgage.payment * 12 : 0);

  // Calculate expense ratio
  const expenseRatio = (totalAnnualExpenses / effectiveGrossIncome) * 100;

  // Create expense breakdown
  const expenseBreakdown = Object.entries(expenses).map(([category, annual]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    monthly: Math.round(annual / 12),
    annual: Math.round(annual),
    percentage: Math.round((annual / annualExpenses) * 100),
  }));

  return {
    monthlyExpenses: Math.round(monthlyExpenses),
    annualExpenses: Math.round(annualExpenses),
    netOperatingIncome: Math.round(netOperatingIncome),
    cashFlow: Math.round(cashFlow),
    expenseRatio: Math.round(expenseRatio * 10) / 10,
    expenseBreakdown: expenseBreakdown,
  };
};

export const calculateCapRate = (inputs: CapRateInputs): CapRateResults => {
  const { propertyValue, monthlyRent, operatingExpenses, vacancy } = inputs;
  
  // Calculate annual gross income
  const annualRent = monthlyRent * 12;
  const vacancyLoss = (annualRent * vacancy) / 100;
  const effectiveGrossIncome = annualRent - vacancyLoss;

  // Calculate total operating expenses
  const totalExpenses = Object.values(operatingExpenses).reduce((sum, expense) => sum + expense, 0);

  // Calculate NOI
  const noi = effectiveGrossIncome - totalExpenses;

  // Calculate cap rate
  const capRate = (noi / propertyValue) * 100;

  // Calculate operating expense ratio
  const operatingExpenseRatio = (totalExpenses / effectiveGrossIncome) * 100;

  // Calculate cash on cash return (assuming 20% down payment)
  const downPayment = propertyValue * 0.2;
  const mortgagePayment = calculateMonthlyPayment(propertyValue * 0.8, 4.5, 30) * 12;
  const cashFlow = noi - mortgagePayment;
  const cashOnCashReturn = (cashFlow / downPayment) * 100;

  // Create expense breakdown
  const expenseBreakdown = Object.entries(operatingExpenses).map(([category, annual]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    annual,
    percentage: Math.round((annual / totalExpenses) * 100),
  }));

  return {
    capRate: Math.round(capRate * 10) / 10,
    noi: Math.round(noi),
    effectiveGrossIncome: Math.round(effectiveGrossIncome),
    operatingExpenseRatio: Math.round(operatingExpenseRatio * 10) / 10,
    cashOnCashReturn: Math.round(cashOnCashReturn * 10) / 10,
    expenseBreakdown,
  };
};

export const calculateInterestOnly = (inputs: InterestOnlyInputs): InterestOnlyResults => {
  const { loanAmount, interestRate, interestOnlyPeriod, loanTerm, propertyValue, propertyAppreciation } = inputs;
  
  // Calculate interest-only payment
  const monthlyRate = interestRate / 100 / 12;
  const interestOnlyPayment = loanAmount * monthlyRate;
  
  // Calculate principal and interest payment after IO period
  const remainingTerm = loanTerm - interestOnlyPeriod;
  const remainingPayments = remainingTerm * 12;
  const principalAndInterestPayment = 
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, remainingPayments)) /
    (Math.pow(1 + monthlyRate, remainingPayments) - 1);
  
  // Calculate payment increase
  const paymentIncrease = principalAndInterestPayment - interestOnlyPayment;
  
  // Calculate total interest
  const ioInterest = interestOnlyPayment * interestOnlyPeriod * 12;
  const amortInterest = (principalAndInterestPayment * remainingPayments) - loanAmount;
  const totalInterest = ioInterest + amortInterest;
  
  // Calculate equity after IO period (only from appreciation)
  const equityAfterIO = propertyValue * Math.pow(1 + propertyAppreciation / 100, interestOnlyPeriod) - propertyValue;

  return {
    interestOnlyPayment: Math.round(interestOnlyPayment),
    principalAndInterestPayment: Math.round(principalAndInterestPayment),
    totalInterest: Math.round(totalInterest),
    paymentIncrease: Math.round(paymentIncrease),
    equityAfterIO: Math.round(equityAfterIO),
  };
};

export const calculateARMvsFixed = (inputs: ARMvsFixedInputs): ARMvsFixedResults => {
  const {
    loanAmount,
    fixedRate,
    initialARMRate,
    adjustmentPeriod,
    rateAdjustmentCap,
    lifetimeCap,
    loanTerm,
    expectedRateIncrease,
  } = inputs;

  // Calculate fixed-rate payments
  const fixedMonthlyPayment = calculateMonthlyPayment(loanAmount, fixedRate, loanTerm);
  const fixedTotalCost = fixedMonthlyPayment * loanTerm * 12;

  // Calculate initial ARM payment
  const initialARMPayment = calculateMonthlyPayment(loanAmount, initialARMRate, loanTerm);

  // Calculate maximum ARM rate and payment
  const maxARMRate = Math.min(initialARMRate + lifetimeCap, 20); // Cap at 20%
  const maxARMPayment = calculateMonthlyPayment(loanAmount, maxARMRate, loanTerm);

  // Calculate year by year comparison
  let currentARMRate = initialARMRate;
  let armTotalCost = 0;
  let breakEvenYear = 0;
  const yearByYear = [];

  for (let year = 1; year <= loanTerm; year++) {
    // Adjust ARM rate at adjustment periods
    if (year > adjustmentPeriod && (year - adjustmentPeriod) % adjustmentPeriod === 0) {
      const rateIncrease = Math.min(rateAdjustmentCap, expectedRateIncrease);
      currentARMRate = Math.min(currentARMRate + rateIncrease, initialARMRate + lifetimeCap);
    }

    const armPayment = calculateMonthlyPayment(loanAmount, currentARMRate, loanTerm - year + 1);
    armTotalCost += armPayment * 12;

    const yearFixedCost = fixedMonthlyPayment * 12;
    const yearARMCost = armPayment * 12;

    if (breakEvenYear === 0 && armTotalCost > year * yearFixedCost) {
      breakEvenYear = year;
    }

    yearByYear.push({
      year,
      armRate: Math.round(currentARMRate * 100) / 100,
      armPayment: Math.round(armPayment),
      fixedPayment: Math.round(fixedMonthlyPayment),
      fixedRemaining: Math.round(fixedTotalCost - yearFixedCost * year),
      armRemaining: Math.round(loanAmount - (armTotalCost - yearARMCost)),
    });
  }

  return {
    fixedMonthlyPayment: Math.round(fixedMonthlyPayment),
    initialARMPayment: Math.round(initialARMPayment),
    maxARMPayment: Math.round(maxARMPayment),
    fixedTotalCost: Math.round(fixedTotalCost),
    armTotalCost: Math.round(armTotalCost),
    breakEvenYear: breakEvenYear || loanTerm,
    yearByYear,
  };
};

// Helper function for monthly payment calculation
function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  years: number
): number {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}