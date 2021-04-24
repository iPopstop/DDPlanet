import api from '@/api/api.js'

const dashboard = () =>
  api({
    method: 'get',
    url: 'admin/dashboard'
  })

const getRoles = (params) =>
  api({
    method: 'get',
    url: 'admin/roles',
    params
  })

const createRole = (data) =>
  api({
    method: 'post',
    url: 'admin/roles',
    data
  })

const destroyRole = (id) =>
  api({
    method: 'delete',
    url: `admin/roles/${id}`,
  })

const getPermissions = (params) =>
  api({
    method: 'get',
    url: 'admin/permissions',
    params
  })

const getPermissionsAssign = () =>
  api({
    method: 'get',
    url: 'admin/permissions/assign',
  })

const permissionsAssign = (data) =>
  api({
    method: 'post',
    url: 'admin/permissions/assign',
    data
  })

const createPermission = (data) =>
  api({
    method: 'post',
    url: 'admin/permissions',
    data
  })


const cfg = (data) =>
  api({
    method: 'post',
    url: 'configuration',
    data
  })

export {
  dashboard,
  cfg,
  getRoles,
  createRole,
  getPermissions,
  createPermission,
  getPermissionsAssign,
  permissionsAssign,
  destroyRole
}
