const express = require('express');

const router = express.Router();

const { productsController } = require('../controllers');
const validateName = require('../middlewares/validateName');

router.get('/', productsController.findAll);

router.get('/:id', productsController.findById);

router.post('/', validateName, productsController.insert);
router.put('/:id', validateName, productsController.updateById);
router.delete('/:id', productsController.deleteById);

module.exports = router;