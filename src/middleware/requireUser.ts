// requireUser.ts

import { Request, Response, NextFunction } from 'express';

function requireUser(req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user;

  if (!user) {
    res.sendStatus(403);
    return;
  }

  next();
}

export default requireUser;
