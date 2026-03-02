const form = document.getElementById('form');
const errorEl = document.getElementById('error');
const resultEl = document.getElementById('result');
const submitBtn = document.getElementById('submitBtn');
const spinner = document.getElementById('spinner');
const btnText = document.getElementById('btnText');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  errorEl.textContent = '';
  resultEl.innerHTML = '';

  // simple front-end validation
  const values = {
    income: +income.value,
    expenses: +expenses.value,
    existingDebt: +debt.value,
    employmentYears: +employment.value,
    creditScore: +credit.value,
    loanAmount: +loan.value,
    loanTerm: +term.value
  };

  for (let key in values) {
    if (isNaN(values[key]) || values[key] < 0) {
      errorEl.textContent = 'Please fill out all fields with valid numbers.';
      return;
    }
  }

  // show loading state
  submitBtn.disabled = true;
  spinner.hidden = false;
  btnText.textContent = 'Evaluating';

  try {
    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values)
    });

    if (!res.ok) throw new Error('Server error');

    const result = await res.json();

    resultEl.innerHTML = `
      <h2>Decision: ${result.decision}</h2>
      <p><strong>Risk Score:</strong> ${result.riskScore}</p>
      <p><strong>Risk Level:</strong> ${result.riskLevel}</p>
      <p><strong>Interest Rate:</strong> ${result.interestRate}%</p>
    `;
  } catch (err) {
    errorEl.textContent = 'Unable to get a decision. Please try again later.';
    console.error(err);
  } finally {
    submitBtn.disabled = false;
    spinner.hidden = true;
    btnText.textContent = 'Evaluate';
  }
});
