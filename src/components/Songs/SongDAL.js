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
  ORDER BY createdAt DESC LIMIT 15
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

export const getSongByAlbum = async (id, userId) => {
  const sql = `SELECT songs.id,image,songs.name as nameSong,singers.name as singer FROM songs,singers,singer_song
  WHERE singers.id = singer_song.singerId
  AND singer_song.songId = songs.id
  AND albumId = ?
  ORDER BY createdAt DESC`;
  const result = await dbUtil.query(sql, [id]);
  const songs = dbUtil.group(result.map(row => ({
    ...dbUtil.nested(row),
  })), 'id', 'singer');
  if (userId) {
    const listId = songs.map(song => song.id);
    console.log(listId);
    const checkSql = `
      SELECT songId FROM like_song
      WHERE userId = ?
      AND songId IN (?)
    `;
    const listCheck = await dbUtil.query(checkSql, [userId, listId]);
    const listIdLiked = listCheck.map((doc) => doc.songId);
    const lastSongs = songs.map((doc) => {
      if (listIdLiked.includes(doc.id)) return { ...doc, liked: true };
      return { ...doc, liked: false };
    });
    return lastSongs;
  }
  return songs;
};

export const getMp3 = async (id) => {
  const sql = 'SELECT url FROM songs WHERE id = ?';
  const result = await dbUtil.queryOne(sql, [id]);
  console.log('url from db', result.url);
  return result.url;
};

export const getSongByArtist = async (id, userId) => {
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
  if (userId) {
    const listId = songs.map(song => song.id);
    console.log(listId);
    const checkSql = `
      SELECT songId FROM like_song
      WHERE userId = ?
      AND songId IN (?)
    `;
    const listCheck = await dbUtil.query(checkSql, [userId, listId]);
    console.log('list check', listCheck);
    const listIdLiked = listCheck.map((doc) => doc.songId);
    console.log('list id like', listIdLiked);
    const lastSongs = songs.map((doc) => {
      if (listIdLiked.includes(doc.id)) return { ...doc, liked: true };
      return { ...doc, liked: false };
    });
    return lastSongs;
  }
  return songs;
};

export const getSongByCategory = async (id, { limit, offset }) => {
  console.log({ limit, offset });
  const sql = `SELECT S.id,C.name as categoryName,
  S.image,S.name as nameSong,
  singers.name as singer 
  FROM songs S,singers,singer_song,categories C,song_categories SC
  WHERE singers.id = singer_song.singerId
  AND singer_song.songId = S.id
  AND C.id = SC.categoryId
  AND SC.songId = S.id
  AND C.id = ?
  ORDER BY createdAt DESC
  LIMIT ?
  OFFSET ?`;
  const result = await dbUtil.query(sql, [id, limit, offset]);
  const songs = dbUtil.group(result.map(row => ({
    ...dbUtil.nested(row),
  })), 'id', 'singer');
  return songs;
};

export const getSongDetail = async (id, userId = null) => {
  const sql = `SELECT S.id, singers.id as singerId,S.writer,liked as likeNumber,
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
  const checkLiked = `
    SELECT userId FROM like_song
    WHERE userId = ?
    AND songId = ?
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
  songDetail.liked = false;
  if (userId) {
    const checkLikedResult = await dbUtil.query(checkLiked, [userId, id]);
    if (checkLikedResult.length > 0) {
      songDetail.liked = true;
    }
  }
  return songs[0];
};

export const getSongLikedByUser = async (userId) => {
  const sql = `SELECT songs.id,image,songs.name as nameSong,singers.name as singer 
  FROM songs,singers,singer_song,like_song
  WHERE singers.id = singer_song.singerId
  AND singer_song.songId = songs.id
  AND songs.id = like_song.songId
  AND like_song.userId = ?
  ORDER BY createdAt DESC`;
  const result = await dbUtil.query(sql, [userId]);
  const songs = dbUtil.group(result.map(row => ({
    ...dbUtil.nested(row),
  })), 'id', 'singer');
  return songs.map((song) => {
    return { ...song, liked: true };
  });
};

export const getChart = async (userId, { limit, offset }) => {
  const sql = `
  SELECT songs.id,
  COUNT(like_song.userId) as score
  FROM songs,like_song
  WHERE songs.id = like_song.songId
  GROUP BY songs.id
  ORDER BY COUNT(like_song.userId) DESC
  LIMIT ?
  OFFSET ?
  `;
  const listIdScore = await dbUtil.query(sql, [limit, offset]);
  const listId = listIdScore.map((data) => data.id);
  const listSongSql = `
  SELECT songs.id,image,songs.name as nameSong,
  singers.name as singer
  FROM songs,singers,singer_song
  WHERE singers.id = singer_song.singerId
  AND singer_song.songId = songs.id
  AND songs.id IN (?)
  `;
  const listSong = await dbUtil.query(listSongSql, [listId]);
  const tempSong = dbUtil.group(listSong.map(row => ({
    ...dbUtil.nested(row),
  })), 'id', 'singer');
  const songs = listIdScore.map((data) => {
    for (let i = 0; i < tempSong.length; i++) {
      console.log(data.id);
      console.log(tempSong[i].id);
      if (data.id === tempSong[i].id) return { ...tempSong[i], score: data.score };
    }
    return null;
  });
  if (userId) {
    const checkSql = `
      SELECT songId FROM like_song
      WHERE userId = ?
      AND songId IN (?)
    `;
    const listCheck = await dbUtil.query(checkSql, [userId, listId]);
    const listIdLiked = listCheck.map((doc) => doc.songId);
    const lastSongs = songs.map((doc) => {
      if (listIdLiked.includes(doc.id)) return { ...doc, liked: true };
      return { ...doc, liked: false };
    });
    return lastSongs;
  }
  return songs;
};
