import { apiRequest } from '@/api';

const state = {
}

const mutations = {
}

const actions = {
  FETCH_STORE: () => new Promise((resolve, reject) => {
    apiRequest().get('stores/1')
      .then(({ data }) => {
        resolve(data);
      }).catch(e => {
        reject(e);
      });
  }),
  // eslint-disable-next-line no-empty-pattern
  UPDATE_STORE: ({}, params) => new Promise((resolve, reject) => {
    apiRequest().post('stores/update', params)
      .then(({ data }) => {
        resolve(data);
      }).catch(e => {
        reject(e);
      });
  })
}

export default { state, mutations, actions }