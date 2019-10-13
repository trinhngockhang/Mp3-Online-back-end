import * as dbUtil from '../../util/databaseUtil';

export const getListTopSong = async () => {
  const sql = `SELECT * FROM songs 
  ORDER BY liked LIMIT 8`;
  const result = await dbUtil.query(sql);
  return result;
};

export const getListNewSong = async () => {
  const offset = Math.round(Math.random() * (16 - 10)) + 10;
  const sql = `SELECT songs.id,image,songs.name as nameSong,singers.name as singer FROM songs,singers,singer_song
  WHERE singers.id = singer_song.singerId
  AND singer_song.songId = songs.id
  ORDER BY createdAt DESC LIMIT 9
  OFFSET ?`;
  const result = await dbUtil.query(sql, [offset]);
  const songs = dbUtil.group(result.map(row => ({
    ...dbUtil.nested(row),
  })), 'id', 'singer');
  return songs;
};

export const getSlideSong = async () => {
  const sql = `SELECT songs.id,coverImg,image,songs.name as nameSong,singers.name as singer FROM songs,singers,singer_song
   WHERE coverImg IS NOT NULL
   AND singers.id = singer_song.singerId
   AND singer_song.songId = songs.id
   ORDER BY createdAt LIMIT 3`;
  const result = await dbUtil.query(sql);
  const songs = dbUtil.group(result.map(row => ({
    ...dbUtil.nested(row),
  })), 'id', 'singer');
  return songs;
};

export const getSongByAlbum = async (id) => {
  const sql = `SELECT songs.id,image,songs.name as nameSong,singers.name as singer FROM songs,singers,singer_song
  WHERE singers.id = singer_song.singerId
  AND singer_song.songId = songs.id
  AND albumId = ?
  ORDER BY createdAt DESC`;
  const result = await dbUtil.query(sql, [id]);
  const songs = dbUtil.group(result.map(row => ({
    ...dbUtil.nested(row),
  })), 'id', 'singer');
  return songs;
};

export const getMp3 = async (id) => {
  const sql = 'SELECT url FROM songs WHERE id = ?';
  const result = await dbUtil.queryOne(sql, [id]);
  console.log('url from db', result.url);
  return result.url;
};

export const getSongByArtist = async (id) => {
  const sql = `SELECT songs.id,image,songs.name as nameSong,
  singers.name as singer, singers.id as singerId FROM songs,singers,singer_song
  WHERE singers.id = singer_song.singerId
  AND singer_song.songId = songs.id
  AND songs.id = ANY (
    SELECT songId FROM singer_song
    WHERE singerId = ?
  )
  ORDER BY createdAt DESC`;
  const result = await dbUtil.query(sql, [id]);
  const songs = dbUtil.group(result.map(row => ({
    ...dbUtil.nested(row),
  })), 'id', 'singer', 'singerId');
  return songs;
};
