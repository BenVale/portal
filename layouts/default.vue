<template>
  <v-app style="background-color: var(--v-background-base)">
    <v-navigation-drawer :mini-variant="mini" permanent app fixed dark>
      <!-- Header -->
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="./typefi-o.svg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>{{$t('menu.appName')}}</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <!-- List -->
      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- Collpase -->
      <template v-slot:append>
        <v-list>
          <v-list-item @click.stop="mini = !mini">
          <v-list-item-icon>
            <v-icon v-if="mini">chevron_right</v-icon>            
            <v-icon v-else>chevron_left</v-icon>            
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{$t('menu.collapse')}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <v-row no-gutters>
          <v-col align="end">
            <v-menu offset-y v-if="user != null">
              <template v-slot:activator="{ on, attrs }">
                <v-btn text small v-bind="attrs" v-on="on">
                  <v-icon small class="mr-1">person</v-icon>
                  <div>{{user.name}}</div>
                </v-btn>                                  
              </template>
              <v-list dense >
                <v-list-item @click="logout">
                  <v-list-item-icon>
                    <v-icon>logout</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>{{$t('menu.logout')}}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>            
          </v-col>
        </v-row>
        <v-row>
          <v-container>
            <nuxt />
          </v-container>
        </v-row>
      </v-container>
    </v-main>    
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: this.$t('menu.dashboard'), icon: 'home', to: '/' },
        { title: this.$t('menu.usage'), icon: 'trending_up', to: '/usage' },
        { title: this.$t('menu.users'), icon: 'group', to: '/users' },
        { title: this.$t('menu.licenses'), icon: 'mdi-key-variant', to: '/licenses' },
        { title: this.$t('menu.contracts'), icon: 'description', to: '/contracts' },
        { title: this.$t('menu.downloads'), icon: 'get_app', to: '/downloads' },
      ],
      mini: true,      
    }
  },
  computed: {
    user: function(){
      return this.$auth.user;
    }
  },
  methods: {
    logout: async function(){
      await this.$auth.logout();
      this.$router.push('/login');
    }
  }
}
</script>
