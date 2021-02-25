import { Request, Response, NextFunction } from 'express';

import services from './services';

export default function handleRequest(req: Request, res: Response, next: NextFunction) {
  const data = services(req.body);
  if (data.messages) throw data;
  else {
    res.locals.data = data;
    next();
  }
}
