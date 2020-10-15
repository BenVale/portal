<template>
  <v-app style="background-color: var(--v-background-base)">
    <v-app-bar color="primary" app fixed dark dense>
      <v-list-item-avatar :size="32">
        <v-img src="./typefi-o.svg"></v-img>
      </v-list-item-avatar>
      <v-toolbar-items class="d-flex align-center">
        <v-tabs background-color="transparent" optional hide-slider>         
          <v-tab v-for="(item, idx) in items" :key="idx" :to="item.to" nuxt class="px-2">
            <v-badge color="red" dot :value="item.notifications != null">
              <v-icon class="d-md-none">{{item.icon}}</v-icon>
              <div class="d-none d-md-block">{{item.title}}</div>
            </v-badge>
          </v-tab>
        </v-tabs>
      </v-toolbar-items>
      
      <!-- </template> -->

      <v-spacer></v-spacer>
      

      <v-menu offset-y v-if="user != null">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            <v-avatar dark :size="32" color="#FFE9D0" class="mx-1">
              <v-img :src="user.photoURL" :alt="user.name">
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-icon color="black">person</v-icon>
                  </v-row>
                </template>
              </v-img>
            </v-avatar>
            <div class="mx-1">{{user.name}}</div>
            <v-icon small>arrow_drop_down</v-icon>
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
    </v-app-bar>
    <!-- <v-navigation-drawer :mini-variant="mini" permanent app fixed dark>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="./typefi-o.svg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>{{$t('menu.appName')}}</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
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
    </v-navigation-drawer> -->
    <v-main>
      <v-container fluid>
        <!-- <v-row no-gutters>
          <v-col align="start">                               
            <v-menu offset-y v-if="customer != null" max-height="225" min-width="200">
              <template v-slot:activator="{ on, attrs }">
                <v-btn text small v-bind="attrs" v-on="on">
                  <div>{{customer}}</div>
                </v-btn>       
              </template>
              <v-list>
                <v-list-item-group v-model="customerIdx" mandatory>
                  <v-list-item v-for="(item, i) in customers" :key="i" >
                    <v-list-item-content>
                      <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>                  
            </v-menu> -->
            <!-- <v-dialog v-model="customerSelect" scrollable max-width="300px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn text small v-bind="attrs" v-on="on">
                  <div>{{customer}}</div>
                </v-btn>       
              </template>
              <v-card>
                <v-card-title>Select customer</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;">
                  <v-list>
                    <v-list-item-group v-model="customerIdx" mandatory>
                      <v-list-item v-for="(item, i) in customers" :key="i" >
                        <v-list-item-content>
                          <v-list-item-title v-text="item"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>                  
                </v-card-text>
                <!-- <v-divider></v-divider> -->
                <!-- <v-card-actions class="d-flex flex-row justify-end">
                  <v-btn color="blue darken-1" text @click="customerSelect = false">Close</v-btn>
                  <v-btn color="blue darken-1" text @click="customerIdx = customerSelectIdx; customerSelect = false">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>          -->           
          <!-- </v-col>
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
        <v-row> -->
          <!-- <v-container> -->
            <nuxt />
          <!-- </v-container> -->
        <!-- </v-row> -->
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
        { title: this.$t('menu.support'), icon: 'help', to: '/support' },
        { title: this.$t('menu.zendesk'), icon: 'help', to: '/zendesk' },
        { title: this.$t('menu.users'), icon: 'group', to: '/users' },
        { title: this.$t('menu.installations'), icon: 'mdi-key-variant', to: '/installations' },
        { title: this.$t('menu.downloads'), icon: 'get_app', to: '/downloads' },
      ],
      mini: true,      
      customerSelect: false,
      customerIdx: 0,
      customerSelectIdx: 0
    }
  },
  computed: {
    user: function(){
      return this.$auth.user;
    },
    customer: function(){
      return this.customers[this.customerIdx];
    },
    customers: function(){
      return ['OmniCorp','Tyrell Corp','Jupiter Mining','Acme Corp','Weyland Yutani','CHOAM','Oscorp'];
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
