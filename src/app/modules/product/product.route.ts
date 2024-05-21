import express from 'express';
import { productController } from './product.controller';
const router = express.Router();

router.post('/products', productController.createProductIntoDb);
router.get('/products', productController.getAllProduct);
router.get('/products/:productId', productController.searchByid);
router.delete('/products/:productId', productController.deleteByid);
router.put('/products/:productId', productController.updateProduct);

export const productRoute = router;
