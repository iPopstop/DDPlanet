export default () => ({
  auth: {
    id: '',
    email: '',
    roles: [],
    preferences: {
      page_length: 10
    },
    roles_list: []
  },
  is_auth: false,
  config: {
    page_length: 10,
    pagination: [10, 25, 50]
  },
  permissions: [],
  last_activity: null,
  default_role: {
    admin: '',
    regadmin: '',
    partymember: '',
    msrmember: '',
    user: '',
  }
})
