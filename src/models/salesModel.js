// const camelize = require('camelize');
const camelize = require('camelize');
const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT s.date, sp.sale_id, sp.product_id, sp.quantity  FROM StoreManager.sales_products AS sp
INNER JOIN StoreManager.sales AS s
ON sp.sale_id = s.id;`,
  );
  return camelize(result);
};

const findById = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, sp.product_id, sp.quantity FROM StoreManager.sales_products AS sp
INNER JOIN StoreManager.sales AS s
ON sp.sale_id = s.id
WHERE s.id = ?;`,
    [id],
  );
 
  return camelize(result);
};

const insert = async (arrayBody) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUES () ',
  );
 
  const promise = await arrayBody.map((b) => connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, b.productId, b.quantity],
  ));
 await Promise.all(promise);

  return insertId;
};

const deleteById = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return affectedRows;
};

const updateById = async (arrayBody, id) => {
  const promise = await arrayBody.map((e) => connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE product_id = ? AND sale_id = ?',
    [e.quantity, e.productId, id],
  ));
  const affectedRows = await Promise.all(promise);
  return affectedRows;
};

module.exports = {
  getAll,
  findById,
  insert,
  deleteById,
  updateById,
};