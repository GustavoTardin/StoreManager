const { productsModel } = require('../models');

const findAll = async () => {
  const result = await productsModel.findAll();
  return { type: null, message: result };
};

const findById = async (productId) => {
  const result = await productsModel.findById(productId);

  if (!result) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: result };
};

const insert = async (name) => {
  const idInserted = await productsModel.insert(name);
  const productInserted = await productsModel.findById(idInserted);
  return { type: null, message: productInserted };
};

module.exports = {
  findAll,
  findById,
  insert,
};