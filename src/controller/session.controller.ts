// session.controller.ts

import { Response, Request } from 'express';
import config from 'config';
import { validatePassword } from '../service/user.service';
import {
  createSession,
  findSessions,
  updateSession,
} from '../service/session.service';
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
  return;
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  res.send({
    accessToken: null,
    refreshToken: null,
  });
}
