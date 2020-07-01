<template>
  <v-sheet color="transparent" class="container d-flex flex-column align-center justify-center text-center fill-height">
    <h1 v-if="error.statusCode === 404">
      <h1 class="display-1 text--text text-uppercase font-weight-bold">{{$t('error.title404')}}</h1>
      <p class="subtitle-2 text--text">{{$t('error.body404')}}</p>
    </h1>
    <h1 v-else>
      <h1 class="display-1 text--text text-uppercase font-weight-bold">{{$t('error.other')}}</h1>
      <!-- <p v-if="devMode" class="subtitle-2 text--text">{{path}}</p> -->
      <p v-if="devMode" class="subtitle-2 text--text">{{error}}</p>
    </h1>
    <NuxtLink class="title text--text" to="/">
      {{$t('error.link')}}
    </NuxtLink>
  </v-sheet>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  data () {
    return {
      pageNotFound: this.$t('error.notFound404'),
      otherError: this.$t('error.other')
    }
  },
  computed: {
    devMode: function(){
      return process.env.NODE_ENV == 'development';
    },
    path: function(){
      if(this.$route == null){
        return '';
      }
      return this.$route;//.path;
    },
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
