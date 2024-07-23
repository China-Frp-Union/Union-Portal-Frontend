import vuex from 'vuex'

// 用Vuex.Store对象用来记录token
const store = new vuex.Store({
  state: {
    token: '',
    username: '',
    email: '',
  },
  getters: {
    get_token(state) {
      return state.token || localStorage.getItem('token') || ''
    },
    get_username(state) {
      return state.username || localStorage.getItem('username') || ''
    },
    get_email(state) {
      return state.email || localStorage.getItem('email') || ''
    },
  },
  mutations: {
    // 修改token，并将token存入localStorage
    set_token(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    delete_token(state) {
      state.token = ''
      localStorage.removeItem('token')
    },
    // 可选
    set_user_info(state, userdata) {
      state.username = userdata.username
      state.email = userdata.email
      localStorage.setItem('username', userdata.username)
      localStorage.setItem('email', userdata.email)
    },
    delete_user_info(state) {
      state.usermame = ''
      state.email = ''
      localStorage.removeItem('username')
      localStorage.removeItem('email')
    }
  },

  actions: {
    //    removeToken: (context) => {
    //      context.commit('setToken')
    //    }
  }
})

export default store
