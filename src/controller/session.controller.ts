// session.controller.ts

import { Response, Request } from 'express';
import config from 'config';
import { validatePassword } from '../service/user.service';
import { createSession } from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    res.status(401).send('Invalid email or password');
    return;
  }
  // Create a session
  const userAgent = req.get('user-agent') || '';
  const session = await createSession(user._id.toString(), userAgent);

  // Create an access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokenTtl') } // 15 mins
  );

  // Create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('refreshTokenTtl') } // 1 year
  );

  // return access and refresh tokens
  res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {}
