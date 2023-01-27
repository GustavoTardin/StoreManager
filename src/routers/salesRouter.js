const express = require('express');
const { salesController } = require('../controllers');
const { validateSalesBody } = require('../middlewares');

const router = express.Router();

router.get('/', salesController.getAll);
router.get('/:id', salesController.findById);
router.post('/', validateSalesBody, salesController.insertSales);
router.delete('/:id', salesController.deleteById);
router.put('/:id', validateSalesBody, salesController.updateById);

module.exports = router;