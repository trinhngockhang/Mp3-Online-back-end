import * as dbController from './SongDAL';
import path from 'path';

export const getListTopSong = async (req, res) => {
  const songs = await dbController.getListTopSong();
  res.send(songs);
};
export const getListNewSong = async (req, res) => {
  const songs = await dbController.getListNewSong();
  res.send(songs);
};

export const getSlideSong = async (req, res) => {
  const songs = await dbController.getSlideSong();
  res.send(songs);
};

export const getSongByAlbum = async (req, res) => {
  const songs = await dbController.getSongByAlbum(req.params.id);
  res.send(songs);
};

export const getSongByArtist = async (req, res) => {
  const songs = await dbController.getSongByArtist(req.params.id);
  res.send(songs);
};

export const getMp3 = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const url = await dbController.getMp3(id);
  console.log(path.join(__dirname, '../../../MP3', `${url}`));
  res.sendFile(path.join(__dirname, '../../../MP3', `${url}`));
};
