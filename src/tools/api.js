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
  createFengge: (data) => request.post('/createFengge', data),
  createYixiang: (data) => request.post('/createYixiang', data),
  // work
  getMyWork: () => request.get('/myWork'),
  deleteWork: (data) => request.post('/deleteWork', data),
  // collection
  getMyCollection: () => request.get('/myCollection'),
  deleteCollection: (data) => request.post('/deleteCollection', data),
  addCollection: (data) => request.post('/addCollection', data),
  // like
  like: (data) => request.post('/like', data),
  // comment
  createComment: (data) => request.post('/createComment', data),
  // poem
  getPoem: (data) => request.post('/poem', data),
  getPoems: () => request.get('/poems'),
};
