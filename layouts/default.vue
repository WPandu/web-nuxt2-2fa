<template>
  <div>
      <headers></headers>
        <section class="container">
          <nuxt />
        </section>
  </div>
</template>

<script>
export default {
  middleware: 'authorization',
}
</script>
