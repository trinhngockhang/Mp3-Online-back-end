import * as dbUtil from '../../util/databaseUtil';
import uuidv4 from 'uuid/v4';

export const getUserByUsername = async (username) => {
  const sql = 'SELECT id,username,password FROM users WHERE username = ? LIMIT 1';
  return dbUtil.queryOne(sql, [username]);
};
export const signUp = async ({ username, passwordHash, name }) => {
  const sql = 'INSERT INTO users(id,username, password, name) VALUES (?, ?, ?, ?)';
  const id = uuidv4();
  await dbUtil.query(sql, [id, username, passwordHash, name]);
};
