import * as dbUtil from '../../util/databaseUtil';
import uuidv4 from 'uuid/v4';

export const getUserByUsername = async (username) => {
  const sql = 'SELECT id,username,password FROM users WHERE username = ? LIMIT 1';
  return dbUtil.queryOne(sql, [username]);
};
export const signUp = async ({ username, passwordHash, name }) => {
  const check = await checkUserExist(username);
  if (check) {
    return Promise.reject();
  }
  const sql = 'INSERT INTO users(id,username, password, name) VALUES (?, ?, ?, ?)';
  const id = uuidv4();
  await dbUtil.query(sql, [id, username, passwordHash, name]);
};

export const checkUserExistBySsoId = async (id) => {
  const sql = 'SELECT username, id FROM users WHERE ssoId = ?';
  const result = await dbUtil.query(sql, [id]);
  if (result.length > 0) {
    return result[0].id;
  }
  return false;
};

export const checkUserExist = async (username) => {
  const sql = 'SELECT username FROM users WHERE username = ?';
  const result = await dbUtil.query(sql, [username]);
  if (result.length > 0) {
    return true;
  }
  return false;
};

export const getUserFb = async (id) => {
  const sql = 'SELECT * FROM users WHERE fbId = ?';
  const result = await dbUtil.queryOne(sql, [id]);
  return result;
};

export const getUserGg = async (id) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  const result = await dbUtil.queryOne(sql, [id]);
  return result;
};

export const createUserFb = async (name, idFb, avatar) => {
  const id = uuidv4();
  const sql = `
    INSERT INTO users(id,name,avatar,fbId)
    VALUES(?, ?, ?, ?)
  `;
  await dbUtil.execute(sql, [id, name, avatar, idFb]);
  return id;
};

export const createUserGg = async (name, email, avatar) => {
  const id = uuidv4();
  const sql = `
    INSERT INTO users(id,name,avatar,email)
    VALUES(?, ?, ?, ?)
  `;
  await dbUtil.execute(sql, [id, name, avatar, email]);
  return id;
};

export const createSsoUser = async ({ name, id }) => {
  console.log('tao user sso');
  const userId = uuidv4();
  const sql = `
    INSERT INTO users(id,name,ssoId)
    VALUES(?, ?, ?)
  `;
  await dbUtil.execute(sql, [userId, name, id]);
  return userId;
};
