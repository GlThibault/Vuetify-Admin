import { apiRequest } from '@/api'

const state = {
  connected: !!window.localStorage.getItem('JWT'),
  token: window.localStorage.getItem('JWT'),
  storeId: undefined
}

const mutations = {
  SET_SIGNED_IN: (state, token, storeId) => {
    state.connected = true
    state.token = token
    state.storeId = storeId
    window.localStorage.setItem('JWT', state.token)
  },
  SET_SIGNED_OUT: (state) => {
    state.connected = false
    state.token = undefined
    state.storeId = undefined
    window.localStorage.removeItem('JWT')
    window.localStorage.removeItem('JWTA')
  }
}

const actions = {
  SIGN_IN: ({ commit, dispatch }, { email, password }) => new Promise((resolve, reject) => {
    apiRequest().post('admin/signin', { email, password })
      .then(({ data }) => {
        if (data.success && data.token) {
          commit('SET_SIGNED_IN', { token: data.token, storeId: data.storeId });
          dispatch('FETCH_STORE');
        }
        resolve(data);
      }).catch(e => {
        reject(e);
      });
  }),
  SIGN_OUT: ({ commit }) => {
    commit('SET_SIGNED_OUT')
    window.location.href = '/'
  }
}

export default { state, mutations, actions }