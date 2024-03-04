import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/user';
import productRoutes from './handlers/product';
import orderRoutes from './handlers/order';

const app = express();
const port = 3000;
app.use(bodyParser.json());
userRoutes(app);
productRoutes(app);
orderRoutes(app);
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

export default app;
