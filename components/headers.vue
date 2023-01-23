<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <nuxt-link class="navbar-brand" to="/">
          <img src="/images/logo.jpg" width="50px" height="50px" />
          <font style="margin-left: 20px">Web Nuxt2 2FA</font>
        </nuxt-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" aria-expanded="false" data-bs-target="#nav-bar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="nav-bar">
          <ul class="navbar-nav ml-auto navbar-menu">
            <li class="nav-item">
              <nuxt-link class="nav-link" :class="path1 === '/' ? 'active' : ''" to="/">
                Scan 2FA
              </nuxt-link>
            </li>

          </ul>
          <ul class="navbar-nav navbar-no-expand ml-auto">
            <li class="nav-item">
              <div class="dropdown">
                <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">{{ this.$auth.user.name }}</a>
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
    methods: {
      async logout() {
        if (!this.$auth.user) {
          this.$router.push('/login')
          return
        }

        try {
          await this.$auth.logout().then(() => {
            this.$router.push('/login')
          })
        } catch (err) {}
      },
    },
  }
</script>
