import jwt from 'jsonwebtoken';

import CONFIG from '../config.js';

//
export function encodeAccessToken(user_id = 0) {
  const access_token = jwt.sign({ user_id: user_id }, CONFIG.SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: CONFIG.ACCESS_TOKEN_LIFE_TIME,
  });
  return access_token;
}

export function decodeAccessToken(access_token = '') {
  const { user_id } = jwt.verify(access_token, CONFIG.SECRET_KEY, {
    algorithms: 'HS256',
  });
  return user_id;
}

//
export function saveUserToCookie(res, user_id) {
  res.cookie('user_id', user_id, {
    httpOnly: true,
  });
}

export function getUserToCookie(res) {
  console.log(res.cookies);
}
