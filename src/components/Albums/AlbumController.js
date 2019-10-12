import * as dbController from './AlbumDAL';

export const getNewAlbum = async (req, res) => {
  const albums = await dbController.getNewAlbum();
  res.send(albums);
};

export const getAlbumDetail = async (req, res) => {
  const { id } = req.params;
  const album = await dbController.getAlbumDetail(id);
  console.log(id);
  res.send(album);
};
