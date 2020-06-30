<template>
  <v-card >
    <v-card-title class="d-flex flex-row align-center justify-space-between">
      <div class="d-flex flex-row align-center">
        <v-icon class="mr-2" large color="deep-orange darken-4">verified_user</v-icon>
        {{license.name}}
      </div>
      <v-btn icon>
        <v-icon>settings</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-row no-gutters>
        <v-col>
          <v-row v-for="item in items" :key="item.key" no-gutters>
            <v-col cols="3" class="font-weight-bold">
              {{item.label}}
            </v-col>
            <v-col>
              {{license[item.key]}}
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4" align-self="end">
          <v-row no-gutters>
            <v-col align="end" class="font-weight-bold">
              <div>
                {{$t('license.validUntil')}} {{new Date(license.expireDate) | moment("LL")}}
              </div>
              <div>
                {{$t('license.claimedOn')}} {{ new Date(license.claimDate) | moment("LLL") }}
              </div>
              <div>
                {{$t('license.maintenanceUntil')}} {{ new Date(license.maintenanceDate) | moment("LL") }}
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>        
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    license: {
      required: true
    }
  },
  data () {
    return {     
      items: [
        {label: this.$t('license.issuedBy'), key: 'issuedBy'},
        {label: this.$t('license.issuedTo'), key: 'issuedTo'},
        {label: this.$t('license.installation'), key: 'installation'},
        {label: this.$t('license.installationCode'), key: 'installationCode'},
        {label: this.$t('license.macAddress'), key: 'macAddress'},
        {label: this.$t('license.engineLimit'), key: 'engineLimit'},
        {label: this.$t('license.licenseVersion'), key: 'licenseVersion'},
        {label: this.$t('license.plugins'), key: 'plugins'},
      ]
    }
  },
}
</script>