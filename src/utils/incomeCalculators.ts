import {
  SalaryInputs,
  SalaryResults,
  TaxWithholdingInputs,
  TaxWithholdingResults,
} from '../types/calculator';

export const calculateSalary = (inputs: SalaryInputs): SalaryResults => {
  const { hourlyRate, hoursPerWeek, weeksPerYear } = inputs;

  const weeklyPay = hourlyRate * hoursPerWeek;
  const biweeklySalary = weeklyPay * 2;
  const annualSalary = weeklyPay * weeksPerYear;
  const monthlySalary = annualSalary / 12;
  const dailyPay = weeklyPay / 5; // Assuming 5-day work week

  return {
    annualSalary: Math.round(annualSalary),
    monthlySalary: Math.round(monthlySalary),
    biweeklySalary: Math.round(biweeklySalary),
    weeklyPay: Math.round(weeklyPay),
    dailyPay: Math.round(dailyPay),
  };
};

export const calculateSelfEmploymentTax = (
  inputs: SelfEmploymentInputs
): SelfEmploymentResults => {
  const { netEarnings, expenses, otherIncome, businessMiles, homeOfficePercent } = inputs;

  // Calculate deductions
  const mileageDeduction = businessMiles * 0.655; // 2023 IRS rate
  const homeOfficeDeduction = (netEarnings * homeOfficePercent) / 100;
  const totalDeductions = expenses + mileageDeduction + homeOfficeDeduction;

  // Calculate taxable income
  const taxableIncome = Math.max(0, netEarnings - totalDeductions + otherIncome);

  // Calculate Social Security and Medicare taxes
  const socialSecurityTax = Math.min(taxableIncome * 0.124, 160200 * 0.124); // 2023 limit
  const medicareTax = taxableIncome * 0.029;
  const selfEmploymentTax = socialSecurityTax + medicareTax;

  // Calculate estimated quarterly tax (including income tax estimate)
  const estimatedIncomeTax = taxableIncome * 0.15; // Simplified estimate
  const estimatedQuarterlyTax = (selfEmploymentTax + estimatedIncomeTax) / 4;

  return {
    selfEmploymentTax: Math.round(selfEmploymentTax),
    socialSecurityTax: Math.round(socialSecurityTax),
    medicareTax: Math.round(medicareTax),
    taxableIncome: Math.round(taxableIncome),
    estimatedQuarterlyTax: Math.round(estimatedQuarterlyTax),
    deductions: Math.round(totalDeductions),
  };
};
export const calculateNetIncome = (inputs: NetIncomeInputs): NetIncomeResults => {
  const {
    grossIncome,
    retirement401k,
    healthInsurance,
    otherDeductions
  } = inputs;

  const monthlyGross = grossIncome / 12;
  const retirement = (grossIncome * (retirement401k / 100)) / 12;
  
  // Calculate taxes on income after 401(k) deduction
  const taxableIncome = grossIncome - (grossIncome * (retirement401k / 100));
  
  // Simplified tax calculations - in a real app, use actual tax brackets
  const federalTax = (taxableIncome * 0.22) / 12;
  const stateTax = (taxableIncome * 0.06) / 12;
  const socialSecurity = Math.min((grossIncome * 0.062) / 12, 147000 * 0.062 / 12);
  const medicare = (grossIncome * 0.0145) / 12;

  const totalDeductions = 
    federalTax +
    stateTax +
    socialSecurity +
    medicare +
    retirement +
    healthInsurance +
    otherDeductions;

  return {
    grossPay: Math.round(monthlyGross),
    federalTax: Math.round(federalTax),
    stateTax: Math.round(stateTax),
    socialSecurity: Math.round(socialSecurity),
    medicare: Math.round(medicare),
    retirement401k: Math.round(retirement),
    healthInsurance: Math.round(healthInsurance),
    otherDeductions: Math.round(otherDeductions),
    netPay: Math.round(monthlyGross - totalDeductions),
  };
};
export const calculateTaxWithholding = (
  inputs: TaxWithholdingInputs
): TaxWithholdingResults => {
  const { annualSalary, allowances, additionalWithholding } = inputs;
  const monthlySalary = annualSalary / 12;

  // These are simplified calculations for demonstration
  // In a real app, you'd need detailed tax tables and state-specific calculations
  const federalWithholding = (annualSalary * 0.22 - allowances * 4300) / 12;
  const stateWithholding = (annualSalary * 0.06) / 12;
  const socialSecurity = Math.min((annualSalary * 0.062) / 12, 147000 * 0.062 / 12);
  const medicare = (annualSalary * 0.0145) / 12;

  const totalWithholding =
    federalWithholding +
    stateWithholding +
    socialSecurity +
    medicare +
    additionalWithholding;

  return {
    federalWithholding: Math.round(federalWithholding),
    stateWithholding: Math.round(stateWithholding),
    socialSecurity: Math.round(socialSecurity),
    medicare: Math.round(medicare),
    totalWithholding: Math.round(totalWithholding),
    netPay: Math.round(monthlySalary - totalWithholding),
  };
};