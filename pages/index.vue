<template>
  <div>
  </div>
</template>

<script>
  export default {
    auth: true,
    methods: {
      resolveRoute() {
        setTimeout(function () {
          this.$router.push('/upload')
        }.bind(this))
      }
    },
    mounted() {
      if (this.$auth.user) {
        this.resolveRoute()
      } else {
        this.$router.push('/login')
      }
    }
  }
</script>
