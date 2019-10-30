import * as dbController from './UserDAL';

export const getMe = async (req, res) => {
  const info = await dbController.getMe(req.userId);
  res.send(info);
};
