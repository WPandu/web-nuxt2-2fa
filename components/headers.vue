<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">
          <img src="/images/logo.png" width="50px" height="50px" />
          <font style="margin-left: 20px">Web Nuxt2 2FA</font>
        </nuxt-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" aria-expanded="false" data-bs-target="#nav-bar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="nav-bar">
          <ul class="navbar-nav ml-auto navbar-menu">
            <li class="nav-item">
              <nuxt-link class="nav-link" :class="path1 == 'upload' ? 'active' : ''" to="/upload">
                Upload
              </nuxt-link>
            </li>

            <li class="nav-item">
              <nuxt-link class="nav-link" :class="path1 == 'po-upload-history' ? 'active' : ''" to="/po-upload-history/">
                PO Upload History
              </nuxt-link>
            </li>

            <li class="nav-item">
              <nuxt-link class="nav-link" :class="path1 == 'po-history' ? 'active' : ''" to="/po-history/">
                PO CSV History
              </nuxt-link>
            </li>
          </ul>
          <ul class="navbar-nav navbar-no-expand ml-auto">
            <li class="nav-item">
              <div class="dropdown">
                <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Buyer Code</a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#" @click="logout()">Log Out</a></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      async logout() {
        if (!this.$auth.user) {
          this.$router.push('/')
          return
        }

        try {
          await this.$auth.logout().then(() => {
            this.$router.push('/')
          })
        } catch (err) {}
      },
    },
    mounted() {
    },
  }
</script>
