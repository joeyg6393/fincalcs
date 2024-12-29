import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { Sitemap } from './components/Sitemap';
import { SavingsGoalCalculator } from './pages/SavingsGoalCalculator';
import { BudgetPlannerCalculator } from './pages/BudgetPlannerCalculator';
import { EmergencyFundCalculator } from './pages/EmergencyFundCalculator';
import { CollegeSavingsCalculator } from './pages/CollegeSavingsCalculator';
import { RainyDayCalculator } from './pages/RainyDayCalculator';
import { LoanPayoffCalculator } from './pages/LoanPayoffCalculator';
import { DebtSnowballCalculator } from './pages/DebtSnowballCalculator';
import { DebtAvalancheCalculator } from './pages/DebtAvalancheCalculator';
import { DebtToIncomeCalculator } from './pages/DebtToIncomeCalculator';
import { SalaryCalculator } from './pages/SalaryCalculator';
import { TaxWithholdingCalculator } from './pages/TaxWithholdingCalculator';
import { NetIncomeCalculator } from './pages/NetIncomeCalculator';
import { SelfEmploymentTaxCalculator } from './pages/SelfEmploymentTaxCalculator';
import { CostOfLivingCalculator } from './pages/CostOfLivingCalculator';
import { SubscriptionManagementCalculator } from './pages/SubscriptionManagementCalculator';
import { VacationSavingsCalculator } from './pages/VacationSavingsCalculator';
import { EntertainmentBudgetCalculator } from './pages/EntertainmentBudgetCalculator';
import { MonthlyExpenseCalculator } from './pages/MonthlyExpenseCalculator';
import { MortgageCalculator } from './pages/MortgageCalculator';
import { InvestmentCalculator } from './pages/InvestmentCalculator';
import { RetirementCalculator } from './pages/RetirementCalculator';
import { MortgagePaymentCalculator } from './pages/MortgagePaymentCalculator';
import { RefinanceCalculator } from './pages/RefinanceCalculator';
import { HomeAffordabilityCalculator } from './pages/HomeAffordabilityCalculator';
import { RentVsBuyCalculator } from './pages/RentVsBuyCalculator';
import { RentalROICalculator } from './pages/RentalROICalculator';
import { ClosingCostCalculator } from './pages/ClosingCostCalculator';
import { PropertyAppreciationCalculator } from './pages/PropertyAppreciationCalculator';
import { ARMvsFixedCalculator } from './pages/ARMvsFixedCalculator';
import { CapRateCalculator } from './pages/CapRateCalculator';
import { InterestOnlyCalculator } from './pages/InterestOnlyCalculator';
import { StockReturnCalculator } from './pages/StockReturnCalculator';
import { DividendYieldCalculator } from './pages/DividendYieldCalculator';
import { DividendReinvestmentCalculator } from './pages/DividendReinvestmentCalculator';
import { DCACalculator } from './pages/DCACalculator';
import { BetaCalculator } from './pages/BetaCalculator';
import { AssetAllocationCalculator } from './pages/AssetAllocationCalculator';
import { PortfolioRebalancingCalculator } from './pages/PortfolioRebalancingCalculator';
import { SharpeRatioCalculator } from './pages/SharpeRatioCalculator';
import { CorrelationCalculator } from './pages/CorrelationCalculator';
import { CompoundInterestCalculator } from './pages/CompoundInterestCalculator';
import { SimpleInterestCalculator } from './pages/SimpleInterestCalculator';
import { Rule72Calculator } from './pages/Rule72Calculator';
import { BlackScholesCalculator } from './pages/BlackScholesCalculator';
import { CoveredCallCalculator } from './pages/CoveredCallCalculator';
import { PutCallParityCalculator } from './pages/PutCallParityCalculator';
import { ImpliedVolatilityCalculator } from './pages/ImpliedVolatilityCalculator';
import { PortfolioRiskCalculator } from './pages/PortfolioRiskCalculator';
import { FutureValueCalculator } from './pages/FutureValueCalculator';
import { InvestmentGrowthCalculator } from './pages/InvestmentGrowthCalculator';
import { SavingsCalculator } from './pages/SavingsCalculator';
import { CreditCardCalculator } from './pages/CreditCardCalculator';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/savings-goal" element={<SavingsGoalCalculator />} />
          <Route path="/budget-planner" element={<BudgetPlannerCalculator />} />
          <Route path="/emergency-fund" element={<EmergencyFundCalculator />} />
          <Route path="/college-savings" element={<CollegeSavingsCalculator />} />
          <Route path="/rainy-day-fund" element={<RainyDayCalculator />} />
          <Route path="/loan-payoff" element={<LoanPayoffCalculator />} />
          <Route path="/debt-snowball" element={<DebtSnowballCalculator />} />
          <Route path="/debt-avalanche" element={<DebtAvalancheCalculator />} />
          <Route path="/debt-to-income" element={<DebtToIncomeCalculator />} />
          <Route path="/salary" element={<SalaryCalculator />} />
          <Route path="/tax-withholding" element={<TaxWithholdingCalculator />} />
          <Route path="/net-income" element={<NetIncomeCalculator />} />
          <Route path="/self-employment-tax" element={<SelfEmploymentTaxCalculator />} />
          <Route path="/cost-of-living" element={<CostOfLivingCalculator />} />
          <Route path="/subscription-management" element={<SubscriptionManagementCalculator />} />
          <Route path="/vacation-savings" element={<VacationSavingsCalculator />} />
          <Route path="/entertainment-budget" element={<EntertainmentBudgetCalculator />} />
          <Route path="/monthly-expense" element={<MonthlyExpenseCalculator />} />
          <Route path="/mortgage" element={<MortgageCalculator />} />
          <Route path="/investment" element={<InvestmentCalculator />} />
          <Route path="/retirement" element={<RetirementCalculator />} />
          <Route path="/mortgage-payment" element={<MortgagePaymentCalculator />} />
          <Route path="/refinance" element={<RefinanceCalculator />} />
          <Route path="/home-affordability" element={<HomeAffordabilityCalculator />} />
          <Route path="/rent-vs-buy" element={<RentVsBuyCalculator />} />
          <Route path="/rental-roi" element={<RentalROICalculator />} />
          <Route path="/closing-costs" element={<ClosingCostCalculator />} />
          <Route path="/property-appreciation" element={<PropertyAppreciationCalculator />} />
          <Route path="/arm-vs-fixed" element={<ARMvsFixedCalculator />} />
          <Route path="/cap-rate" element={<CapRateCalculator />} />
          <Route path="/interest-only" element={<InterestOnlyCalculator />} />
          <Route path="/stock-return" element={<StockReturnCalculator />} />
          <Route path="/dividend-yield" element={<DividendYieldCalculator />} />
          <Route path="/dividend-reinvestment" element={<DividendReinvestmentCalculator />} />
          <Route path="/dca" element={<DCACalculator />} />
          <Route path="/beta" element={<BetaCalculator />} />
          <Route path="/asset-allocation" element={<AssetAllocationCalculator />} />
          <Route path="/portfolio-rebalancing" element={<PortfolioRebalancingCalculator />} />
          <Route path="/sharpe-ratio" element={<SharpeRatioCalculator />} />
          <Route path="/correlation" element={<CorrelationCalculator />} />
          <Route path="/compound-interest" element={<CompoundInterestCalculator />} />
          <Route path="/simple-interest" element={<SimpleInterestCalculator />} />
          <Route path="/rule-72" element={<Rule72Calculator />} />
          <Route path="/black-scholes" element={<BlackScholesCalculator />} />
          <Route path="/covered-call" element={<CoveredCallCalculator />} />
          <Route path="/put-call-parity" element={<PutCallParityCalculator />} />
          <Route path="/implied-volatility" element={<ImpliedVolatilityCalculator />} />
          <Route path="/portfolio-risk" element={<PortfolioRiskCalculator />} />
          <Route path="/future-value" element={<FutureValueCalculator />} />
          <Route path="/investment-growth" element={<InvestmentGrowthCalculator />} />
          <Route path="/savings" element={<SavingsCalculator />} />
          <Route path="/credit-card" element={<CreditCardCalculator />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;