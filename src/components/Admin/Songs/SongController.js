import * as dbAccess from './SongDAL';

export const getSongs = async (req, res) => {
  const songs = await dbAccess.getSongs(req.pagination);
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', songs.totalCount);
  res.send(songs.data);
};

export const getSongDetail = async (req, res) => {
  const song = await dbAccess.getSongDetail(req.params.id);
  res.send(song);
};
