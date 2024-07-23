import vuex from 'vuex'

// 用Vuex.Store对象用来记录token
const store = new vuex.Store({
  state: {
    token: '',
    username: '',
    email: '',
    permission: ""
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
    get_permission(state) {
      return state.permission || localStorage.getItem('permission') || -1
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
      state.permission = userdata.permission

      localStorage.setItem('username', userdata.username)
      localStorage.setItem('email', userdata.email)
      localStorage.setItem('permission', userdata.permission)
    },
    delete_user_info(state) {
      state.usermame = ''
      state.email = ''
      state.permission = -1
      localStorage.removeItem('username')
      localStorage.removeItem('email')
      localStorage.removeItem('permission')

    }
  },

  actions: {
    //    removeToken: (context) => {
    //      context.commit('setToken')
    //    }
  }
})

export default store
