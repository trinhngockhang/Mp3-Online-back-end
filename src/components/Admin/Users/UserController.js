import * as dbAccess from './UserDAL';

export const getUsers = async (req, res) => {
  const users = await dbAccess.getUsers(req.pagination);
  console.log(users);
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  res.header('X-Total-Count', users.totalCount);
  res.send(users.data);
};

export const getUserDetail = async (req, res) => {
  const user = await dbAccess.getUserDetail(req.params.id);
  res.send(user);
};
