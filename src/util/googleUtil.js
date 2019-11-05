import request from 'request';

const BASEURL = 'https://www.googleapis.com/oauth2/v3/';

export const getInfo = (accessToken) => {
  const options = {
    baseUrl: BASEURL,
  };
  return new Promise((resolve, reject) => {
    request.get(`/tokeninfo?id_token=${accessToken}`, options, (err, response, body) => {
      if (err) {
        return reject(err);
      }
      const bodyObj = JSON.parse(body);
      if (bodyObj.error) {
        return reject(bodyObj.error);
      }
      return resolve(JSON.parse(body));
    });
  });
};
