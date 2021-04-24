<script>
export default {
  name: 'layoutEmpty',
  metaInfo: {
    title: 'layoutEmpty'
  }
}
</script>
<template>
  <router-view :key="$route.path" />
</template>
