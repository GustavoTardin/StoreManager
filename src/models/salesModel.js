// const camelize = require('camelize');
const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.sales');
  return camelize(result);
};

const findById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return camelize(result);
};

const insert = async (arrayBody) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES () ',
  );
 
  await arrayBody.forEach((b) => {
    connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, b.productId, b.quantity],
    );
  });
  return insertId;
};

module.exports = {
  getAll,
  findById,
  insert,
};