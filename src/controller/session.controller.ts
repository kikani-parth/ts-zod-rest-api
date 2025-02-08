// session.controller.ts

import { Response, Request } from 'express';
import { validatePassword } from '../service/user.service';
import { createSession } from '../service/session.service';

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send('Invalid email or password');
  }
  // Create a session
  const userAgent = req.get('user-agent') || '';
  const session = createSession(user._id.toString(), userAgent);
  // Create an access token
  // Create a refresh token
  // return access and refresh tokens
}
