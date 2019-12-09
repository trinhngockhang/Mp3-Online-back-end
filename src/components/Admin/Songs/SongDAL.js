import * as dbUtil from '../../../util/databaseUtil';

export const getSongs = async ({ start, count }) => {
  const sql = `
  SELECT S.id, singers.id as singerId,S.writer,liked as likeNumber,
  S.image,S.name as nameSong,
  singers.name as singer 
  FROM songs S,singers,singer_song
  WHERE singers.id = singer_song.singerId
  AND singer_song.songId = S.id
    LIMIT ?
    OFFSET ?
  `;
  const songResult = await dbUtil.query(sql, [count, start]);
  const songs = dbUtil.group(songResult.map(row => ({
    ...dbUtil.nested(row),
  })), 'id', 'singer', 'singerId');

  const countSql = `
    SELECT count(*) as count
    FROM songs
  `;
  const result = await dbUtil.query(countSql, [count, start]);
  return { data: songs,
    totalCount: result[0].count,
  };
};

export const getSongDetail = async (id) => {
  const sql = `SELECT S.id, image, coverImg, singers.id as singerId,S.writer,liked as likeNumber,
    S.image,S.name as nameSong,
    singers.name as singer 
    FROM songs S,singers,singer_song
    WHERE S.id = ?
    AND singers.id = singer_song.singerId
    AND singer_song.songId = S.id
  `;
  const getCateSql = `
    SELECT C.id,C.name
    FROM categories C, song_categories SC
    WHERE C.id = SC.categoryId
    AND SC.songId = ?
  `;
  const [result, categories] = await Promise.all([dbUtil.query(sql, [id]), dbUtil.query(getCateSql, [id])]);
  const songs = dbUtil.group(result.map(row => ({
    ...dbUtil.nested(row),
  })), 'id', 'singer', 'singerId');
  const songDetail = songs[0];
  songDetail.categories = [];
  categories.forEach((data) => {
    songDetail.categories.push({
      id: data.id,
      name: data.name,
    });
  });
  return songs[0];
};
