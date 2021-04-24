<script>
import {mapState} from "vuex"

export default {
  name: "layoutAdmin",
  data: () => ({
    navMenu: false,
    navLinks: [
      {
        label: 'Главная',
        to: 'main',
      },
      {
        label: 'Вступить в партию',
        to: 'join.default',
        check: 'join_default'
      },
      {
        label: 'Заявка в МСР',
        to: 'join.msr',
        check: 'join_msr'
      },
      {
        label: 'Календарь',
        to: 'calendar',
        check: 'calendar'
      },
      {
        label: 'Контакты',
        to: 'contacts',
        check: 'contacts'
      },
      {
        label: 'Заявки',
        to: 'applications',
        role: 'admin'
      },
      {
        label: 'Конфигурация',
        to: 'configuration.index',
        role: 'admin'
      }
    ],
  }),
  computed: {
    ...mapState('config', ['is_auth'])
  },
  methods: {
    logout() {
      this.$store.dispatch('config/logout')
    }
  },
  watch: {
    is_auth: {
      handler() {
        if(!this.is_auth && this.$route.name !== 'login') {
          this.$router.push({name: 'login'})
        }
      }
    }
  }
}
</script>
<template>
  <div class="layout-wrapper">
    <nav class="pc-sidebar">
      <div class="navbar-wrapper">
        <div class="m-header d-flex justify-content-center">
          <a href="/admin" class="b-brand">
            <h4 class="text-center text-white mb-0">Обращения</h4>
          </a>
        </div>
        <div class="navbar-content ps">
          <div class="p-3 text-white text-center">
            <span>{{ $auth('email') }}</span>
            <span class="d-block">{{ $auth('roles_list') ? $auth('roles_list').join('; ') : '' }}</span>
          </div>
          <ul class="pc-navbar">
            <li class="pc-item pc-caption">
              <label>Навигация</label>
            </li>
            <router-link tag="li" :to="{name: 'admin.stats'}" class="pc-item" active-class="active">
              <a href="#" class="pc-link d-flex align-items-center">
                <span class="pc-micon d-flex">
                  <feather type="home"/>
                </span>
                <span class="pc-mtext">
                  Главная
                </span>
              </a>
            </router-link>
            <router-link tag="li" :to="{name: 'admin.applications'}" class="pc-item" active-class="active">
              <a href="#" class="pc-link d-flex align-items-center">
                <span class="pc-micon d-flex">
                  <feather type="file"/>
                </span>
                <span class="pc-mtext">
                  Заявки
                </span>
              </a>
            </router-link>
            <li class="pc-item">
              <a href="#" @click.prevent="logout" class="pc-link d-flex align-items-center">
                <span class="pc-micon d-flex">
                  <feather type="power"/>
                </span>
                <span class="pc-mtext">
                  Выход
                </span>
              </a>
            </li>
          </ul>
      </div>
      </div>
    </nav>
    <div class="pc-container">
      <div class="pcoded-content">
        <router-view />
      </div>
    </div>
  </div>
</template>
