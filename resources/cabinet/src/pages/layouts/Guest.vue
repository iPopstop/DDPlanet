<script>
import {mapState} from "vuex"

export default {
  name: 'layoutGuest',
  metaInfo: {
    title: 'layoutGuest'
  },
  computed: {
    ...mapState('config', ['is_auth'])
  },
  watch: {
    is_auth: {
      handler() {
        if(this.is_auth) {
          this.$router.push({name: 'admin.stats'})
        }
      }
    }
  }
}
</script>
<template>
  <div class="auth-wrapper">
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view :key="$route.path" />
    </transition>
  </div>
</template>
