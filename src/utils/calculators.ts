import {
  InvestmentInputs,
  InvestmentResults,
  RetirementInputs,
  RetirementResults,
  SavingsInputs,
  SavingsResults,
  CreditCardInputs,
  CreditCardResults,
} from '../types/calculator';

export const calculateInvestment = (inputs: InvestmentInputs): InvestmentResults => {
  const { initialInvestment, monthlyContribution, annualReturn, timeHorizon } = inputs;
  const monthlyRate = annualReturn / 100 / 12;
  const totalMonths = timeHorizon * 12;
  const monthlyProjections = [];
  
  let currentBalance = initialInvestment;
  const totalContributions = initialInvestment + (monthlyContribution * totalMonths);
  
  for (let month = 1; month <= totalMonths; month++) {
    currentBalance = (currentBalance + monthlyContribution) * (1 + monthlyRate);
    monthlyProjections.push({ month, balance: Math.round(currentBalance) });
  }

  return {
    finalBalance: Math.round(currentBalance),
    totalContributions: Math.round(totalContributions),
    totalEarnings: Math.round(currentBalance - totalContributions),
    monthlyProjections,
  };
};

export const calculateRetirement = (inputs: RetirementInputs): RetirementResults => {
  const {
    salary,
    contribution,
    employerMatch,
    matchLimit,
    currentAge,
    retirementAge,
    currentBalance,
    annualReturn,
  } = inputs;

  const yearsToRetirement = retirementAge - currentAge;
  const monthlyRate = annualReturn / 100 / 12;
  const totalMonths = yearsToRetirement * 12;

  const monthlyContribution = (salary * (contribution / 100)) / 12;
  const employerMonthlyMatch = Math.min(
    monthlyContribution * (employerMatch / 100),
    (salary * (matchLimit / 100)) / 12
  );

  let balance = currentBalance;
  for (let month = 1; month <= totalMonths; month++) {
    balance = (balance + monthlyContribution + employerMonthlyMatch) * (1 + monthlyRate);
  }

  const totalContributions = monthlyContribution * totalMonths;
  const employerContributions = employerMonthlyMatch * totalMonths;

  return {
    projectedBalance: Math.round(balance),
    totalContributions: Math.round(totalContributions),
    employerContributions: Math.round(employerContributions),
    monthlyContribution: Math.round(monthlyContribution),
  };
};

export const calculateSavings = (inputs: SavingsInputs): SavingsResults => {
  const { targetAmount, timeframe, initialSavings, interestRate } = inputs;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = timeframe * 12;

  // Calculate required monthly payment using PMT formula
  const monthlyRequired =
    (targetAmount - initialSavings * Math.pow(1 + monthlyRate, totalMonths)) *
    (monthlyRate / (Math.pow(1 + monthlyRate, totalMonths) - 1));

  const totalContributions = monthlyRequired * totalMonths;
  const finalBalance = targetAmount;
  const totalInterest = finalBalance - totalContributions - initialSavings;

  return {
    monthlyRequired: Math.round(monthlyRequired),
    totalContributions: Math.round(totalContributions),
    totalInterest: Math.round(totalInterest),
    finalBalance: Math.round(finalBalance),
  };
};

export const calculateCreditCard = (inputs: CreditCardInputs): CreditCardResults => {
  const { balance, interestRate, monthlyPayment, additionalPayment } = inputs;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonthlyPayment = monthlyPayment + additionalPayment;

  let remainingBalance = balance;
  let months = 0;
  let totalInterest = 0;

  while (remainingBalance > 0 && months < 1200) { // 100 years max to prevent infinite loop
    const interest = remainingBalance * monthlyRate;
    totalInterest += interest;
    remainingBalance = remainingBalance + interest - totalMonthlyPayment;
    months++;
  }

  const payoffDate = new Date();
  payoffDate.setMonth(payoffDate.getMonth() + months);

  return {
    monthsToPayoff: months,
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(balance + totalInterest),
    payoffDate,
  };
};

export const calculateSavingsGoal = (inputs: SavingsGoalInputs): SavingsGoalResults => {
  const { targetAmount, timeframe, initialSavings, interestRate } = inputs;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = timeframe * 12;

  const monthlyRequired =
    (targetAmount - initialSavings * Math.pow(1 + monthlyRate, totalMonths)) *
    (monthlyRate / (Math.pow(1 + monthlyRate, totalMonths) - 1));

  const totalContributions = monthlyRequired * totalMonths;
  const finalBalance = targetAmount;
  const totalInterest = finalBalance - totalContributions - initialSavings;

  return {
    monthlyRequired: Math.round(monthlyRequired),
    totalContributions: Math.round(totalContributions),
    totalInterest: Math.round(totalInterest),
    finalBalance: Math.round(finalBalance),
  };
};

export const calculateBudgetPlanner = (inputs: BudgetPlannerInputs): BudgetPlannerResults => {
  const { monthlyIncome, expenses } = inputs;
  const totalExpenses = Object.values(expenses).reduce((sum, expense) => sum + expense, 0);
  const remainingIncome = monthlyIncome - totalExpenses;

  const expenseBreakdown = Object.entries(expenses).map(([category, amount]) => ({
    category,
    amount,
    percentage: (amount / monthlyIncome) * 100,
  }));

  return {
    totalExpenses,
    remainingIncome,
    expenseBreakdown,
  };
};

export const calculateEmergencyFund = (inputs: EmergencyFundInputs): EmergencyFundResults => {
  const { monthlyExpenses, desiredMonths, currentSavings } = inputs;
  const targetAmount = monthlyExpenses * desiredMonths;
  const additionalNeeded = Math.max(0, targetAmount - currentSavings);
  const monthlyContribution = additionalNeeded / 12; // Assume 1 year target
  const timeToReach = additionalNeeded / monthlyContribution;

  return {
    targetAmount: Math.round(targetAmount),
    additionalNeeded: Math.round(additionalNeeded),
    monthlyContribution: Math.round(monthlyContribution),
    timeToReach: Math.round(timeToReach),
  };
};

export const calculateCollegeSavings = (inputs: CollegeSavingsInputs): CollegeSavingsResults => {
  const {
    childAge,
    collegeStartAge,
    yearsInCollege,
    annualCost,
    currentSavings,
    expectedReturn,
  } = inputs;

  const yearsUntilCollege = collegeStartAge - childAge;
  const totalCost = annualCost * yearsInCollege;
  const monthlyRate = expectedReturn / 100 / 12;
  const totalMonths = yearsUntilCollege * 12;

  const monthlyContribution =
    (totalCost - currentSavings * Math.pow(1 + monthlyRate, totalMonths)) *
    (monthlyRate / (Math.pow(1 + monthlyRate, totalMonths) - 1));

  const projectedSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsUntilCollege) +
    monthlyContribution * 12 * ((Math.pow(1 + expectedReturn / 100, yearsUntilCollege) - 1) / (expectedReturn / 100));

  return {
    totalCost: Math.round(totalCost),
    monthlyContribution: Math.round(monthlyContribution),
    projectedSavings: Math.round(projectedSavings),
    shortfall: Math.round(Math.max(0, totalCost - projectedSavings)),
  };
};

export const calculateRainyDay = (inputs: RainyDayInputs): RainyDayResults => {
  const { monthlyIncome, targetPercentage, currentSavings, timeframe } = inputs;
  const targetAmount = monthlyIncome * (targetPercentage / 100) * 6; // 6 months of target percentage
  const remaining = Math.max(0, targetAmount - currentSavings);
  const monthlyContribution = remaining / (timeframe * 12);
  const progressPercentage = (currentSavings / targetAmount) * 100;

  return {
    targetAmount: Math.round(targetAmount),
    monthlyContribution: Math.round(monthlyContribution),
    timeToReach: timeframe,
    progressPercentage: Math.round(progressPercentage * 10) / 10,
  };
};

export const calculateLoanPayoff = (inputs: LoanPayoffInputs): LoanPayoffResults => {
  const { loanAmount, interestRate, monthlyPayment, additionalPayment } = inputs;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonthlyPayment = monthlyPayment + additionalPayment;

  let remainingBalance = loanAmount;
  let months = 0;
  let totalInterest = 0;

  while (remainingBalance > 0 && months < 1200) {
    const interest = remainingBalance * monthlyRate;
    totalInterest += interest;
    remainingBalance = remainingBalance + interest - totalMonthlyPayment;
    months++;
  }

  const payoffDate = new Date();
  payoffDate.setMonth(payoffDate.getMonth() + months);

  return {
    monthsToPayoff: months,
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(loanAmount + totalInterest),
    payoffDate,
  };
};

export const calculateDebtSnowball = (inputs: DebtSnowballInputs): DebtSnowballResults => {
  const { debts, additionalPayment } = inputs;
  let sortedDebts = [...debts].sort((a, b) => a.balance - b.balance);
  let totalMonths = 0;
  let totalInterest = 0;
  const payoffSchedule = [];
  let extraPayment = additionalPayment;

  for (const debt of sortedDebts) {
    const { balance, interestRate, minimumPayment, name } = debt;
    const monthlyRate = interestRate / 100 / 12;
    const payment = minimumPayment + extraPayment;
    
    let remainingBalance = balance;
    let months = 0;
    let interestPaid = 0;

    while (remainingBalance > 0) {
      const interest = remainingBalance * monthlyRate;
      interestPaid += interest;
      remainingBalance = remainingBalance + interest - payment;
      months++;
    }

    totalInterest += interestPaid;
    totalMonths = Math.max(totalMonths, months);
    payoffSchedule.push({
      debtName: name,
      payoffMonth: months,
      interestPaid: Math.round(interestPaid),
    });

    extraPayment += minimumPayment;
  }

  return {
    totalMonths,
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(
      debts.reduce((sum, debt) => sum + debt.balance, 0) + totalInterest
    ),
    payoffSchedule,
  };
};

export const calculateDebtAvalanche = (inputs: DebtAvalancheInputs): DebtAvalancheResults => {
  const { debts, additionalPayment } = inputs;
  let sortedDebts = [...debts].sort((a, b) => b.interestRate - a.interestRate);
  let totalMonths = 0;
  let totalInterest = 0;
  const payoffSchedule = [];
  let extraPayment = additionalPayment;

  for (const debt of sortedDebts) {
    const { balance, interestRate, minimumPayment, name } = debt;
    const monthlyRate = interestRate / 100 / 12;
    const payment = minimumPayment + extraPayment;
    
    let remainingBalance = balance;
    let months = 0;
    let interestPaid = 0;

    while (remainingBalance > 0) {
      const interest = remainingBalance * monthlyRate;
      interestPaid += interest;
      remainingBalance = remainingBalance + interest - payment;
      months++;
    }

    totalInterest += interestPaid;
    totalMonths = Math.max(totalMonths, months);
    payoffSchedule.push({
      debtName: name,
      payoffMonth: months,
      interestPaid: Math.round(interestPaid),
    });

    extraPayment += minimumPayment;
  }

  return {
    totalMonths,
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(
      debts.reduce((sum, debt) => sum + debt.balance, 0) + totalInterest
    ),
    payoffSchedule,
  };
};

export const calculateDebtToIncome = (inputs: DebtToIncomeInputs): DebtToIncomeResults => {
  const { monthlyIncome, debts } = inputs;
  const totalMonthlyDebt = debts.reduce((sum, debt) => sum + debt.monthlyPayment, 0);
  const ratio = (totalMonthlyDebt / monthlyIncome) * 100;

  let status: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  const recommendations: string[] = [];

  if (ratio <= 28) {
    status = 'Excellent';
    recommendations.push('Your debt-to-income ratio is excellent. Consider investing or saving more.');
  } else if (ratio <= 36) {
    status = 'Good';
    recommendations.push('Your debt-to-income ratio is good. Monitor your debts and avoid taking on more.');
  } else if (ratio <= 43) {
    status = 'Fair';
    recommendations.push('Consider reducing some debts to improve your financial health.');
    recommendations.push('Look for ways to increase your income or reduce expenses.');
  } else {
    status = 'Poor';
    recommendations.push('Focus on paying off high-interest debt first.');
    recommendations.push('Consider debt consolidation or speaking with a financial advisor.');
    recommendations.push('Avoid taking on any new debt.');
  }

  return {
    ratio: Math.round(ratio * 10) / 10,
    totalMonthlyDebt: Math.round(totalMonthlyDebt),
    status,
    recommendations,
  };
};