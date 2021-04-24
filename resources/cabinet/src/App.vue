<script>

export default {
  name: 'App',
  mounted() {
    if(localStorage.getItem('dark') === 'true') {
      document.body.classList.add('dark')
    }else{
      document.body.classList.remove('dark')
    }
    //localStorage.getItem('fullscreen_mode') === 'true' ? document.body.classList.add('full') : document.body.classList.remove('full')
    //localStorage.getItem('dark') === 'true' ? document.body.classList.add('dark') : document.body.classList.remove('dark')
  }
}
</script>
<template>
  <div>
    <router-view :key="$route.path" />
  </div>
</template>