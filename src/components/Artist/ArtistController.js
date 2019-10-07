import * as dbController from './ArtistDAL';

export const getSuggestArtist = async (req, res) => {
  const artists = await dbController.getSuggestArtist();
  res.send(artists);
};
