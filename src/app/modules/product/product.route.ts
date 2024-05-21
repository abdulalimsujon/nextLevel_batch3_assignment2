import express from 'express';
import { productController } from './product.controller';
const router = express.Router();

router.post('/products', productController.createProductIntoDb);
router.get('/products', productController.getAllProduct);

export const productRoute = router;
