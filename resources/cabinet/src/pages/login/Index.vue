<script>
import {Form} from '@/utils/helpers/_form'
import FormText from "@/components/Spectrum/Form/FormText"

export default {
  name: 'Login',
  metaInfo: {
    title: 'Login',
  },
  components: {FormText},
  data: () => ({
    loginForm: new Form({
      email: '',
      password: '',
      remember_me: false
    }),
    freeze: false
  }),
  mounted() {
    this.$store.dispatch('config/cookies')
  },
  methods: {
    handleLogin() {
      this.freeze = true
      this.loginForm.submit('config/login').catch(err => {
        setTimeout(() => {
          this.freeze = false
        }, 1450)
      })
    },
    loginAs(type) {
      if(type === 'admin') {
        this.loginForm.email = 'administrator1@popstop.space'
        this.loginForm.password = 'administrator1@popstop.space'
      }else{
        this.loginForm.email = 'employee1@popstop.space'
        this.loginForm.password = 'employee1@popstop.space'
      }
      this.handleLogin()
    }
  }
}
</script>
<template>
  <div class="auth-content">
    <div class="card">
      <div class="row align-items-center text-center">
        <div class="col-md-12">
          <div class="card-body">
            <h4 class="mb-3 f-w-400">Вход</h4>
            <form @submit.prevent="handleLogin" @keydown="loginForm.errors.clear($event.target.name)">
              <form-text
                class="text-left"
                label="Email"
                :value.sync="loginForm.email"
                :error-form="loginForm"
                prop-name="email"
              />
              <form-text
                type="password"
                class="text-left"
                label="Пароль"
                :value.sync="loginForm.password"
                :error-form="loginForm"
                prop-name="password"
              />
              <button type="submit" class="btn btn-primary btn-block" :disabled="freeze">Войти</button>
              <button type="submit" class="btn btn-primary btn-block" @click.prevent="loginAs('admin')" :disabled="freeze">Войти как Администратор</button>
              <button type="submit" class="btn btn-primary btn-block" @click.prevent="loginAs('employee')" :disabled="freeze">Войти как Сотрудник</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style src='@/assets/styles/pages/login/index.scss' lang='scss'></style>
