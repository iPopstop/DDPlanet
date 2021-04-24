<template>
  <div class="notifications">
    <transition-group
      :mode="transitionMode"
      :name="transitionName"
    >
      <notification
        v-for="notification in notifications"
        :key="notification.timestamp.getTime()"
        v-bind="notification"
        :click-handler="notification.onClick"
        @close="removeNotification"
      />
    </transition-group>
  </div>
</template>
<script>
import Notification from "./Notification.vue"
import BaseAlert from "../Alerts/Alert"

export default {
  components: {
    BaseAlert,
    Notification
  },
  props: {
    transitionName: {
      type: String,
      default: "list"
    },
    transitionMode: {
      type: String,
      default: "in-out"
    },
    overlap: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    removeNotification(timestamp) {
      this.$notifications.removeNotification(timestamp)
    },
    clearNotifications() {
      this.$notifications.clearNotifications()
    }
  },
  computed: {
    notifications() {
      return this.$notifications.state
    }
  },
  created() {
    this.$notifications.settings.overlap = this.overlap
  },
  watch: {
    overlap(newVal) {
      this.$notifications.settings.overlap = newVal
    }
  }
}
</script>
<style lang="scss">
.notifications {
  .list-move {
    transition: transform 0.3s, opacity 0.4s;
  }

  .list-item {
    display: inline-block;
    margin-right: 10px;
  }

  .list-enter-active {
    transition: transform 0.2s ease-in, opacity 0.4s ease-in;
  }

  .list-leave-active {
    transition: transform 1s ease-out, opacity 0.4s ease-out;
  }

  .list-enter {
    opacity: 0;
    transform: scale(1.1);
  }

  .list-leave-to {
    opacity: 0;
    transform: scale(1.2, 0.7);
  }
}
</style>
