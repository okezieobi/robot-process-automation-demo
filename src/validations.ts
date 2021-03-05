import { Request, Response, NextFunction } from 'express';
import { checkSchema, validationResult } from 'express-validator';

const handleValidationErr = (status = 400) => (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) next();
  else next({ messages: errors.array(), status });
};

const form = checkSchema({
  firstname: {
    in: ['body'],
    isLength: {
      errorMessage: 'First name should be at least a character long',
      options: { min: 1 },
    },
    isString: {
      errorMessage: 'First name must be string data type',
    },
    exists: {
      errorMessage: 'First name is required',
    },
  },
  lastname: {
    in: ['body'],
    isLength: {
      errorMessage: 'Last name should be at least a character long',
      options: { min: 1 },
    },
    isString: {
      errorMessage: 'Last name must be string data type',
    },
    exists: {
      errorMessage: 'Last name is required',
    },
  },
  email: {
    in: ['body'],
    isString: {
      errorMessage: 'Email address must be string data type',
    },
    isEmail: {
      errorMessage: 'Email address format is incorrect',
    },
    exists: {
      errorMessage: 'Email address is required',
    },
  },
  phone: {
    in: ['body'],
    isMobilePhone: {
      errorMessage: 'Phone number format is incorrect',
    },
    isString: {
      errorMessage: 'Phone must be string data type',
    },
    exists: {
      errorMessage: 'Phone is required',
    },
  },
  location: {
    in: ['body'],
    isLength: {
      errorMessage: 'Location should be at least a character long',
      options: { min: 1 },
    },
    isString: {
      errorMessage: 'Location must be string data type',
    },
    exists: {
      errorMessage: 'Location is required',
    },
  },
  linkedIn: {
    in: ['body'],
    isURL: {
      errorMessage: 'Link to linkedIn profile must be valid url',
    },
    isString: {
      errorMessage: 'Link to linkedIn profile must be string data type',
    },
    exists: {
      errorMessage: 'Link to linkedIn profile is required',
    },
  },
  resume: {
    in: ['body'],
    isURL: {
      errorMessage: 'Link to online resume must be valid url',
    },
    isString: {
      errorMessage: 'Link to online resume must be string data type',
    },
    exists: {
      errorMessage: 'Link to online resume is required',
    },
  },
});

export default { form, handleValidationErr };
