document.getElementById('form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const data = {
    income: +income.value,
    expenses: +expenses.value,
    existingDebt: +debt.value,
    employmentYears: +employment.value,
    creditScore: +credit.value,
    loanAmount: +loan.value,
    loanTerm: +term.value
  };

  const res = await fetch('/api/applications', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });

  const result = await res.json();

  document.getElementById('result').innerHTML = `
    <h2>Decision: ${result.decision}</h2>
    <p>Risk Score: ${result.riskScore}</p>
    <p>Risk Level: ${result.riskLevel}</p>
    <p>Interest Rate: ${result.interestRate}%</p>
  `;
});
