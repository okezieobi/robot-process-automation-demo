import {
  Router, Request, Response, NextFunction,
} from 'express';

import services from './services';
import validations from './validations';

const router = Router();
const handleResponse = (req: Request, res: Response, next: NextFunction) => {
  services.submitForm(req.body).then((data) => {
    res.status(200).send(data);
  }).catch(next);
};

export default router.post('/forms/frontier/applications', validations.form, validations.handleValidationErr(), handleResponse);
