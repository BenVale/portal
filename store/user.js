export const state = () => ({
  name: 'Dinesh Amarasekara', //TODO: remove default name
  id: 0
})

export const mutations = {
  
}

export const actions = {
  login: async ({commit}, data) => {
    //TODO: call api to verify login then fill out user data
  },
  logout: async ({commit}, data) => {
    //TODO: call api to logout clear user data
  },
}