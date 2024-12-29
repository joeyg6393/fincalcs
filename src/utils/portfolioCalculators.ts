import {
  AssetAllocationInputs,
  AssetAllocationResults,
  PortfolioRebalancingInputs,
  PortfolioRebalancingResults,
  SharpeRatioInputs,
  SharpeRatioResults,
  CorrelationInputs,
  CorrelationResults,
  PortfolioRiskInputs,
  PortfolioRiskResults,
} from '../types/calculator';

export const calculateAssetAllocation = (
  inputs: AssetAllocationInputs
): AssetAllocationResults => {
  const {
    riskTolerance,
    investmentHorizon,
    currentAge,
    retirementAge,
    portfolioValue,
  } = inputs;

  // Base allocation based on risk tolerance
  let stocks = riskTolerance;
  let bonds = 90 - riskTolerance;
  let cash = 10;
  let other = 0;

  // Adjust for investment horizon
  if (investmentHorizon > 15) {
    stocks += 5;
    bonds -= 5;
  } else if (investmentHorizon < 5) {
    stocks -= 10;
    bonds += 5;
    cash += 5;
  }

  // Adjust for age
  const yearsToRetirement = retirementAge - currentAge;
  if (yearsToRetirement < 10) {
    stocks -= 10;
    bonds += 5;
    cash += 5;
  }

  // Adjust for portfolio size
  if (portfolioValue > 1000000) {
    other = 10;
    stocks -= 5;
    bonds -= 5;
  }

  // Ensure allocations are within reasonable bounds
  stocks = Math.max(0, Math.min(100, stocks));
  bonds = Math.max(0, Math.min(100, bonds));
  cash = Math.max(0, Math.min(100, cash));
  other = Math.max(0, Math.min(100, other));

  // Normalize to ensure total is 100%
  const total = stocks + bonds + cash + other;
  stocks = Math.round((stocks / total) * 100);
  bonds = Math.round((bonds / total) * 100);
  cash = Math.round((cash / total) * 100);
  other = Math.round((other / total) * 100);

  // Generate recommendations
  const recommendations = [];
  if (stocks > 70) {
    recommendations.push('Consider diversifying into more defensive stocks given the high equity allocation.');
  }
  if (bonds < 20 && currentAge > 50) {
    recommendations.push('Consider increasing bond allocation for more stability as you near retirement.');
  }
  if (cash > 15) {
    recommendations.push('Consider investing some cash holdings to protect against inflation.');
  }
  if (other > 0) {
    recommendations.push('Consider alternative investments like REITs or commodities for diversification.');
  }

  return {
    stocks,
    bonds,
    cash,
    other,
    recommendations,
  };
};

export const calculatePortfolioRebalancing = (
  inputs: PortfolioRebalancingInputs
): PortfolioRebalancingResults => {
  const { targetAllocations, currentHoldings } = inputs;
  
  // Calculate total portfolio value
  const totalValue = Object.values(currentHoldings).reduce(
    (sum, holding) => sum + holding.value,
    0
  );
  
  // Calculate current allocations
  const currentAllocations = Object.entries(currentHoldings).reduce(
    (acc, [asset, holding]) => ({
      ...acc,
      [asset]: Math.round((holding.value / totalValue) * 100),
    }),
    {}
  );
  
  // Calculate required trades
  const trades = Object.entries(targetAllocations).map(([asset, targetPct]) => {
    const currentValue = currentHoldings[asset].value;
    const targetValue = (totalValue * targetPct) / 100;
    const difference = targetValue - currentValue;
    const shares = Math.round(Math.abs(difference) / currentHoldings[asset].price);
    
    return {
      asset,
      action: difference > 0 ? 'buy' : 'sell',
      shares,
      amount: Math.abs(difference),
    };
  }).filter(trade => trade.shares > 0);

  return {
    trades,
    newAllocations: targetAllocations,
    totalValue,
  };
};

export const calculateSharpeRatio = (
  inputs: SharpeRatioInputs
): SharpeRatioResults => {
  const { returns, riskFreeRate, period } = inputs;
  
  // Calculate average return
  const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
  
  // Calculate standard deviation
  const variance = returns.reduce(
    (sum, r) => sum + Math.pow(r - avgReturn, 2),
    0
  ) / returns.length;
  const standardDeviation = Math.sqrt(variance);
  
  // Calculate excess return
  const excessReturn = avgReturn - riskFreeRate;
  
  // Calculate Sharpe ratio
  const sharpeRatio = excessReturn / standardDeviation;
  
  // Annualize based on period
  const periodsPerYear = {
    daily: 252,
    monthly: 12,
    annual: 1,
  }[period];
  
  const annualizedSharpe = sharpeRatio * Math.sqrt(periodsPerYear);

  return {
    sharpeRatio: Math.round(sharpeRatio * 100) / 100,
    excessReturn: Math.round(excessReturn * 100) / 100,
    standardDeviation: Math.round(standardDeviation * 100) / 100,
    annualizedSharpe: Math.round(annualizedSharpe * 100) / 100,
  };
};

export const calculateCorrelation = (
  inputs: CorrelationInputs
): CorrelationResults => {
  const { asset1Returns, asset2Returns, period } = inputs;
  
  // Calculate means
  const mean1 = asset1Returns.reduce((sum, r) => sum + r, 0) / asset1Returns.length;
  const mean2 = asset2Returns.reduce((sum, r) => sum + r, 0) / asset2Returns.length;
  
  // Calculate covariance and variances
  let covariance = 0;
  let variance1 = 0;
  let variance2 = 0;
  
  for (let i = 0; i < asset1Returns.length; i++) {
    const diff1 = asset1Returns[i] - mean1;
    const diff2 = asset2Returns[i] - mean2;
    covariance += diff1 * diff2;
    variance1 += diff1 * diff1;
    variance2 += diff2 * diff2;
  }
  
  covariance /= asset1Returns.length;
  variance1 /= asset1Returns.length;
  variance2 /= asset2Returns.length;
  
  // Calculate correlation
  const correlation = covariance / Math.sqrt(variance1 * variance2);
  
  // Calculate R-squared
  const rSquared = Math.pow(correlation, 2) * 100;
  
  // Calculate significance (simplified t-test)
  const n = asset1Returns.length;
  const t = Math.abs(correlation * Math.sqrt((n - 2) / (1 - correlation * correlation)));
  const significance = (1 - 2 * (1 - normalCDF(t))) * 100;

  return {
    correlation: Math.round(correlation * 100) / 100,
    rSquared: Math.round(rSquared * 100) / 100,
    covariance: Math.round(covariance * 100) / 100,
    significance: Math.round(significance * 100) / 100,
  };
};

// Helper function for normal cumulative distribution
function normalCDF(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp(-x * x / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - p : p;
}

export const calculatePortfolioRisk = (
  inputs: PortfolioRiskInputs
): PortfolioRiskResults => {
  const { assets, riskFreeRate } = inputs;
  
  // Normalize weights to sum to 100%
  const totalWeight = assets.reduce((sum, asset) => sum + asset.weight, 0);
  const normalizedAssets = assets.map(asset => ({
    ...asset,
    weight: asset.weight / totalWeight,
  }));

  // Calculate portfolio return
  const portfolioReturn = normalizedAssets.reduce((sum, asset) => {
    const avgReturn = asset.returns.reduce((s, r) => s + r, 0) / asset.returns.length;
    return sum + (avgReturn * asset.weight);
  }, 0);

  // Calculate portfolio variance and risk
  let portfolioVariance = 0;
  for (let i = 0; i < normalizedAssets.length; i++) {
    for (let j = 0; j < normalizedAssets.length; j++) {
      const asset1 = normalizedAssets[i];
      const asset2 = normalizedAssets[j];
      const covariance = calculateCovariance(asset1.returns, asset2.returns);
      portfolioVariance += asset1.weight * asset2.weight * covariance;
    }
  }
  const portfolioRisk = Math.sqrt(portfolioVariance);

  // Calculate Sharpe Ratio
  const excessReturn = portfolioReturn - riskFreeRate;
  const sharpeRatio = excessReturn / portfolioRisk;

  // Calculate Value at Risk (VaR) at 95% confidence level
  const z = 1.645; // Z-score for 95% confidence
  const varFivePercent = z * portfolioRisk;

  // Calculate Maximum Drawdown
  const cumulativeReturns = assets[0].returns.map((_, i) => {
    return normalizedAssets.reduce((sum, asset) => {
      return sum + (asset.returns[i] * asset.weight);
    }, 0);
  });

  let maxDrawdown = 0;
  let peak = cumulativeReturns[0];
  
  for (let i = 1; i < cumulativeReturns.length; i++) {
    if (cumulativeReturns[i] > peak) {
      peak = cumulativeReturns[i];
    } else {
      const drawdown = (peak - cumulativeReturns[i]) / peak * 100;
      maxDrawdown = Math.max(maxDrawdown, drawdown);
    }
  }

  return {
    portfolioReturn: Math.round(portfolioReturn * 100) / 100,
    portfolioRisk: Math.round(portfolioRisk * 100) / 100,
    sharpeRatio: Math.round(sharpeRatio * 100) / 100,
    varFivePercent: Math.round(varFivePercent * 100) / 100,
    maxDrawdown: Math.round(maxDrawdown * 100) / 100,
  };
};

// Helper function to calculate covariance between two return series
function calculateCovariance(returns1: number[], returns2: number[]): number {
  const mean1 = returns1.reduce((sum, r) => sum + r, 0) / returns1.length;
  const mean2 = returns2.reduce((sum, r) => sum + r, 0) / returns2.length;
  
  let covariance = 0;
  for (let i = 0; i < returns1.length; i++) {
    covariance += (returns1[i] - mean1) * (returns2[i] - mean2);
  }
  
  return covariance / returns1.length;
}