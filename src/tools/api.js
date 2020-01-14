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
};
