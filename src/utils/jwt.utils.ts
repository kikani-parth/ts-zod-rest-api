import jwt from 'jsonwebtoken';
import config from 'config';

const privateKeyBase64 = config.get<string>('privateKey');
const publicKeyBase64 = config.get<string>('publicKey');

// Decode the private and public keys from base64
const privateKey = Buffer.from(privateKeyBase64, 'base64').toString('utf-8');
const publicKey = Buffer.from(publicKeyBase64, 'base64').toString('utf-8');

export function signJwt(payload: Object, options: jwt.SignOptions = {}) {
  return jwt.sign(payload, privateKey, { algorithm: 'RS256', ...options });
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
}
