const express = require('express');

const router = express.Router();

const { productsController } = require('../controllers');

router.get('/', productsController.findAll);

router.get('/:id', productsController.findById);

module.exports = router;