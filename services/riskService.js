function calculateRisk(data) {
  const { income, expenses, existingDebt, employmentYears, creditScore, loanAmount, loanTerm } = data;

  const disposable = income - expenses - existingDebt;
  const dti = (existingDebt / income) * 100;
  const installment = loanAmount / loanTerm;
  const installmentRatio = (installment / income) * 100;

  if (disposable < 0 || creditScore < 500 || dti > 65 || installment > disposable) {
    return { score: 0, level: "High Risk", decision: "Rejected", rate: 22 };
  }

  let score = 0;

  if (creditScore >= 750) score += 30;
  else if (creditScore >= 700) score += 25;
  else if (creditScore >= 650) score += 20;
  else if (creditScore >= 600) score += 10;

  if (dti < 30) score += 25;
  else if (dti < 40) score += 20;
  else if (dti < 50) score += 10;

  if (employmentYears >= 5) score += 15;
  else if (employmentYears >= 3) score += 10;
  else if (employmentYears >= 1) score += 5;

  if (disposable > 10000) score += 15;
  else if (disposable > 5000) score += 10;
  else if (disposable > 1000) score += 5;

  if (installmentRatio < 20) score += 15;
  else if (installmentRatio < 30) score += 10;
  else if (installmentRatio < 40) score += 5;

  let level, decision, rate;

  if (score >= 75) {
    level = "Low Risk";
    decision = "Approved";
    rate = 10;
  } else if (score >= 50) {
    level = "Medium Risk";
    decision = "Conditionally Approved";
    rate = 15;
  } else {
    level = "High Risk";
    decision = "Rejected";
    rate = 22;
  }

  return { score, level, decision, rate };
}

module.exports = calculateRisk;
