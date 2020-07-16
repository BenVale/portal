<template>
  <div>
    <div v-if="loading" class="d-flex flex-row align-center justify-center flex-grow-1">
      <v-progress-circular indeterminate :size="64" color="primary"></v-progress-circular>
    </div>
    <div v-else>
      <v-btn @click="newUser" color="primary" class="my-4" :loading="loadingNewUser">
        New user
      </v-btn>
      <v-card v-for="(item, idx) in items" :key="idx" class="mb-1">
        <v-card-text>
          {{item}}
        </v-card-text>
        <v-btn icon @click="deleteUser(item.id)">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-card>
    </div>     
  </div>
</template>


<script>

export default {
  auth: false,
  components: {
    
  },
  data() {
    return {      
      loadingNewUser: false,
      loadingDeleteUser: false
    }
  },
  fetch: async function(){
    await this.$store.dispatch('contract/load');
  },
  computed: {
    headers: function(){
      return Object.keys(this.items[0]).map(item => ({text: item, value: item}));
    },
    items: function(){
      return this.$store.state.contract.items;
    },    
    loading: function(){
      return this.$fetchState.pending;
    }
  },
  methods: {
    newUser: async function(){
      this.loadingNewUser = true;
      var user = {"email": "22222@fake.com", "name": "22222"};
      try {
        await this.$store.dispatch('contract/set', {user: user});
      } catch(err){
        console.log(err);
      }
      this.loadingNewUser = false;
    },
    deleteUser: async function(id){
      this.loadingDeleteUser = true;
      try {
        await this.$store.dispatch('contract/delete', {id: id});
      } catch(err){
        console.log(err);
      }
      this.loadingDeleteUser = false;
    }
  }

}
</script>