const Application = require('../models/Application');
const calculateRisk = require('../services/riskService');

exports.createApplication = async (req, res) => {
  const result = calculateRisk(req.body);

  const application = await Application.create({
    ...req.body,
    riskScore: result.score,
    riskLevel: result.level,
    decision: result.decision,
    interestRate: result.rate
  });

  res.json(application);
};

exports.getApplications = async (req, res) => {
  const applications = await Application.find().sort({ createdAt: -1 });
  res.json(applications);
};
