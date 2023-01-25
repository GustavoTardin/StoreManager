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
  // const array = result[1][0];
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
  // console.log(a);
 // console.log(insertId);

  return insertId;
};

module.exports = {
  getAll,
  findById,
  insert,
};