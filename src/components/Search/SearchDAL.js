import * as dbUtil from '../../util/databaseUtil';

export const searchSong = async (keyword) => {
  const sql = `SELECT S.id,
  S.image,S.name as nameSong,
  singers.name as singer 
  FROM songs S,singers,singer_song
  WHERE singers.id = singer_song.singerId
  AND singer_song.songId = S.id
  AND S.name LIKE '%${keyword}%'
  LIMIT 15
  OFFSET 0`;
  const result = await dbUtil.query(sql);
  const songs = dbUtil.group(result.map(row => ({
    ...dbUtil.nested(row),
  })), 'id', 'singer');
  return songs;
};
