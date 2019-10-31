import * as dbController from './UserDAL';

export const getMe = async (req, res) => {
  const info = await dbController.getMe(req.userId);
  res.send(info);
};

export const likeSong = async (req, res) => {
  const { songId } = req.body;
  await dbController.likeSong(req.userId, songId);
  res.ok();
};

export const unlikeSong = async (req, res) => {
  const { songId } = req.body;
  await dbController.unlikeSong(req.userId, songId);
  res.ok();
};
