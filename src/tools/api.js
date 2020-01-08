import request from './request';

export default {
  // authentication
  login: (data) => request.get('/signIn', data),


};
