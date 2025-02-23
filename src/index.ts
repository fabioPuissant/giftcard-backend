import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import sayHello from '@services/HelloService';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send(sayHello('Fabdsafsdfsdio'));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});