import * as dbUtil from '../../util/databaseUtil';

export const getSuggestArtist = async () => {
  const sql = `SELECT * FROM artist
  LIMIT 6 OFFSET ?`;
  const result = await dbUtil.query(sql, [0]);
  return result;
};

export const getArtistDetail = async (id) => {
  const sql = 'SELECT * FROM artist WHERE id = ?';
  const artist = await dbUtil.queryOne(sql, [id]);
  return artist;
};
