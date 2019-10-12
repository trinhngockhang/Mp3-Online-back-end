import * as dbUtil from '../../util/databaseUtil';

export const getSuggestArtist = async () => {
  const offset = Math.round(Math.random() * 9 - 0);
  const sql = `SELECT * FROM singers
  LIMIT 6 OFFSET ?`;
  const result = await dbUtil.query(sql, [offset]);
  return result;
};
