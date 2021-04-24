<script>
import {mapState} from 'vuex'
import FormText from "@/components/Spectrum/Form/FormText"

export default {
  name: 'Requests',
  components: {FormText},
  data: () => ({
    orderByOptions: [
      {
        value: 'created_at',
        translation: "Дата создания"
      },
      {
        value: 'updated_at',
        translation: "Дата обновления"
      },
    ],
    showSearchForm: false
  }),
  computed: {
    ...mapState('applications', ['search', 'applications', 'users'])
  },
  methods: {
    loadApplications() {
      this.$store.dispatch('applications/index', this.search)
    },
  },
  watch: {
    search: {
      handler() {
        this.loadApplications()
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
          <h3>Заявки</h3>
          <div class="icons">
            <sort-by :form.sync="search" :order-by-options="orderByOptions" />
            <a href="#" @click.prevent="showSearchForm = !showSearchForm">
              <feather type="search" />
            </a>
          </div>
        </div>
        <template v-if="showSearchForm">
          <div class="card">
            <div class="card-header">Поиск</div>
            <div class="card-body">
              <form-text label="ID обращения" :value.sync="search.id" />
              <form-text label="Номер телефона" :value.sync="search.phone" />
              <div class="form-group">
                <label for="status">Статус</label>
                <v-select id="status" :options="['Новое', 'В работе', 'Завершено']" v-model="search.status" :multiple="true" />
              </div>
              <template v-if="$hasRole('admin')">
                <div class="form-group">
                  <label for="employee">Сотрудник</label>
                  <v-select id="employee" label="fio" :reduce="i=>i.id" :options="users" v-model="search.users" :multiple="true" />
                </div>
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="mine" v-model="search.mine">
                  <label class="form-check-label" for="mine">Только мои</label>
                </div>
              </template>
            </div>
          </div>
        </template>
        <div class="table-responsive">
          <table class="table table-hover table-striped">
            <thead>
            <tr>
              <th>ID</th>
              <th>Статус</th>
              <th>ФИО</th>
              <th>Дата обращения</th>
              <th>Номер телефона</th>
              <th>Дата закрытия</th>
              <th>Действия</th>
            </tr>
            </thead>
            <tbody>
            <template v-if="applications.data.length > 0">
              <tr v-for="row in applications.data">
                <td>{{ row.id }}</td>
                <td>{{ row.status }}</td>
                <td>{{ row.fio }}</td>
                <td>{{ row.created_at | defDate }}</td>
                <td>{{ row.phone }}</td>
                <td>
                  <template v-if="row.closed_at">
                    {{ row.closed_at | defDate }}
                  </template>
                  <template v-else>-</template>
                </td>
                <td>
                  <div class="btn-group">
                    <router-link tag="button" :to="{name: 'admin.applications.show', params: {id: row.id}}" class="btn btn-primary btn-sm">
                      <feather type="eye" :size="14" />
                    </router-link>
                  </div>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="7" class="text-center">Ничего не найдено</td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
        <pagination-record :per-page="true" :length.sync="search.page_length" :page.sync="search.page" :records="applications" @updateRecords="loadApplications" />
      </div>
    </div>
  </div>
</template>
<style src='@/assets/styles/pages/requests/index.scss' lang='scss'></style>
