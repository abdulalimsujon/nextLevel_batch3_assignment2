import express from 'express';
import { orderController } from './Order.controller';

const router = express.Router();

router.post('/orders', orderController.createOrders);

export const orderRoute = router;
