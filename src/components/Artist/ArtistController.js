import * as dbController from './ArtistDAL';

export const getSuggestArtist = async (req, res) => {
  const artists = await dbController.getSuggestArtist();
  res.send(artists);
};

export const getArtistDetail = async (req, res) => {
  const artist = await dbController.getArtistDetail(req.params.id);
  res.send(artist);
};
