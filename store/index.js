import {Promise} from "bluebird";


export const state = () => ({
  installations: [],
  customers: [],
  telemetry: [],
  users: [],
  support: [],
  tickets: [],
})

export const mutations = {
  updateInstallations(state, data){
    state.installations = [...data];
  },
  updateCustomers(state, data){
    state.customers = [...data];
  },
  updateTelemetry(state, data){
    state.telemetry = [...data];
  },
  updateUsers(state, data){
    state.users = [...data];
  },
  updateSupport(state, data){
    state.support = [...data];
  },
  updateTickets(state, data){
    state.tickets = [...data];
  },
}

export const actions = {
  async nuxtServerInit ({commit}, { req }) {    
    if(!this.$auth.loggedIn || this.$auth.user == null){
      console.log('No user unable to get data');
      return;
    }

    // NOTE: This function is only run on server side, so this data won't transfer to the client
    // NOTE: But this is still a blocking function, so if it takes 10 secs to complete the client will still have to wait 10 secs
    

    var email = this.$auth.user.email;
    console.log(email);
    
    // calls that can happen at the same time
    var apiCalls = ['customers', 'users', 'support', 'tickets'];
    // this does all the calls at once, then assigns only the data variable of the returned object to new objects 
    var [{data:customers}, {data:users}, {data:support}, {data:tickets}] = await Promise.map(apiCalls, item => this.$axios.get(`/api/${item}/${email}`));    
    commit('updateCustomers', customers);
    commit('updateUsers', users);
    commit('updateSupport', support);
    commit('updateTickets', tickets);
    
    // calls that need to be done in order
    var installations = await Promise.map(customers, item => this.$axios.get(`/api/installations/${item.id}`));    
    // this flattens an array
    installations = installations.reduce((prev, curr) => prev = [...prev, ...curr.data], []);
    commit('updateInstallations', installations);    
    var telemetry = await Promise.map(installations, item => this.$axios.get(`/api/telemetry/${item.id}`));
    telemetry = telemetry.map(item => item.data);
    commit('updateTelemetry', telemetry);    

  },    
 
}