import axios from 'axios'
import qs from 'qs'
// import _has from "lodash/has"

const send = axios.create({
    paramsSerializer: (params) => qs.stringify(params),
    baseURL: process.env.VUE_APP_URL +'/api' ?? 'localhost/'
})

send.defaults.withCredentials = true

send.interceptors.response.use(
    (response) => {
        let data = response.data
        if (process.env.VUE_APP_FORM_NOTIFICATIONS && data.status === 'success' && data.message) {
            let msg = data.message
            helper.hasProperty(data, 'notification', process.env.VUE_APP_TOASTR_ALLOWED.split(','))
                ? toastr[data.notification](msg)
                : toastr['success'](msg)
        }
        return Promise.resolve(response)
    },
    (error) => {
        //helper.showDataErrorMsg(error)
         let status = error.response.status

        if(status === 419) {
          store.dispatch('config/cookies')
          store.dispatch('config/logout')
        }

      if (error.response.status === 422 && error.response.data.errors && error.response.data.errors.message) {
        const msg = error.response.data.errors.message[0]
        toastr.error(msg)
      }

        /*
   // Логика для лимита запросов
	  if (status === 429) {
		toastr.error('Лимит запросов исчерпан, попробуйте позже')
	  }

   // Логика При системной ошибке
	  if (status === 500) {
		toastr.error('Лимит запросов исчерпан, попробуйте позже')
		store.dispatch('config/logout')
	  }
   *
  */
        /*
  if(_has(error.response.data, 'errors')) {
    if(process.env.VUE_APP_FORM_ERRORS && _has(error.response.data.errors, 'state')) {
      store.dispatch(`${process.env.VUE_APP_FORM_STORE}/loadErrors`, error.response.data)
    }
     // Логика При ошибке
    if (error.response.status === 422 && error.response.data.errors && error.response.data.errors.message) {
    //const msg = error.response.data.errors.message[0]
    }
  }
  */
        return Promise.reject(error)
    }
)

export default send
