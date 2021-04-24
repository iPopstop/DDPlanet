<script>
export default {
  name: "Register",
  metaInfo: {
    title: "Register"
  },
  data: () => ({
    registerForm: {
      email: '',
      password: ''
    },
    freeze: false
  }),
  mounted() {
    document.body.classList.remove('hidden-navigation')
    document.body.classList.add('form-membership')
  },
  beforeDestroy() {
    document.body.classList.add('hidden-navigation')
    document.body.classList.remove('form-membership')
  },
  methods: {
    handleRegister() {
      this.freeze = true
      this.registerForm.errors = {
        email: '',
        password: ''
      }
      this.$store.dispatch('config/register', this.registerForm).then(() => {
        this.$router.push({name: 'main'})
      }).catch(err => {
        setTimeout(() => {
          this.freeze = false
        }, 1450)
        this.registerForm.errors = err.response.data.errors
      })
    }
  }
}
</script>
<template>
  <div>
    <h5>Регистрация</h5>
    <form @submit.prevent="handleRegister">
      <div class="text-left form-group">
        <label for="email">Email</label>
        <input type="text" id="email" class="form-control" placeholder="Email" v-model="registerForm.email">
      </div>
      <div class="text-left form-group">
        <label for="password">Пароль</label>
        <input type="password" id="password" class="form-control" placeholder="Пароль" v-model="registerForm.password">
      </div>
      <div class="custom-control custom-checkbox">
        <input type="checkbox" checked="checked" id="customCheck1" class="custom-control-input">
        <label for="customCheck1" class="custom-control-label text-left">Даю согласие на <a href="#"
                                                                                            class="font-weight-bold text-underline">обработку
          персональных данных</a></label>
      </div>
      <button type="submit" class="mt-4 btn btn-primary btn-block" :disabled="freeze">Зарегистрироваться</button>
      <hr>
      <p class="text-muted">Уже зарегистрированы?</p>
      <router-link class="btn btn-outline-light" :to="{name: 'login'}">Войти!</router-link>
    </form>
  </div>
</template>
<style src="@/assets/styles/pages/register/index.scss" lang="scss"></style>
