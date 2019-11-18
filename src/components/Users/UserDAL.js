import * as dbUtil from '../../util/databaseUtil';
import uuidv4 from 'uuid/v4';

export const getMe = async (id) => {
  const sql = 'SELECT id,name,avatar from users WHERE id = ?';
  const result = await dbUtil.queryOne(sql, [id]);
  return result;
};

export const likeSong = async (userId, songId) => {
  const songSql = `
    UPDATE songs SET liked = liked + 1
    WHERE id = ?
  `;
  const likeSongSql = `
    INSERT INTO like_song(songId, userId)
    VALUES(?, ?)
  `;
  const transaction = await dbUtil.beginTransaction();
  try {
    await dbUtil.execute(songSql, [songId], transaction);
    await dbUtil.execute(likeSongSql, [songId, userId], transaction);
    await dbUtil.commitTransaction(transaction);
  } catch (e) {
    await dbUtil.rollbackTransaction(transaction);
    return Promise.reject(e);
  }
};

export const commentSong = async (userId, songId, content) => {
  const sql = `
    INSERT INTO comments(id, userId, songId, content)
    VALUES (?,?,?,?)
  `;
  const id = uuidv4();
  await dbUtil.execute(sql, [id, userId, songId, content]);
};

export const unlikeSong = async (userId, songId) => {
  const songSql = `
    UPDATE songs SET liked = liked - 1
    WHERE id = ?
  `;
  const unlikeSongSql = `
    DELETE FROM like_song
    WHERE songId = ?
    AND userId = ?
  `;
  const transaction = await dbUtil.beginTransaction();
  try {
    const deleteResult = await dbUtil.execute(unlikeSongSql, [songId, userId], transaction);
    if (deleteResult.affectedRows > 0) {
      await dbUtil.execute(songSql, [songId], transaction);
    }
    await dbUtil.commitTransaction(transaction);
  } catch (e) {
    await dbUtil.rollbackTransaction(transaction);
    return Promise.reject(e);
  }
};
