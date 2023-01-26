const normalGetAllResponse = [
  {
    date: 2023,
    sale_id: 1,
    product_id: 1,
    quantity: 50
  },
  {
    date: 2023,
    sale_id: 1,
    product_id: 2,
    quantity: 10
  },
  {
    date: 2023,
    sale_id: 2,
    product_id: 3,
    quantity: 15
  }
]

const findByIdResponse = [
  {
    date: 2023,
    product_id: 2,
    quantity: 9
  },
  {
    date: 2023,
    product_id: 3,
    quantity: 69
  }
]


module.exports = {
  normalGetAllResponse,
  findByIdResponse,
}