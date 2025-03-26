import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes/index.js';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`Pokoknya lagi liat port ${port}`);
});

export default app;
