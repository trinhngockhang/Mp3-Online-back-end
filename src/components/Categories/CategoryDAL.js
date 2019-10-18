import * as dbUtil from '../../util/databaseUtil';

export const popularCategory = async () => {
  const sql = 'SELECT * FROM categories LIMIT 6';
  const categories = await dbUtil.query(sql);
  return categories;
};
