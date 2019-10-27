import * as dbController from './SearchDAL';

export const searchSong = async (req, res) => {
  const songs = await dbController.searchSong(req.pagination.keyword);
  res.send(songs);
};
