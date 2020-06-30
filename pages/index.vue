<template>
  <v-container fluid class="pa-0">
    <v-row v-for="(row, rowIdx) in container.rows" :key="rowIdx" :style="'height: ' + row.height">
      <v-col v-for="(col, colIdx) in row.cols" :key="colIdx">
        <v-card class="fill-height" :to="col.to" hover>
          <v-card-title>
            <v-icon class="mr-2">{{col.icon}}</v-icon>
            {{col.title}}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>  
  </v-container>
</template>

<script>

export default {
  data() {
    return {

      container: {
        rows: [
          {
            height: '40vh',
            cols: [
              {title: this.$t('dashboard.graph1'), icon: 'trending_up', to: '/usage'}, 
              {title: this.$t('dashboard.graph2'), icon: 'trending_up', to: '/usage'}, 
              {title: this.$t('dashboard.graph3'), icon: 'trending_up', to: '/usage'}, 
            ]
          },
          {
            height: null,
            cols: [
              {title: this.$t('dashboard.pageCount'), icon: 'layers', to: '/usage'}, 
              {title: this.$t('menu.users'), icon: 'group', to: '/users'}, 
              {title: this.$t('menu.downloads'), icon: 'get_app', to: '/downloads'}, 
              {title: this.$t('dashboard.maintenance'), icon: 'build', to: '/licenses'}, 
            ]
          },
          {
            height: '40vh',
            cols: [
              {title: this.$t('menu.contracts'), icon: 'description', to: '/contracts'}, 
              {title: this.$t('menu.licenses'), icon: 'mdi-key-variant', to: '/licenses'}, 
            ]
          }
        ]
      }
    }
  },
  components: {
  }
}
</script>
