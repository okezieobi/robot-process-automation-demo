import { Router, Request, Response } from 'express';

import controller from './controllers';

const router = Router();
const handleResponse = (req: Request, res: Response) => {
  res.status(res.locals.data.status || 200).send(res.locals.data);
};

export default router.post('/forms/frontier/applications', controller, handleResponse);
