import * as dbUtil from '../../../util/databaseUtil';

export const getUsers = async ({ start, count }) => {
  console.log({ start, count });
  const sql = `
    SELECT id,username,name,avatar,email,fbId,createdAt
    FROM users
    LIMIT ?
    OFFSET ?
  `;
  const countSql = `
    SELECT count(*) as count
    FROM users
  `;
  const users = await dbUtil.query(sql, [count, start]);
  const result = await dbUtil.query(countSql, [count, start]);
  console.log(users);
  return { data: users,
    totalCount: result[0].count,
  };
};

export const getUserDetail = async (id) => {
  const sql = 'SELECT id, name, username, avatar, createdAt, fbId, email FROM users WHERE id = ?';
  const user = await dbUtil.queryOne(sql, [id]);
  return user;
};
