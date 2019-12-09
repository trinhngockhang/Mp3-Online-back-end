import * as dbUtil from '../../../util/databaseUtil';

export const getSinger = async ({ start, count }) => {
  console.log({ start, count });
  const sql = `
    SELECT * FROM singers
    LIMIT ?
    OFFSET ?
  `;
  const countSql = `
    SELECT count(*) as count
    FROM singers
  `;
  const singers = await dbUtil.query(sql, [count, start]);
  const result = await dbUtil.query(countSql, [count, start]);
  return { data: singers,
    totalCount: result[0].count,
  };
};

export const getSingerDetail = async (id) => {
  const sql = 'SELECT * FROM singers WHERE id = ?';
  const singer = await dbUtil.queryOne(sql, [id]);
  return singer;
};
