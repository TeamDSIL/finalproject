// store/auth.js
export const state = () => ({
    token: null
  })
  
  export const mutations = {
    setToken(state, token) {
      state.token = token
    },
    clearToken(state) {
      state.token = null
    }
  }
  
  export const actions = {
    login({ commit }, token) {
      commit('setToken', token)
      localStorage.setItem('token', token)
    },
    logout({ commit }) {
      commit('clearToken')
      localStorage.removeItem('token')
    }
  }
  