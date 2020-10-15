<template>
  <div>    
    <v-text-field v-model="search" :placeholder="$t('action.search')" prepend-inner-icon="search" clearable solo/>
    <div v-if="loading" class="d-flex flex-row align-center justify-center flex-grow-1">
      <v-progress-circular indeterminate :size="64" color="primary"></v-progress-circular>
    </div>
    <v-list v-else class="pa-0" color="transparent">
      <v-fade-transition group hide-on-leave>
        <v-list-item v-for="item in itemsFiltered" :key="item.id" class="pa-0">
          <licenseItem :license="item" class="flex-grow-1 mb-2"/>          
        </v-list-item>      
      </v-fade-transition>
    </v-list>
  </div>
</template>

<script>
import licenseItem from '~/components/licenseItem.vue';

export default {
  components: {
    licenseItem
  },
  data() {
    return {
      search: null,            
    }
  },
  fetch: async function(){
    await this.$store.dispatch('license/load');
  },
  fetchOnServer: true,
  computed: {
    items: function(){
      return this.$store.state.license.items;
    },
    itemsFiltered: function(){
      if(this.search == null){
        return this.items;
      }
      return this.items.filter(item => item.name.toLowerCase().match(new RegExp(this.search)) != null);
    },
    loading: function(){
      return this.$fetchState.pending;
    }
  }

}
</script>