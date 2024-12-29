import {
  CompoundInterestInputs,
  CompoundInterestResults,
  SimpleInterestInputs,
  SimpleInterestResults,
  Rule72Inputs,
  Rule72Results,
} from '../types/calculator';

export const calculateCompoundInterest = (
  inputs: CompoundInterestInputs
): CompoundInterestResults => {
  const {
    principal,
    annualRate,
    years,
    compoundingFrequency,
    monthlyContribution,
  } = inputs;

  const periodsPerYear = {
    annually: 1,
    'semi-annually': 2,
    quarterly: 4,
    monthly: 12,
    daily: 365,
  }[compoundingFrequency];

  const totalPeriods = years * periodsPerYear;
  const ratePerPeriod = annualRate / 100 / periodsPerYear;
  const monthlyToPerPeriod = monthlyContribution * (12 / periodsPerYear);

  let balance = principal;
  let totalContributions = principal;
  const yearlyBreakdown = [];

  for (let year = 1; year <= years; year++) {
    const periodsThisYear = periodsPerYear;
    let yearlyContributions = 0;
    let yearlyInterest = 0;

    for (let p = 0; p < periodsThisYear; p++) {
      const startBalance = balance;
      balance = balance * (1 + ratePerPeriod) + monthlyToPerPeriod;
      yearlyContributions += monthlyToPerPeriod;
      yearlyInterest += (balance - startBalance - monthlyToPerPeriod);
    }

    totalContributions += yearlyContributions;
    yearlyBreakdown.push({
      year,
      balance: Math.round(balance),
      interest: Math.round(yearlyInterest),
      contributions: Math.round(yearlyContributions),
    });
  }

  return {
    finalAmount: Math.round(balance),
    totalInterest: Math.round(balance - totalContributions),
    totalContributions: Math.round(totalContributions),
    yearlyBreakdown,
  };
};

export const calculateSimpleInterest = (
  inputs: SimpleInterestInputs
): SimpleInterestResults => {
  const { principal, rate, time } = inputs;
  
  const interest = (principal * rate * time) / 100;
  const finalAmount = principal + interest;
  const dailyInterest = interest / (time * 365);

  return {
    interest: Math.round(interest * 100) / 100,
    finalAmount: Math.round(finalAmount * 100) / 100,
    dailyInterest: Math.round(dailyInterest * 100) / 100,
  };
};

export const calculateRule72 = (inputs: Rule72Inputs): Rule72Results => {
  const { interestRate, initialAmount } = inputs;
  
  const yearsToDouble = 72 / interestRate;
  const doubledAmount = initialAmount * 2;
  const effectiveRate = 72 / yearsToDouble;

  return {
    yearsToDouble: Math.round(yearsToDouble * 100) / 100,
    doubledAmount: Math.round(doubledAmount * 100) / 100,
    effectiveRate: Math.round(effectiveRate * 100) / 100,
  };
};

export const calculateFutureValue = (inputs: FutureValueInputs): FutureValueResults => {
  const {
    presentValue,
    rate,
    years,
    payments,
    paymentFrequency,
    compoundingFrequency,
  } = inputs;

  const periodsPerYear = {
    annually: 1,
    'semi-annually': 2,
    quarterly: 4,
    monthly: 12,
    daily: 365,
  }[compoundingFrequency];

  const paymentsPerYear = paymentFrequency === 'annually' ? 1 : 12;
  const ratePerPeriod = rate / 100 / periodsPerYear;
  const totalPeriods = years * periodsPerYear;
  const paymentPerPeriod = payments / (periodsPerYear / paymentsPerYear);

  let balance = presentValue;
  let totalContributions = presentValue;
  let totalInterest = 0;
  const timeline = [];

  for (let year = 1; year <= years; year++) {
    let yearlyContributions = 0;
    let yearlyInterest = 0;

    for (let p = 0; p < periodsPerYear; p++) {
      const startBalance = balance;
      balance = balance * (1 + ratePerPeriod);
      
      if ((p * paymentsPerYear / periodsPerYear) % 1 === 0) {
        balance += paymentPerPeriod;
        yearlyContributions += paymentPerPeriod;
      }
      
      yearlyInterest += balance - startBalance - (yearlyContributions / periodsPerYear);
    }

    totalContributions += yearlyContributions;
    totalInterest += yearlyInterest;

    timeline.push({
      year,
      value: Math.round(balance),
      contributions: Math.round(yearlyContributions),
      interest: Math.round(yearlyInterest),
    });
  }

  return {
    futureValue: Math.round(balance),
    totalContributions: Math.round(totalContributions),
    totalInterest: Math.round(totalInterest),
    timeline,
  };
};

export const calculateInvestmentGrowth = (
  inputs: InvestmentGrowthInputs
): InvestmentGrowthResults => {
  const {
    initialAmount,
    monthlyContribution,
    years,
    expectedReturn,
    inflationRate,
    taxRate,
  } = inputs;

  const monthlyRate = expectedReturn / 100 / 12;
  const monthlyInflation = inflationRate / 100 / 12;
  const totalMonths = years * 12;

  let nominalBalance = initialAmount;
  let realBalance = initialAmount;
  let totalContributions = initialAmount;
  let totalTaxes = 0;
  const yearlyBreakdown = [];

  for (let year = 1; year <= years; year++) {
    let yearlyContributions = 0;
    let yearlyTaxes = 0;
    let startNominal = nominalBalance;
    let startReal = realBalance;

    for (let month = 1; month <= 12; month++) {
      // Nominal growth
      const nominalGrowth = nominalBalance * monthlyRate;
      nominalBalance = (nominalBalance + nominalGrowth + monthlyContribution);
      
      // Real growth (adjusted for inflation)
      const realGrowth = realBalance * (monthlyRate - monthlyInflation);
      realBalance = (realBalance + realGrowth + monthlyContribution);

      yearlyContributions += monthlyContribution;
      yearlyTaxes += nominalGrowth * (taxRate / 100);
    }

    totalContributions += yearlyContributions;
    totalTaxes += yearlyTaxes;

    yearlyBreakdown.push({
      year,
      nominal: Math.round(nominalBalance),
      real: Math.round(realBalance),
      contributions: Math.round(yearlyContributions),
      taxes: Math.round(yearlyTaxes),
    });
  }

  return {
    nominalValue: Math.round(nominalBalance),
    realValue: Math.round(realBalance),
    totalContributions: Math.round(totalContributions),
    totalTaxes: Math.round(totalTaxes),
    yearlyBreakdown,
  };
};