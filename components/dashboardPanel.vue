<template>
  <v-card class="fill-height" style="border-radius: 10px; color: var(--v-text-base);" :to="to" hover>
    <v-card-title class="pa-3">
      <v-icon size="18" class="mr-1" color="primary">{{icon}}</v-icon>
      <h5 class="font-weight-medium">{{title}}</h5>
      <v-spacer/>
      <v-icon size="18" class="mr-1" color="grey lighten-1">{{moreIcon}}</v-icon>
    </v-card-title>
    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    icon: {
      required: true
    },
    title: {
      required: true
    },
    to: {
      required: false
    },
    moreIcon: {
      required: true
    }
  },  
}
</script>