import * as dbUtil from '../../util/databaseUtil';

export const getNewAlbum = async () => {
  // const offset = Math.round(Math.random() * (16 - 10)) + 10;
  const sql = `SELECT album.name as albumName,album.id,img,singers.name as singer
   FROM album,singer_album sa,singers
   WHERE album.id = sa.albumId
   AND sa.singerId = singers.id
   ORDER BY album.createdAt DESC
   LIMIT 8
   `;
  const result = await dbUtil.query(sql);
  const albums = dbUtil.group(result.map(row => ({
    ...dbUtil.nested(row),
  })), 'id', 'singer');
  return albums;
};

export const getAlbumDetail = async (id) => {
  const sql = `SELECT album.id,album.name as albumName,album.img,
  singers.name as singer,singers.id as singerId
  FROM album, singer_album, singers
  WHERE album.id = singer_album.albumId
  AND singers.id = singer_album.singerId
  AND album.id = ?
  `;
  const result = await dbUtil.query(sql, [id]);
  const album = dbUtil.group(result.map(row => ({
    ...dbUtil.nested(row),
  })), 'id', 'singer', 'singerId');
  return album[0];
};
