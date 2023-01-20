export const state = () => ({
  email: undefined,
  password: undefined,
})

export const mutations = {
  setEmail(state, email) {
    state.email = email
  },
  setPassword(state, password) {
    state.password = password
  },
}
