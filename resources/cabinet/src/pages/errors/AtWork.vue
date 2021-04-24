<script>
export default {
  name: 'AtWork',
  metaInfo: {
    title: 'AtWork'
  },
  methods: {
    reloadPage(){
      this.$router.go()
    }
  },
}
</script>
<template>
  <div class="container h-100-vh">
    <div class="row align-items-md-center h-100-vh">
      <div class="col-lg-6 offset-lg-1 text-center text-lg-left">
        <h2 class="display-4">Мы вернёмся позже!</h2>
        <p class="text-muted">В данный момент проводятся технические работы</p>
        <button @click.prevent="reloadPage" class="btn btn-primary">Обновить страницу</button>
      </div>
    </div>
  </div>
</template>
<style src='@/assets/styles/pages/contacts/index.scss' lang='scss'></style>
