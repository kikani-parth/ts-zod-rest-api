// deserializeUser.ts

import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../service/session.service';

async function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  );

  const refreshToken = get(req, 'headers.x-refresh');

  if (!accessToken) {
    next();
    return;
  }

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    next();
    return;
  }

  if (expired && refreshToken) {
    // Ensure refreshToken is a string
    const token = Array.isArray(refreshToken) ? refreshToken[0] : refreshToken;

    const newAccessToken = await reIssueAccessToken(token);

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);
      const result = verifyJwt(newAccessToken);

      res.locals.user = result.decoded;
    }

    next();
    return;
  }

  next();
}

export default deserializeUser;
