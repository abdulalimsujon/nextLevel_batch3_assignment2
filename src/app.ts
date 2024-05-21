import express, { Application } from 'express';
import cors from 'cors';
import { productRoute } from './app/modules/product/product.route';
import { orderRoute } from './app/modules/Order/Order.route';
import notFound from './app/middleware/NotFound';

const app: Application = express();
//parsers
app.use(express.json());
app.use(cors());

//enpoints
app.use('/api', productRoute);
app.use('/api', orderRoute);

app.use('*', notFound);

export default app;
