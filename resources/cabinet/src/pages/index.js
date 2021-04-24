import layoutAdmin from './layouts/Admin'
import layoutGuest from './layouts/Guest'
import layoutError from './layouts/Error'
import layoutEmpty from './layouts/Empty'

import main from './requests/Store'
import login from './login/Index'
import notFound from './errors/NotFound'
import applications from './admin/requests/Index'
import applicationsShow from './admin/requests/Show'
import stats from './admin/Stats'

export default {
  layoutGuest,
  layoutError,
  layoutEmpty,
  layoutAdmin,
  main,
  login,
  notFound,
  applications,
  stats,
  applicationsShow
}
