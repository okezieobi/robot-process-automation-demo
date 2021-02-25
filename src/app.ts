import express, {
  json, urlencoded, Request, Response, NextFunction,
} from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

// import routes from './routes/router';

const app = express();

app.use(cors({ origin: ['http://localhost:5000'], credentials: true }));
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/api/v1', routes(Router));

interface CustomErr extends Error {
  status: number;
}
// eslint-disable-next-line no-unused-vars
app.use((error: CustomErr, req: Request, res: Response, next: NextFunction) => {
  if (error.status) res.status(error.status).send({ error });
  else throw error;
});

export default app;
