import { MortgageInputs, MortgageResults } from '../types/calculator';

export const calculateMortgage = (inputs: MortgageInputs): MortgageResults => {
  const { loanAmount, interestRate, loanTerm, downPayment } = inputs;
  
  const principal = loanAmount - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  const monthlyPayment =
    (principal *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - principal;

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    principalAmount: principal,
  };
};