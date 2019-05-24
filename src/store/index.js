import Vue from 'vue'
import Vuex from 'vuex'

import adminModule from './admin'
import storeModule from './store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    admin: adminModule,
    store: storeModule
  }
})
