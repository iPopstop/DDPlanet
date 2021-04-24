<script>
export default {
  name: 'NotFound',
  metaInfo: {
    title: 'NotFound'
  },
}
</script>
<template>
  <div class="row">
    <div class="col-md-10 offset-md-1">
      <h3>Страница не найдена</h3>
      <p class="text-muted">
        Страница, которую Вы ищете, не найдена или недоступна
      </p>
      <router-link :to="{name: 'main'}" class="btn btn-primary">Вернуться на главную</router-link>
    </div>
  </div>
</template>
<style src='@/assets/styles/pages/contacts/index.scss' lang='scss'></style>
