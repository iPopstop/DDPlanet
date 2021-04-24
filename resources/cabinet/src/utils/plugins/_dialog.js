import Vue from 'vue'
import VuejsDialog from 'vuejs-dialog'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'

Vue.use(VuejsDialog, {
  okText: 'Подтвердить',
  cancelText: 'Отмена',
  animation: 'modal fade',
  backdropClose: true
})
