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

export const searchAlbum = async (keyword) => {
  // const offset = Math.round(Math.random() * (16 - 10)) + 10;
  const sql = `SELECT album.name as albumName,album.id,img,singers.name as singer
   FROM album,singer_album sa,singers
   WHERE album.id = sa.albumId
   AND sa.singerId = singers.id
   AND album.name LIKE '%${keyword}%'
   ORDER BY album.createdAt DESC
   LIMIT 10
   `;
  const result = await dbUtil.query(sql);
  const albums = dbUtil.group(result.map(row => ({
    ...dbUtil.nested(row),
  })), 'id', 'singer');
  return albums;
};
