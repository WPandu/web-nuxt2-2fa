<template>
  <div class="upload-page">
    <div class="upload-container">
      <div class="back-green-card" />
      <div class="content-card">
        <div class="content">
          <div class="text-center">
            <span class="content-label">Please scan the QR code below.</span>
          </div>
          <div class="text-center">
            <img v-if="data.qr_code" class="d-block" :src="`${data.qr_code}`" />
            <button class="btn btn-primary" @click="submitAuthenticator">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {AuthSvc} from '@/service/api'

export default {
  middleware: 'auth',
  data () {
    return {
      data: {},
    }
  },
  methods: {
    getData() {
      let vm = this

      vm.data = []
      vm.isLoading = true
      AuthSvc.getQRCode().then((res) => {
        vm.data = res.data.data
        console.log(vm.data)
      }).catch((err) => {
        vm.makeToast("error", err)
      }).then(() => {
        vm.isLoading = false
      })
    },
    submitAuthenticator() {
      let vm = this

      vm.isLoading = true
      AuthSvc.registerQRCode({
        google_2fa_secret: this.data.secret_key
      }).then(() => {
        vm.makeToast("success", "Success register 2FA google")
      }).catch((err) => {
        vm.makeToast("error", err)
      }).then(() => {
        vm.isLoading = false
      })
    },
  },
  mounted(){
    this.getData()
  }
}
</script>
