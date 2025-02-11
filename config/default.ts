export default {
  port: 1337,
  dbUri: 'mongodb://localhost:27017/ts-zod-rest-api',
  saltWorkFactor: 10,
  accessTokenTtl: '15m',
  refreshTokenTtl: '1y',
  publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw09e7dXuqjubP0ikfCTr
tuMihotgIP9CDIW+jRjfe604JfjAyut4OmMou1qq9HdeKouhwOpDGsUcj/wGLHLT
YBna+KtlZURQr44egjG5zziO6anzbRandxeHtgbxRQhV9t1nBNi5sTGXNnLJ84Rh
4PgwM5jn8xyy6tSVEmdPZVqbepW+AVVJWZwycqxDlODPfyHlnAsGHzW/k8tyLZ7/
wOg0O1353X3Y7rY8rCz9ejRwXKAyohHgXb1RXpZPE02Dj15xiCAEBJNKrfxYVuTl
W17/WM1UWQgdA6xDmwQ442uBN0dYa2CmbTgRWgpOUsy8LvKDHFC9/VRd8AdJVwPo
DQIDAQAB
-----END PUBLIC KEY-----`,
  privateKey: ``,
};
