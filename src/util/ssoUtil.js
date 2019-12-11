import { APP_SECRET, SSO_PUBLIC_KEY, PRIVATE_KEY } from '../constant';
import request from 'request';
import * as securityUtil from './securityUtil';

export const exchangeData = async (token) => {
  const body = { authToken: token };
  const authHeader = securityUtil.makeAuthorizationHeader({ privateKey: PRIVATE_KEY, appSecret: APP_SECRET }, body);
  const contentLength = Buffer.byteLength(JSON.stringify(body));
  console.log('token verify:', authHeader);
  const options = {
    baseUrl: 'https://sso.kmp3.ga/',
    headers: {
      'Content-Length': contentLength,
      authorization: authHeader,
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
};
