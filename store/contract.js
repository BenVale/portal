

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
    var {data} = await this.$axios.get('/api/db/contract');
    commit('updateItems', data);
  },  
  async set ({commit}, {user}) {
    await this.$axios.post('/api/db/contract', {user});
    var {data} = await this.$axios.get('/api/db/contract');
    commit('updateItems', data);
  },
  async delete({ commit }, { id }) {
    await this.$axios.delete('/api/db/contract/' + id);
    var { data } = await this.$axios.get('/api/db/contract');
    commit('updateItems', data);
  }
}