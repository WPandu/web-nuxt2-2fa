<template>
  <div class="container" style="padding-top: 100px">
    <div class="row" >
      <div v-loading="isLoading" class="card"
        style="min-width: 300px; max-width: 500px; display: block; margin-left: auto; margin-right: auto;"
      >
        <div class="card-body" style="padding: 40px 20px">
          <h3 class="text-center" style="margin-bottom: 30px">OTP</h3>
          <form class="form">
            <div class="row">
              <div class="col-md-2 px-1">
                <input
                  v-model="otp[0]"
                  type="text"
                  class="form-control"
                  maxlength="1"
                  required
                  autofocus
                  @keyup="moveCursor"
                  @keypress="isNumber($event)"
                >
              </div>
              <div class="col-md-2 px-1">
                <input
                  v-model="otp[1]"
                  type="text"
                  class="form-control"
                  maxlength="1"
                  required
                  @keyup="moveCursor"
                  @keypress="isNumber($event)"
                >
              </div>
              <div class="col-md-2 px-1">
                <input
                  v-model="otp[2]"
                  type="text"
                  class="form-control"
                  maxlength="1"
                  required
                  @keyup="moveCursor"
                  @keypress="isNumber($event)"
                >
              </div>
              <div class="col-md-2 px-1">
                <input
                  v-model="otp[3]"
                  type="text"
                  class="form-control"
                  maxlength="1"
                  required
                  @keyup="moveCursor"
                  @keypress="isNumber($event)"
                >
              </div>
              <div class="col-md-2 px-1">
                <input
                  v-model="otp[4]"
                  type="text"
                  class="form-control"
                  maxlength="1"
                  required
                  @keyup="moveCursor"
                  @keypress="isNumber($event)"
                >
              </div>
              <div class="col-md-2 px-1">
                <input
                  v-model="otp[5]"
                  type="text"
                  class="form-control"
                  maxlength="1"
                  required
                  @keyup="moveCursor"
                  @keypress="isNumber($event)"
                >
              </div>
              <div class="text-center mt-3">
                <button type="button" class="btn btn-primary" @click="login()" >Log In</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha'
  export default {
    data () {
      return {
        isLoading: false,
        otp: [],
        isVerified: false,
      }
    },
    computed: {
      email() {
        return this.$store.state.login.email
      },
      password() {
        return this.$store.state.login.password
      },
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
        if (this.sitekey && !this.isVerified) {
          this.makeToast('error', 'Please Check Captcha!')
          return false
        }

        return true
      },
      login() {
        if (!this.validate()) {
          return
        }
        this.isLoading = true

        //Append Data
        const data = {
          email: this.email,
          password: this.password,
          otp: this.otp.join(""),
        }

        this.$auth.loginWith('local', {
          data
        }).then(() => {
          this.$router.push('/')
        }).catch((error) => {
          this.makeToast('error', error.response)
          this.isVerified = false
          this.isLoading = false
        })
      },
      moveCursor(e) {
        const inputs = Array.from(
          e.target.form.querySelectorAll('input[type="text"]')
        );
        const index = inputs.indexOf(e.target);

        const key = e.keyCode || e.charCode;

        // Handle backspace or delete key events
        if ((key === 8 || key === 46) && index > 0) {
          inputs[index - 1].focus();
        } else if (key !== 8 && key !== 46 && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      },
    }
  }
</script>
