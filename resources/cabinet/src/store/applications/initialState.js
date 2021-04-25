export default () => (
  {
    applications: {
      total: 0,
      data: []
    },
    users: [],
    search: {
      page: 1,
      page_length: 10,
      sort_by: 'created_at',
      order: 'desc',
      id: '',
      phone: '',
      fio: '',
      status: [],
      mine: false
    },
    current: {
      status: '',
      fio: '',
      phone: '',
      message: '',
      users: [],
      user: {
        id: '',
        fio: ''
      },
      closed_at: '',
      closed_by: {
        id: '',
        fio: ''
      }
    },
    statsForm: {
      period: []
    },
    stats: {
      users: {
        total: 0,
        admins: 0,
      },
      applications: {
        total: 0,
        closed: 0,
        opened: 0
      }
    },
    chart: {
      series: [
        {
          name: 'Открыто',
          data: [0, 0, 0]
        },
        {
          name: 'Закрыто',
          data: [0, 0, 0]
        }
      ],
      chartOptions: {
        chart: {
          type: 'area',
          height: 370,
          stacked: false,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            distributed: false,
          }
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'category',
          labels: {
            formatter: function(value) {
              return moment(value).format('DD.MM.YYYY')
            },
          },
          categories: ['24.04.2021', '25.04.2021'],
        }
      }
    },
    form: []
  }
)
