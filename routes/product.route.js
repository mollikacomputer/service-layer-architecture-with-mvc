const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.route('/')
.get(productController.getProduct)
.post(productController.createProduct)



router.route('/bulk-update')
.patch(productController.bulkUpdateProduct)

// update product dynamic id bulk update ar pore  pore dite hobe
// ডায়নামিক ্আইডি সবার শেষে দিতে হবে
router.route('/:id')
.patch(productController.updateProduct)
module.exports = router;