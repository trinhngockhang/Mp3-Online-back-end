import { APP_SECRET, PRIVATE_KEY, SSO_SECRET, EXPIRE_IN, SSO_PUBLIC_KEY } from '../constant';
import request from 'request';
import * as jwt from 'jsonwebtoken';
import * as securityUtil from './securityUtil';

export const exchangeData = async (token) => {
  const { sessionId } = await jwt.verify(token, SSO_SECRET);
  if (sessionId) {
    const tokenEncrypt = securityUtil.createToken(EXPIRE_IN, 'sso authorize', PRIVATE_KEY);
    console.log('token bi ma hoa:', tokenEncrypt);
    const tokenVerified = jwt.sign({ tokenEncrypt }, APP_SECRET);
    console.log('token verify:', tokenVerified);
    // ma hoa token bang private key,appId roi gui trong authorization
    const body = JSON.stringify({ authToken: token });
    const contentLength = body.length;
    const options = {
      baseUrl: 'http://52.187.21.233:3001',
      headers: {
        'Content-Length': contentLength,
        authorization: `SuperId ${tokenVerified}`,
        'Content-Type': 'application/json',
      },
      body,
    };
    return new Promise((resolve, reject) => {
      request.post('/authorization/exchange-data', options, (err, response, body) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        const data = JSON.parse(body);
        const verify = securityUtil.verify(data.token, SSO_PUBLIC_KEY);
        if (verify) {
          const doc = securityUtil.decrypt(data.dataEncrypted, APP_SECRET);
          const user = JSON.parse(doc);
          console.log(user);
          return resolve({ name: user['basic.username'], id: user.id });
        }
      });
    });
  }
};
