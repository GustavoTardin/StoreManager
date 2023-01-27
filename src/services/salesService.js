const { salesModel, productsModel } = require('../models');
const validateQuantity = require('./validations/validateQuantity');

const getAll = async () => {
  const result = await salesModel.getAll();
  return { type: null, message: result };
};

const findById = async (id) => {
  const result = await salesModel.findById(id);
  if (result.length < 1) return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: result };
};

const insertSales = async (arrayBody) => {
  if (await validateQuantity(arrayBody) === false) {
    return { type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' };
  }
  
  const promise = await arrayBody.map((b) => productsModel.findById(b.productId));
  const products = await Promise.all(promise);
 
  if (products.some((e) => !e)) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

   const insertedId = await salesModel.insert(arrayBody);
  return { type: null, message: insertedId };
};

const deleteById = async (id) => {
  const result = await salesModel.deleteById(id);
  if (result < 1) return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: 'product deleted' };
};

const updateById = async (arrayBody, id) => {
  const sale = await salesModel.findById(id);
  if (sale.length < 1) return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };

  if (await validateQuantity(arrayBody) === false) {
    return { type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' };
  }

  const products = await Promise.all(arrayBody.map((e) => productsModel.findById(e.productId)));
  if (products.some((e) => !e)) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const result = await salesModel.updateById(arrayBody, id);
  const changesQuantity = result.filter((e) => e[0].affectedRows > 0);

  if (changesQuantity.length !== arrayBody.length) {
    return { type: 'SALE_PRODUCT_NOT_FOUND', message: 'There is no sale of this product' };
  }

  return { type: null, message: result };
};

module.exports = {
  getAll,
  findById,
  insertSales,
  deleteById,
  updateById,
};