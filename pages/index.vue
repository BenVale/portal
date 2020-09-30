<template>
  <v-container fluid class="pa-0 px-4">
    <v-row no-gutters style="color: var(--v-text-base)">
      <v-col v-if="installation != null">
        <h3 class="font-weight-medium" style="line-height: 1">{{installation.title}}<v-icon small>arrow_drop_down</v-icon></h3>        
        <div class="caption font-weight-light">{{$t('dashboard.licenseExpires', [$moment(installation.expires).format("LL")])}}</div>
      </v-col>
      <v-col v-if="customer != null" align="end">
        <h3 class="font-weight-medium" style="line-height: 1">{{customer.name}}<v-icon small>arrow_drop_down</v-icon></h3>
        <div class="caption font-weight-light">{{$t('dashboard.dataUpdated', [$moment(customer.updated).format("LLL")])}}</div>
      </v-col>
    </v-row>
    <v-row>
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6" lg="3" style="min-height: 164px">
            <dashBoardPanel icon="description" :title="$t('dashboard.pagesUsed')" to="/usage" moreIcon="info"/>     
          </v-col>
          <v-col cols="12" sm="6" lg="3" style="min-height: 164px">
            <dashBoardPanel icon="watch_later" :title="$t('dashboard.supportHoursUsed')" to="/support" moreIcon="info"/>     
          </v-col>
          <v-col cols="12" sm="6" lg="3" style="min-height: 164px">
            <dashBoardPanel icon="bookmark" :title="$t('dashboard.zendeskTicketsUsed')" to="/zendesk" moreIcon="info"/>     
          </v-col>
          <v-col cols="12" sm="6" lg="3" style="min-height: 164px">
            <dashBoardPanel icon="person" :title="$t('dashboard.usersAllocated')" to="/users" moreIcon="info"/>     
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="7" style="min-height: 400px">
            <dashBoardPanel icon="trending_up" :title="$t('dashboard.pagesRemainingVsUsed')" moreIcon="more_horiz">
              <template>
                <usageChart/>
              </template>
            </dashBoardPanel>     
          </v-col>
          <v-col cols="12" lg="5" style="min-height: 400px">
            <dashBoardPanel icon="watch_later" :title="$t('dashboard.supportEntries')" to="/support" moreIcon="more_horiz">     
              <template>
                
              </template>
            </dashBoardPanel>
          </v-col>
        </v-row>
      </v-container>      
    </v-row>
  </v-container>
</template>

<script>
import dashBoardPanel from '~/components/dashBoardPanel.vue';
import usageChart from '~/components/usageChart.vue';

export default {
  data() {
    return {                  
    }
  },
  components: {
    dashBoardPanel,
    usageChart
  },
  computed: {
    installation: function(){
      return {title: "Typefi Server 8 - Production", expires: new Date()};//TODO
    },
    customer: function(){
      return {name: "Omni Consumer Products", updated: new Date()};//TODO
    },    
  },
  methods: {

  }
}
</script>
