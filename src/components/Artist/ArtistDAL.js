import * as dbUtil from '../../util/databaseUtil';

export const getSuggestArtist = async () => {
  const offset = Math.round(Math.random() * 9 - 0);
  const sql = `SELECT * FROM singers
  LIMIT 6 OFFSET ?`;
  const result = await dbUtil.query(sql, [offset]);
  return result;
};

export const getArtistDetail = async (id) => {
  const sql = 'SELECT * FROM singers WHERE id = ?';
  const artist = await dbUtil.queryOne(sql, [id]);
  return artist;
};
