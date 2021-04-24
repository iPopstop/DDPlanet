import _some from "lodash/some"
import _omit from "lodash/omit"
import Notifications from "./Notifications.vue"

const NotificationStore = {
  state: [],
  settings: {
    overlap: true,
    verticalAlign: process.env.VUE_APP_NOTIFICATION_VERTICAL_POSITION,
    horizontalAlign: process.env.VUE_APP_NOTIFICATION_HORIZONTAL_POSITION,
    type: "info",
    timeout: 5000,
    closeOnClick: true,
    showClose: true
  },
  setOptions(options) {
    this.settings = Object.assign(this.settings, options)
  },
  clearNotifications() {
    this.state = []
  },
  removeNotification(timestamp) {
    const indexToDelete = this.state.findIndex((n) => n.timestamp === timestamp)
    if (indexToDelete !== -1) {
      this.state.splice(indexToDelete, 1)
    }
  },
  addNotification(notification) {
    if (typeof notification === "string" || notification instanceof String) {
      notification = { message: notification }
    }
    notification.timestamp = new Date()
    notification.timestamp.setMilliseconds(
      notification.timestamp.getMilliseconds() + this.state.length
    )
    notification = { ...this.settings, ...notification}
    const prevent = process.env.VUE_APP_NOTIFICATION_PREVENT_DUPLICATES
    if ((!prevent) || (prevent && !_some(this.state, _omit(notification, ["timestamp"])))) {
      this.state.push(notification)
    }
  },
  notify(notification) {
    if (Array.isArray(notification)) {
      notification.forEach((notificationInstance) => {
        this.addNotification(notificationInstance)
      })
    } else {
      this.addNotification(notification)
    }
  }
}

const NotificationsPlugin = {
  install(Vue, options) {
    const app = new Vue({
      data: {
        notificationStore: NotificationStore
      },
      methods: {
        notify(notification) {
          this.notificationStore.notify(notification)
        }
      }
    })
    Vue.prototype.$notify = app.notify
    Vue.prototype.$notifications = app.notificationStore
    Vue.component("Notifications", Notifications)
    if (options) {
      NotificationStore.setOptions(options)
    }
  }
}

export default NotificationsPlugin
