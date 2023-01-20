const { productsService } = require('../services');

const findAll = async (_req, res) => {
  const { message } = await productsService.findAll();
  res.status(200).json(message);
}; 

const findById = async (req, res) => {
  const { id } = req.params;
  const { message } = await productsService.findById(id);
  res.status(200).json(message);
};

module.exports = {
  findAll,
  findById,
};