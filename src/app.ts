import express, { Application } from 'express';
import cors from 'cors';
import { productRoute } from './app/modules/product/product.route';

const app: Application = express();
//parsers
app.use(express.json());
app.use(cors());

//enpoints
app.use('/api', productRoute);

export default app;
