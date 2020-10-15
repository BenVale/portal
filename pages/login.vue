<template>
  <div>
    <v-img src="./typefi_login.svg" width="128px" height="160px"/>
    <h1 class="mb-4">{{$t('menu.appName')}}</h1>
    <v-card max-width="600px">      
      <v-card-text>        
        <v-form v-model="valid" lazy-validation @submit="login">
          <v-text-field v-model="username" @input="error = null" @keyup.enter="login" :rules="[rules.required]" :placeholder="$t('login.username')" type="text" prepend-inner-icon="person" autofocus/>
          <v-text-field v-model="password" @input="error = null" @keyup.enter="login" :rules="[rules.required]" :placeholder="$t('login.password')" type="password" prepend-inner-icon="mdi-key-variant"/>
          <v-expand-transition>
            <v-alert v-if="error" type="error" dense class="text-left">
              {{error}}
            </v-alert>
          </v-expand-transition>
          <v-btn :disabled="!valid" color="success" block :loading="loading" @click="login">
            {{$t('login.login')}}
          </v-btn>          
        </v-form>
      </v-card-text>
    </v-card>     
    <div class="caption my-3">
      <span v-html="$t('login.tocMessage', ['<a href=\'toc\' target=\'_blank\'>' + $t('login.toc') + '</a>'])"/>      
    </div>   
  </div>
</template>

<script>

export default {
  layout: 'noauth',
  auth: false,
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      valid: true,
      rules: {
        required: value => !!value || this.$t('rule.required'),
      },
      error: null
    }
  },
  methods: {
    async login() {
      this.error = null;
      this.loading = true;
      try {
        var response = await this.$auth.loginWith('local', { data: {username: this.username, password: this.password} })
        location.href = '/';
        // this.$router.push('/');
        
      } catch (err) {
        if(err.response != null){
          console.log(err.response.data);
        } else {
          console.log(err);
        }
        this.error = this.$t('login.invalidUser');
      }
      this.loading = false;
    }
  }
}
</script>