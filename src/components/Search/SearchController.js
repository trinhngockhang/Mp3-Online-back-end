import * as dbController from './SearchDAL';

export const searchSong = async (req, res) => {
  const songs = await dbController.searchSong(req.pagination.keyword);
  res.send(songs);
};

export const searchAlbum = async (req, res) => {
  const albums = await dbController.searchAlbum(req.pagination.keyword);
  res.send(albums);
};
