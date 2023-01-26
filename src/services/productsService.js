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

const updateById = async (name, id) => {
  const result = await productsModel.updateById(name, id);
  if (result < 1) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  const productUpdated = await productsModel.findById(id);
  return { type: null, message: productUpdated };
};

const deleteById = async (id) => {
  const result = await productsModel.deleteById(id);
  if (result < 1) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: 'product deleted' };
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
  deleteById,
};