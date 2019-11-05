import * as common from './common';
import * as dbAccess from './AuthDAL';
import { ERRORS } from '../../constant';
import { hash } from '../../util/bcryptUtil';
import * as fbUtil from '../../util/fbUtil';
import * as ggUtil from '../../util/googleUtil';

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await dbAccess.getUserByUsername(username);
  if (user) {
    const passwordValid = await common.checkPassword(password, user.password);
    if (passwordValid) {
      const token = await common.generateToken(user.id);
      return res.json({ token });
    }
    return Promise.reject(ERRORS.INVALID_PASSWORD_ERROR);
  }
  return Promise.reject(ERRORS.USER_NOTFOUND_ERROR);
};

export const loginFb = async (req, res) => {
  const { accessToken } = req.body;
  console.log(accessToken);
  const userFb = await fbUtil.getFbProfile(accessToken, ['id', 'name']);
  console.log('userFb', userFb);
  const user = await dbAccess.getUserFb(userFb.id);
  if (!user) {
    const userId = await dbAccess.createUserFb(userFb.name, userFb.id, `http://graph.facebook.com/${userFb.id}/picture?type=large`);
    console.log('user Id', userId);
    const token = await common.generateToken(userId);
    return res.json({ token });
  }
  const token = await common.generateToken(user.id);
  return res.json({ token });
};

export const loginGg = async (req, res) => {
  const { accessToken } = req.body;
  console.log(accessToken);
  const userGg = await ggUtil.getInfo(accessToken);
  const user = await dbAccess.getUserGg(userGg.email);
  if (!user) {
    const userId = await dbAccess.createUserGg(userGg.name, userGg.email, userGg.picture);
    console.log('user Id', userId);
    const token = await common.generateToken(userId);
    return res.json({ token });
  }
  const token = await common.generateToken(user.id);
  return res.json({ token });
};

export const signUp = async (req, res) => {
  const { username, password, name, rePassword } = req.body;
  if (password !== rePassword) {
    res.status(401).send('WRONG_REPASS');
  }
  const passwordHash = hash(password);
  await dbAccess.signUp({ username, passwordHash, name });
  res.ok();
};
