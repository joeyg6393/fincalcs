import {
  BlackScholesInputs,
  BlackScholesResults,
  CoveredCallInputs,
  CoveredCallResults,
  PutCallParityInputs,
  PutCallParityResults,
  ImpliedVolatilityInputs,
  ImpliedVolatilityResults,
} from '../types/calculator';

// Standard normal cumulative distribution function
function normalCDF(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp(-x * x / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - p : p;
}

// Standard normal probability density function
function normalPDF(x: number): number {
  return Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
}

export const calculateBlackScholes = (inputs: BlackScholesInputs): BlackScholesResults => {
  const { stockPrice, strikePrice, timeToExpiry, riskFreeRate, volatility, optionType } = inputs;
  
  const d1 = (Math.log(stockPrice / strikePrice) + 
    (riskFreeRate / 100 + Math.pow(volatility / 100, 2) / 2) * timeToExpiry) / 
    (volatility / 100 * Math.sqrt(timeToExpiry));
  
  const d2 = d1 - (volatility / 100) * Math.sqrt(timeToExpiry);
  
  let optionPrice;
  if (optionType === 'call') {
    optionPrice = stockPrice * normalCDF(d1) - 
      strikePrice * Math.exp(-(riskFreeRate / 100) * timeToExpiry) * normalCDF(d2);
  } else {
    optionPrice = strikePrice * Math.exp(-(riskFreeRate / 100) * timeToExpiry) * normalCDF(-d2) - 
      stockPrice * normalCDF(-d1);
  }

  // Calculate Greeks
  const delta = optionType === 'call' ? normalCDF(d1) : normalCDF(d1) - 1;
  const gamma = normalPDF(d1) / (stockPrice * volatility / 100 * Math.sqrt(timeToExpiry));
  const theta = (-stockPrice * normalPDF(d1) * volatility / 100) / (2 * Math.sqrt(timeToExpiry)) -
    (optionType === 'call' ? 1 : -1) * riskFreeRate / 100 * strikePrice * 
    Math.exp(-(riskFreeRate / 100) * timeToExpiry) * normalCDF(optionType === 'call' ? d2 : -d2);
  const vega = stockPrice * Math.sqrt(timeToExpiry) * normalPDF(d1) / 100;
  const rho = (optionType === 'call' ? 1 : -1) * strikePrice * timeToExpiry * 
    Math.exp(-(riskFreeRate / 100) * timeToExpiry) * normalCDF(optionType === 'call' ? d2 : -d2) / 100;

  return {
    optionPrice: Math.round(optionPrice * 100) / 100,
    delta: Math.round(delta * 100) / 100,
    gamma: Math.round(gamma * 10000) / 10000,
    theta: Math.round(theta * 100) / 100,
    vega: Math.round(vega * 100) / 100,
    rho: Math.round(rho * 100) / 100,
  };
};

export const calculateCoveredCall = (inputs: CoveredCallInputs): CoveredCallResults => {
  const { stockPrice, strikePrice, premium, contracts, daysToExpiry } = inputs;
  
  const maxProfit = (strikePrice - stockPrice + premium) * contracts * 100;
  const maxLoss = stockPrice * contracts * 100;
  const breakeven = stockPrice - premium;
  const returnIfUnchanged = (premium / stockPrice) * 100;
  const annualizedReturn = (returnIfUnchanged * 365) / daysToExpiry;

  return {
    maxProfit: Math.round(maxProfit * 100) / 100,
    maxLoss: Math.round(maxLoss * 100) / 100,
    breakeven: Math.round(breakeven * 100) / 100,
    returnIfUnchanged: Math.round(returnIfUnchanged * 100) / 100,
    annualizedReturn: Math.round(annualizedReturn * 100) / 100,
  };
};

export const calculatePutCallParity = (inputs: PutCallParityInputs): PutCallParityResults => {
  const { callPrice, putPrice, stockPrice, strikePrice, riskFreeRate, timeToExpiry } = inputs;
  
  const presentValueStrike = strikePrice * Math.exp(-(riskFreeRate / 100) * timeToExpiry);
  const parityValue = callPrice - putPrice - stockPrice + presentValueStrike;
  const deviation = Math.abs(parityValue);
  const arbitrageOpportunity = deviation > 0.5; // Threshold for significant deviation

  let recommendedAction = '';
  if (arbitrageOpportunity) {
    if (parityValue > 0) {
      recommendedAction = 'Buy stock and put, sell call and bonds';
    } else {
      recommendedAction = 'Sell stock and put, buy call and bonds';
    }
  } else {
    recommendedAction = 'No significant arbitrage opportunity';
  }

  return {
    parityValue: Math.round(parityValue * 100) / 100,
    deviation: Math.round(deviation * 100) / 100,
    arbitrageOpportunity,
    recommendedAction,
  };
};

export const calculateImpliedVolatility = (
  inputs: ImpliedVolatilityInputs
): ImpliedVolatilityResults => {
  const { optionPrice, stockPrice, strikePrice, timeToExpiry, riskFreeRate, optionType } = inputs;
  
  // Newton-Raphson method to find implied volatility
  let volatility = 30; // Initial guess
  let impliedVol = volatility;
  
  for (let i = 0; i < 100; i++) {
    const bsResult = calculateBlackScholes({
      stockPrice,
      strikePrice,
      timeToExpiry,
      riskFreeRate,
      volatility,
      optionType,
    });
    
    const diff = bsResult.optionPrice - optionPrice;
    if (Math.abs(diff) < 0.0001) {
      impliedVol = volatility;
      break;
    }
    
    volatility = volatility - diff / (bsResult.vega * 100);
    if (volatility < 1 || volatility > 200) {
      impliedVol = NaN;
      break;
    }
  }

  const annualizedVol = impliedVol;
  const confidenceInterval = {
    lower: Math.max(0, annualizedVol - annualizedVol * 0.2),
    upper: annualizedVol + annualizedVol * 0.2,
  };

  // Compare to historical average
  const historicalComparison = 20; // Example historical volatility

  return {
    impliedVolatility: Math.round(impliedVol * 100) / 100,
    annualizedVolatility: Math.round(annualizedVol * 100) / 100,
    confidenceInterval: {
      lower: Math.round(confidenceInterval.lower * 100) / 100,
      upper: Math.round(confidenceInterval.upper * 100) / 100,
    },
    historicalComparison: Math.round(historicalComparison * 100) / 100,
  };
};