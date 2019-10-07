import * as dbUtil from '../../util/databaseUtil';

export const getListTopSong = async () => {
  const sql = `SELECT * FROM songs 
  ORDER BY liked LIMIT 8`;
  const result = await dbUtil.query(sql);
  return result;
};

export const getListNewSong = async () => {
  const sql = `SELECT songs.id,image,songs.name as nameSong,singers.name as singer FROM songs,singers,singer_song
  WHERE singers.id = singer_song.singerId
  AND singer_song.songId = songs.id
  ORDER BY createdAt LIMIT 8`;
  const result = await dbUtil.query(sql);
  return result;
};

export const getSlideSong = async () => {
  const sql = `SELECT songs.id,coverImg,songs.name as nameSong,singers.name FROM songs,singers,singer_song
   WHERE coverImg IS NOT NULL
   AND singers.id = singer_song.singerId
   AND singer_song.songId = songs.id
   ORDER BY createdAt LIMIT 3`;
  const result = await dbUtil.query(sql);
  return result;
};

export const getMp3 = async (id) => {
  const sql = 'SELECT url FROM songs WHERE id = ?';
  const result = await dbUtil.queryOne(sql, [id]);
  console.log('url from db', result.url);
  return result.url;
};
