import * as dbAccess from './SingerDAL';

export const getSinger = async (req, res) => {
  const users = await dbAccess.getSinger(req.pagination);
  console.log(users);
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', users.totalCount);
  res.send(users.data);
};

export const getDetailSinger = async (req, res) => {
  const singer = await dbAccess.getSingerDetail(req.params.id);
  res.send(singer);
};
