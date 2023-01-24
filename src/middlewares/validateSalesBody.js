const validateSalesBody = async (req, res, next) => {
  if (!req.body.every((element) => Object.keys(element).includes('productId'))) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (!req.body.every((element) => Object.keys(element).includes('quantity'))) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

module.exports = validateSalesBody;