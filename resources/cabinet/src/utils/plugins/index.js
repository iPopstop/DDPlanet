import './_isEmpty'
import './_toastr'
import './_feather'
import './_filters'
import './_config'

if (process.env.VUE_APP_LOCALE_TYPE === 'json') {
  require('./language/localesLanguage')
} else if (process.env.VUE_APP_LOCALE_TYPE === 'api') {
  require('./language/apiLanguage')
}

import './laravel/_user'
import './forms/_select'
import './forms/date/_formdate'
import './_vuelidate'
//import './_clipboard'
// import './forms/_signature'
import './laravel/_paginationRecord'
import './laravel/_sortby'