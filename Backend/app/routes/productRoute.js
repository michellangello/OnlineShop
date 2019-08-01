const express = require('express');
const router = express.Router();
const upload = require(`../middlewares/uploadMiddleware`);
const productController = require("../controllers/productController");


router.get('/', productController.getSortedProducts);
router.post('/', upload.array('images', 10), productController.createProduct);
router.post('/init', productController.initProductss)


module.exports = router;

