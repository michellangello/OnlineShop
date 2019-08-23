const express = require('express');
const router = express.Router();
const upload = require(`../middlewares/uploadMiddleware`);
const productController = require("../controllers/products.controller");


router.get('/', productController.getSortedProducts);
router.post('/', upload.array('images', 10), productController.createProduct);


module.exports = router;

