import * as dbUtil from '../../util/databaseUtil';

export const getMe = async (id) => {
  const sql = 'SELECT id,name,avatar from users WHERE id = ?';
  const result = await dbUtil.queryOne(sql, [id]);
  return result;
};
