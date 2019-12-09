import cors from 'cors';

const corsOptions = {
  origin: '*',
  'Access-Control-Expose-Headers': 'Content-Range',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export const corsMiddleware = cors(corsOptions);
