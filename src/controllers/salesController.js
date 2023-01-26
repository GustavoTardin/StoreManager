const { salesService } = require('../services');
const errorTypes = require('../utils/errorTypes');

const getAll = async (_req, res) => {
  const { message } = await salesService.getAll();
  return res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findById(id);
  if (type) return res.status(errorTypes.mapError(type)).json({ message });
  return res.status(200).json(message);
};

const insertSales = async (req, res) => {
  const { type, message } = await salesService.insertSales(req.body);
  if (type) return res.status(errorTypes.mapError(type)).json({ message });
  const objectResponse = {
    id: message,
    itemsSold: req.body,
  };
  res.status(201).json(objectResponse);
};

module.exports = {
  getAll,
  findById,
  insertSales,
};