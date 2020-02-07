import request from './request';

export default {
  // authentication
  login: (data) => request.post('/signIn', data),
  logout: () => request.post('/signOut'),
  emailCheck: (data) => request.post('/emailCheck', data),
  register: (data) => request.post('/signUp', data),
  // profile
  getInfo: (data) => request.post('/getInfo', data),
  modifyInfo: (data) => request.post('/modifyInfo', data),
  // create poem
  createCangtou: (data) => request.post('/createCangtou', data),
  createSelf: (data) => request.post('/createSelf', data),
  createJielong: (data) => request.post('/createJielong', data),
};
