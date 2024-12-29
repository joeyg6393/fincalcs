import {
  CostOfLivingInputs,
  CostOfLivingResults,
  SubscriptionInputs,
  SubscriptionResults,
  VacationSavingsInputs,
  VacationSavingsResults,
  EntertainmentBudgetInputs,
  EntertainmentBudgetResults,
  MonthlyExpenseInputs,
  MonthlyExpenseResults,
} from '../types/calculator';

// Cost of living multipliers (simplified for demo)
const cityMultipliers: { [key: string]: number } = {
  'New York': 1.8,
  'San Francisco': 1.9,
  'Los Angeles': 1.5,
  'Chicago': 1.2,
  'Houston': 1.0,
  'Phoenix': 1.1,
  'Philadelphia': 1.3,
  'Dallas': 1.1,
  'Austin': 1.2,
  'Denver': 1.3,
};

export const calculateCostOfLiving = (
  inputs: CostOfLivingInputs
): CostOfLivingResults => {
  const currentMultiplier = cityMultipliers[inputs.currentCity] || 1;
  const newMultiplier = cityMultipliers[inputs.newCity] || 1;
  const ratio = newMultiplier / currentMultiplier;

  const rentDifference = inputs.currentRent * (ratio - 1);
  const utilitiesDifference = inputs.currentUtilities * (ratio - 1);
  const groceriesDifference = inputs.currentGroceries * (ratio - 1);
  const transportationDifference = inputs.currentTransportation * (ratio - 1);

  const totalDifference =
    rentDifference +
    utilitiesDifference +
    groceriesDifference +
    transportationDifference;

  return {
    requiredIncome: Math.round(inputs.currentIncome * ratio),
    rentDifference: Math.round(rentDifference),
    utilitiesDifference: Math.round(utilitiesDifference),
    groceriesDifference: Math.round(groceriesDifference),
    transportationDifference: Math.round(transportationDifference),
    totalDifference: Math.round(totalDifference),
    percentageDifference: Math.round((ratio - 1) * 100),
  };
};

export const calculateSubscriptions = (
  inputs: SubscriptionInputs
): SubscriptionResults => {
  const categoryTotals = new Map<string, { monthly: number; yearly: number }>();

  inputs.subscriptions.forEach((sub) => {
    const monthly = sub.billingCycle === 'yearly' ? sub.cost / 12 : sub.cost;
    const yearly = sub.billingCycle === 'monthly' ? sub.cost * 12 : sub.cost;

    const current = categoryTotals.get(sub.category) || { monthly: 0, yearly: 0 };
    categoryTotals.set(sub.category, {
      monthly: current.monthly + monthly,
      yearly: current.yearly + yearly,
    });
  });

  const monthlyTotal = Array.from(categoryTotals.values()).reduce(
    (sum, val) => sum + val.monthly,
    0
  );

  const yearlyTotal = Array.from(categoryTotals.values()).reduce(
    (sum, val) => sum + val.yearly,
    0
  );

  const categoryBreakdown = Array.from(categoryTotals.entries()).map(
    ([category, totals]) => ({
      category,
      monthlyAmount: Math.round(totals.monthly),
      yearlyAmount: Math.round(totals.yearly),
      percentage: Math.round((totals.yearly / yearlyTotal) * 100),
    })
  );

  return {
    monthlyTotal: Math.round(monthlyTotal),
    yearlyTotal: Math.round(yearlyTotal),
    categoryBreakdown,
  };
};

export const calculateVacationSavings = (
  inputs: VacationSavingsInputs
): VacationSavingsResults => {
  const totalCost =
    inputs.travelCost +
    inputs.accommodationCost +
    inputs.activities +
    inputs.food +
    inputs.miscExpenses;

  const today = new Date();
  const weeksUntilTrip = Math.ceil(
    (inputs.startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 7)
  );

  const remainingAmount = totalCost - inputs.currentSavings;
  const monthlyRequired = (remainingAmount / weeksUntilTrip) * 4.33;

  return {
    totalCost: Math.round(totalCost),
    monthlyRequired: Math.round(monthlyRequired),
    weeksUntilTrip,
    savingsProgress: Math.round((inputs.currentSavings / totalCost) * 100),
    breakdown: {
      travel: Math.round(inputs.travelCost),
      accommodation: Math.round(inputs.accommodationCost),
      activities: Math.round(inputs.activities),
      food: Math.round(inputs.food),
      misc: Math.round(inputs.miscExpenses),
    },
  };
};

export const calculateEntertainmentBudget = (
  inputs: EntertainmentBudgetInputs
): EntertainmentBudgetResults => {
  const { monthlyIncome, categories } = inputs;
  const totalBudget = Object.values(categories).reduce((sum, val) => sum + val, 0);
  const percentageOfIncome = (totalBudget / monthlyIncome) * 100;

  const categoryBreakdown = Object.entries(categories).map(([category, amount]) => ({
    category,
    amount,
    percentage: Math.round((amount / totalBudget) * 100),
  }));

  const recommendations = [];
  if (percentageOfIncome > 30) {
    recommendations.push('Consider reducing entertainment spending');
  }
  if (categories.streaming > totalBudget * 0.3) {
    recommendations.push('Review streaming subscriptions for potential savings');
  }
  if (categories.dining > totalBudget * 0.4) {
    recommendations.push('Look for ways to reduce dining out expenses');
  }

  return {
    totalBudget: Math.round(totalBudget),
    percentageOfIncome: Math.round(percentageOfIncome),
    categoryBreakdown,
    recommendations,
  };
};

export const calculateMonthlyExpenses = (
  inputs: MonthlyExpenseInputs
): MonthlyExpenseResults => {
  const { income, expenses } = inputs;
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const categoryTotals = new Map<string, number>();
  expenses.forEach((exp) => {
    const current = categoryTotals.get(exp.category) || 0;
    categoryTotals.set(exp.category, current + exp.amount);
  });

  const expensesByCategory = Array.from(categoryTotals.entries()).map(
    ([category, total]) => ({
      category,
      total,
      percentage: Math.round((total / totalExpenses) * 100),
    })
  );

  const upcomingExpenses = expenses
    .filter((exp) => exp.dueDate)
    .map((exp) => ({
      name: exp.name,
      amount: exp.amount,
      dueDate: exp.dueDate!,
    }))
    .sort((a, b) => a.dueDate - b.dueDate);

  return {
    totalExpenses: Math.round(totalExpenses),
    remainingIncome: Math.round(income - totalExpenses),
    expensesByCategory,
    upcomingExpenses,
  };
};