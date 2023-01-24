const { salesModel } = require('../models');

const getAll = async () => {
  const result = await salesModel.getAll();
  return { type: null, message: result };
};

const findById = async (id) => {
  const result = await salesModel.findById(id);
  console.log(result);
  if (!result) return { type: 'PRODUCT_NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: result };
};

const insertSales = async (arrayBody) => {
  const verifyQuantities = arrayBody.filter((element) => element.quantity < 1);
  if (verifyQuantities.length > 0) {
    return {
      type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1' };
  }
  const promise = await arrayBody.map((b) => salesModel.findById(b.productId));
  const products = await Promise.all(promise);
 
  if (products.some((e) => !e)) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

   const insertedId = await salesModel.insert(arrayBody);
  return { type: null, message: insertedId };
};

module.exports = {
  getAll,
  findById,
  insertSales,
};