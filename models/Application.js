const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  income: Number,
  expenses: Number,
  existingDebt: Number,
  employmentYears: Number,
  creditScore: Number,
  loanAmount: Number,
  loanTerm: Number,
  riskScore: Number,
  riskLevel: String,
  decision: String,
  interestRate: Number
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
