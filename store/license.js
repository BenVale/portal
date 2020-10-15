export const state = () => ({
  items: []
})

export const mutations = {
  updateItems(state, data){
    state.items = [...data];
  }
}

export const actions = {
  async load ({commit}, data) {
    
  }
}