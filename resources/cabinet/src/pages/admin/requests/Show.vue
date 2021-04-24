<script>
import {mapState} from 'vuex'
import FormText from "@/components/Spectrum/Form/FormText"
import {Form} from '@/utils/helpers/_form'

export default {
  name: 'ShowRequest',
  components: {FormText},
  data: () => ({
    showSearchForm: false,
    closeForm: new Form({
      reason: ''
    }),
    showChangeForm: false,
    changeForm: new Form({
      user_id: null
    })
  }),
  computed: {
    ...mapState('applications', ['current', 'users']),
    getClass() {
      switch(this.current.status) {
        case 'Новое':
          return 'alert-info'
        case 'В работе':
          return 'alert-warning'
        case 'Завершено':
          return 'alert-success'
        default:
          return 'alert-danger'
      }
    }
  },
  methods: {
    loadApplication() {
      this.$store.dispatch('applications/show', this.$route.params.id)
    },
    handleUpdate() {
      this.changeForm.submit('applications/user', {id: this.$route.params.id}).then(() => {
        this.showChangeForm = false
      })
    },
    handleClose() {
      this.closeForm.submit('applications/close', {id: this.$route.params.id}).then(() => {
        this.showChangeForm = false
      })
    }
  },
  watch: {
    search: {
      handler() {
        this.loadApplication()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<template>
  <div class="requests">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <h3>Просмотр обращения</h3>
        </div>
        <div class="row my-2">
          <div class="col-lg-5">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <span class="f-w-500">ФИО</span>
                <span class="float-right">{{ current.fio }}</span>
              </li>
              <li class="list-group-item">
                <span class="f-w-500">
                  Номер телефона
                </span>
                <a :href="`tel:+7${current.phone}`" class="float-right text-body">{{ current.phone }}</a>
              </li>
              <li class="list-group-item">
                <span class="f-w-500">
                  Закреплённый сотрудник <span v-if="current.status !== 'Завершено'" class="text-primary cursor-pointer" @click="showChangeForm = !showChangeForm">(Изменить)</span>
                </span>
                <template v-if="showChangeForm">
                  <div class="my-2" v-if="current.users.length > 0">
                    <v-select :options="current.users" label="fio" :clearable="false" :reduce="i=>i.id" v-model="changeForm.user_id" />
                    <button class="btn btn-primary btn-sm mt-2" @click="handleUpdate">Сохранить</button>
                  </div>
                </template>
                <template v-else>
                  <a href="#" class="float-right text-body" v-if="!isEmpty(current.user)">
                    {{ current.user.fio }} (#{{ current.user.id }})
                  </a>
                  <span class="float-right text-body" v-else>-</span>
                </template>
              </li>
              <template v-if="current.closed_at">
                <li class="list-group-item">
                  <span class="f-w-500">
                    Закрыл
                  </span>
                  <span class="float-right">{{ current.closed_by.fio }} (#{{ current.closed_by.id }})</span>
                </li>
                <li class="list-group-item">
                  <span class="f-w-500">
                    Дата закрытия
                  </span>
                  <a :href="`tel:+7${current.phone}`" class="float-right text-body">{{ current.closed_at | defDate }}</a>
                </li>
              </template>
            </ul>
          </div>
          <div class="col-lg-7">
            <div class="alert" :class="getClass" role="alert">
              <h5 class="alert-heading mb-0">{{ current.status }}</h5>
            </div>
            <div class="card">
              <div class="card-header">
                <h5>
                  <span class="p-l-5">Информация</span>
                </h5>
              </div>
              <div class="card-body">
                <p>
                  {{ current.message }}
                </p>
                <template v-if="current.status !== 'Завершено'">
                  <form-text label="Комментарий" type="textarea" :value.sync="closeForm.reason" />
                  <button class="btn btn-primary btn-sm" @click="handleClose" :disabled="!closeForm.reason">Завершить обращение</button>
                </template>
                <template v-else>
                  <div class="card bg-light">
                    <div class="card-header">Ответ</div>
                    <div class="card-body">
                      <p>{{ current.reason }}</p>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style src='@/assets/styles/pages/requests/index.scss' lang='scss'></style>
