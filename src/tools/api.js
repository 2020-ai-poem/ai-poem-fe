import request from './request';

export default {
  // authentication
  login: (data) => request.post('/signIn', data),
  logout: () => request.post('/signOut'),
  emailCheck: (data) => request.post('/emailCheck', data),
  register: (data) => request.post('/signUp', data),
  // user
  getInfo: (data) => request.post('/getInfo', data),
};
