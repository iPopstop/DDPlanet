<script>
import {mapState} from 'vuex'
import FormText from "@/components/Spectrum/Form/FormText"
import apexchart from 'vue-apexcharts'

export default {
  name: 'Stats',
  components: {FormText, apexchart},
  computed: {
    ...mapState('applications', ['statsForm', 'stats', 'chart'])
  },
  methods: {
    loadStats() {
      this.$store.dispatch('applications/stats', this.statsForm).then(() => {
        this.$refs.statsChart.updateSeries(this.chart.series)
        this.$refs.statsChart.updateOptions({
          xaxis: {
            type: 'category',
            categories: this.chart.chartOptions.xaxis.categories
          }
        })
      })
    },
  },
  watch: {
    statsForm: {
      handler() {
        this.loadStats()
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
          <h3>Статистика (Work In Progress)</h3>
        </div>
        <div class="d-flex justify-content-center">
          <form-date label="no" :range="true" :clearable="true" :date.sync="statsForm.periods" />
        </div>
        <div class="row my-2">
          <div class="col-md-12 col-xl-6">
            <div class="card bg-primary order-card">
              <div class="card-body">
                <h6 class="text-white">Сотрудников</h6>
                <h2 class="text-white">{{ stats.users.total }}</h2>
                <p class="m-b-0">{{ stats.users.admins }} администраторов</p>
                <feather type="users" class="card-icon" />
              </div>
            </div>
          </div>
          <div class="col-md-12 col-xl-6">
            <div class="card bg-warning order-card">
              <div class="card-body">
                <h6 class="text-white">Обращений</h6>
                <h2 class="text-white">{{ stats.applications.total }}</h2>
                <p class="m-b-0">{{ stats.applications.opened }} открыто / {{ stats.applications.closed }} закрыто</p>
                <feather type="file" class="card-icon" />
              </div>
            </div>
          </div>
        </div>
        <div class="my-2">
          <apexchart ref="statsChart"
                     type="area"
                     height="380"
                     :options="chart.chartOptions"
                     :series="chart.series"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style src='@/assets/styles/pages/requests/index.scss' lang='scss'></style>
