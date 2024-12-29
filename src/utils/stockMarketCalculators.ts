import {
  StockReturnInputs,
  StockReturnResults,
  DividendYieldInputs,
  DividendYieldResults,
  DividendReinvestmentInputs,
  DividendReinvestmentResults,
  DCAInputs,
  DCAResults,
  BetaInputs,
  BetaResults,
} from '../types/calculator';

export const calculateStockReturn = (inputs: StockReturnInputs): StockReturnResults => {
  const { initialPrice, finalPrice, dividends, holdingPeriod } = inputs;
  
  const capitalGains = finalPrice - initialPrice;
  const dividendIncome = dividends.reduce((sum, div) => sum + div, 0);
  const totalReturn = capitalGains + dividendIncome;
  
  // Calculate annualized return using CAGR formula
  const totalReturnPercentage = (finalPrice + dividendIncome - initialPrice) / initialPrice;
  const annualizedReturn = (Math.pow(1 + totalReturnPercentage, 1 / holdingPeriod) - 1) * 100;

  return {
    totalReturn: Math.round(totalReturn * 100) / 100,
    annualizedReturn: Math.round(annualizedReturn * 100) / 100,
    capitalGains: Math.round(capitalGains * 100) / 100,
    dividendIncome: Math.round(dividendIncome * 100) / 100,
  };
};

export const calculateDividendYield = (inputs: DividendYieldInputs): DividendYieldResults => {
  const { stockPrice, annualDividend, payoutFrequency } = inputs;
  
  const dividendYield = (annualDividend / stockPrice) * 100;
  const monthlyIncome = annualDividend / 12;
  const annualIncome = annualDividend;

  // Calculate payout dates
  const today = new Date();
  const payoutSchedule: Date[] = [];
  const paymentsPerYear = {
    annual: 1,
    'semi-annual': 2,
    quarterly: 4,
    monthly: 12,
  }[payoutFrequency];

  for (let i = 0; i < paymentsPerYear; i++) {
    const payoutDate = new Date(today);
    payoutDate.setMonth(today.getMonth() + (12 / paymentsPerYear) * i);
    payoutSchedule.push(payoutDate);
  }

  return {
    dividendYield: Math.round(dividendYield * 100) / 100,
    monthlyIncome: Math.round(monthlyIncome * 100) / 100,
    annualIncome: Math.round(annualIncome * 100) / 100,
    payoutSchedule,
  };
};

export const calculateDividendReinvestment = (
  inputs: DividendReinvestmentInputs
): DividendReinvestmentResults => {
  const { initialInvestment, sharePrice, annualDividend, growthRate, years } = inputs;
  
  let currentShares = initialInvestment / sharePrice;
  let totalDividends = 0;
  const yearlyBreakdown = [];

  for (let year = 1; year <= years; year++) {
    const yearDividends = currentShares * annualDividend;
    totalDividends += yearDividends;
    
    // Reinvest dividends to buy more shares
    const newShares = yearDividends / (sharePrice * Math.pow(1 + growthRate / 100, year));
    currentShares += newShares;
    
    const currentValue = currentShares * sharePrice * Math.pow(1 + growthRate / 100, year);
    
    yearlyBreakdown.push({
      year,
      shares: Math.round(currentShares * 1000) / 1000,
      dividends: Math.round(yearDividends * 100) / 100,
      value: Math.round(currentValue * 100) / 100,
    });
  }

  const finalValue = currentShares * sharePrice * Math.pow(1 + growthRate / 100, years);

  return {
    finalValue: Math.round(finalValue * 100) / 100,
    totalDividends: Math.round(totalDividends * 100) / 100,
    totalShares: Math.round(currentShares * 1000) / 1000,
    yearlyBreakdown,
  };
};

export const calculateDCA = (inputs: DCAInputs): DCAResults => {
  const { monthlyInvestment, initialPrice, priceHistory, years } = inputs;
  
  let totalShares = 0;
  let totalInvested = 0;
  
  for (let i = 0; i < years * 12 && i < priceHistory.length; i++) {
    const price = priceHistory[i];
    const shares = monthlyInvestment / price;
    totalShares += shares;
    totalInvested += monthlyInvestment;
  }

  const currentPrice = priceHistory[priceHistory.length - 1];
  const currentValue = totalShares * currentPrice;
  const averageCost = totalInvested / totalShares;
  const returnOnInvestment = ((currentValue - totalInvested) / totalInvested) * 100;

  return {
    totalInvested: Math.round(totalInvested * 100) / 100,
    currentValue: Math.round(currentValue * 100) / 100,
    totalShares: Math.round(totalShares * 1000) / 1000,
    averageCost: Math.round(averageCost * 100) / 100,
    returnOnInvestment: Math.round(returnOnInvestment * 100) / 100,
  };
};

export const calculateBeta = (inputs: BetaInputs): BetaResults => {
  const { stockReturns, marketReturns, riskFreeRate } = inputs;
  
  // Calculate covariance
  const stockMean = stockReturns.reduce((sum, r) => sum + r, 0) / stockReturns.length;
  const marketMean = marketReturns.reduce((sum, r) => sum + r, 0) / marketReturns.length;
  
  let covariance = 0;
  let marketVariance = 0;
  
  for (let i = 0; i < stockReturns.length; i++) {
    covariance += (stockReturns[i] - stockMean) * (marketReturns[i] - marketMean);
    marketVariance += Math.pow(marketReturns[i] - marketMean, 2);
  }
  
  covariance /= stockReturns.length;
  marketVariance /= marketReturns.length;
  
  const beta = covariance / marketVariance;
  
  // Calculate correlation
  const stockStdDev = Math.sqrt(
    stockReturns.reduce((sum, r) => sum + Math.pow(r - stockMean, 2), 0) / stockReturns.length
  );
  const marketStdDev = Math.sqrt(marketVariance);
  const correlation = covariance / (stockStdDev * marketStdDev);
  
  // Calculate R-squared
  const rSquared = Math.pow(correlation, 2);

  return {
    beta: Math.round(beta * 100) / 100,
    correlation: Math.round(correlation * 100) / 100,
    rSquared: Math.round(rSquared * 100) / 100,
    standardDeviation: Math.round(stockStdDev * 100) / 100,
  };
};