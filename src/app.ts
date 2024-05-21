import express, { Application } from 'express';
import cors from 'cors';
import { productRoute } from './app/modules/product/product.route';
import { orderRoute } from './app/modules/Order/Order.route';

const app: Application = express();
//parsers
app.use(express.json());
app.use(cors());

//enpoints
app.use('/api', productRoute);
app.use('/api', orderRoute);

export default app;
