import request from './request';

export default {
  // authentication
  login: (data) => request.post('/signIn', data),


};
