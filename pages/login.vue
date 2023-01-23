<template>
  <div class="container" style="padding-top: 100px">
    <div class="row" >
      <div v-loading="isLoading" class="card"
        style="min-width: 300px; max-width: 500px; display: block; margin-left: auto; margin-right: auto;"
      >
          <div class="card-body" style="padding: 40px 20px">
            <h3 class="text-center" style="margin-bottom: 50px">Login</h3>
            <div class="row">
              <div class="row mb-4">
                <div class="col-sm-3">
                  <label> Email </label>
                </div>
                <div class="col-sm-8">
                  <input type="text" v-model="data.email" class="form-control" autocomplete="off"/>
                </div>
              </div>
              <div class="row mb-4">
                <div class="col-sm-3">
                  <label> Password </label>
                </div>
                <div class="col-sm-8">
                  <input type="password" v-model="data.password" class="form-control" autocomplete="off" />
                </div>
              </div>
              <div class="row mb-4" v-if="sitekey">
                <div class="col-sm-3">
                </div>
                <div class="col-sm-8">
                  <vue-recaptcha ref="recaptcha" @verify="onVerify" :sitekey="sitekey" @expired="onExpired"></vue-recaptcha>
                </div>
              </div>
              <div class="text-center">
                <button type="button" class="btn btn-primary" @click="login()" >Log In</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha';
  export default {
    data () {
      return {
        isLoading: false,
        data: {
          email: null,
          password: null,
          recaptcha: '',
        },
        sitekey: process.env.CAPTCHA_SITEKEY,
        isVerified: false,
      }
    },
    layout: 'blank',
    components: {
      VueRecaptcha
    },
    head: {
      script: [{
        src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit'
      }]
    },
    methods: {
      onVerify: function (response) {
        if (response != '0') {
          this.isVerified = true
          this.data.recaptcha = response
        } else {
          this.isVerified = false
          this.data.recaptcha = ''
        }
      },
      onExpired: function () {
        this.isVerified = false
        this.data.recaptcha = ''
      },
      validate() {
        if (!this.data.email) {
          this.makeToast("error", "Email must be filled!")
          return false
        }

        if (!this.data.password) {
          this.makeToast('error', 'Please input password!')
          return false
        }

        if (this.sitekey && !this.isVerified) {
          this.makeToast("error", "Please Check Captcha!")
          return false
        }

        return true
      },
      login() {
        if (!this.validate()) {
          return
        }
        this.isLoading = true

        this.$auth.loginWith('local', {
          data: this.data
        }).then(() => {
          this.$router.push('/')
        }).catch((error) => {
          if (error.response.data.error_code === 'NEED_OTP') {
            this.$store.commit('login/setEmail', this.data.email)
            this.$store.commit('login/setPassword', this.data.password)
            this.$router.push('/otp')
            return
          }

          this.makeToast("error", error.response)
          this.$refs.recaptcha.reset()
          this.data.recaptcha = ''
          this.isVerified = false
          this.isLoading = false
        })
      }
    }
  }
</script>
