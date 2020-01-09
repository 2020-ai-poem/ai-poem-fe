import request from './request';

export default {
  // authentication
  login: (data) => request.post('/signIn', data),
  emailCheck: (data) => request.post('/emailCheck', data),
  register: (data) => request.post('/signUp', data),


};
