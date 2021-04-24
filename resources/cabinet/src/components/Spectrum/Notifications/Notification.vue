<template>
  <div
    :class="[{'alert-with-icon': icon}, verticalAlign, horizontalAlign, alertType]"
    :style="customPosition"
    class="alert open"
    data-notify="container"
    data-notify-position="top-center"
    role="alert"
    @click="tryClose"
  >
    <button
      v-if="showClose"
      aria-hidden="true"
      class="close col-xs-1"
      data-notify="dismiss"
      type="button"
      @click="close"
    >
      <svg
        id="Layer_1"
        enable-background="new 0 0 121.31 122.876"
        fill="#FFF"
        height="15px"
        viewBox="0 0 121.31 122.876"
        width="15px"
        x="0px"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        y="0px"
      >
        <g>
          <path
            clip-rule="evenodd"
            d="M90.914,5.296c6.927-7.034,18.188-7.065,25.154-0.068 c6.961,6.995,6.991,18.369,0.068,25.397L85.743,61.452l30.425,30.855c6.866,6.978,6.773,18.28-0.208,25.247 c-6.983,6.964-18.21,6.946-25.074-0.031L60.669,86.881L30.395,117.58c-6.927,7.034-18.188,7.065-25.154,0.068 c-6.961-6.995-6.992-18.369-0.068-25.397l30.393-30.827L5.142,30.568c-6.867-6.978-6.773-18.28,0.208-25.247 c6.983-6.963,18.21-6.946,25.074,0.031l30.217,30.643L90.914,5.296L90.914,5.296z"
            fill-rule="evenodd"
          />
        </g>
      </svg>
    </button>
    <div
      v-if="icon"
      class="alert-icon-back"
    >
      <span
        :class="['alert-icon', icon]"
        data-notify="icon"
      />
    </div>
    <div
      class="message"
      data-notify="message"
    >
      <div
        v-if="title"
        class="title"
      >
        <b>{{ title }}<br></b>
      </div>
      <div
        v-if="message"
        v-html="message"
      />
      <content-render
        v-if="!message && component"
        :component="component"
      />
      <div
        v-if="timeout"
        :style="{width: `${percents}%`}"
        class="bg-danger"
      />
    </div>
  </div>
</template>
<script>
import _filter from "lodash/filter"
import _indexOf from "lodash/indexOf"

export default {
  name: "notification",
  components: {
    contentRender: {
      props: ["component"],
      render(h) {
        return h(this.component)
      }
    }
  },
  props: {
    message: {
      type: String,
      default: 'Not found'
    },
    title: {
      type: String,
      default: '',
    },
    icon: {
      type:String,
      default: ''
    },
    verticalAlign: {
      type: String,
      default: "top",
      validator: value => {
        const acceptedValues = ["top", "bottom"]
        return _indexOf(acceptedValues, (value))
      }
    },
    horizontalAlign: {
      type: String,
      default: "right",
      validator: value => {
        const acceptedValues = ["left", "center", "right"]
        return _indexOf(acceptedValues, (value))
      }
    },
    type: {
      type: String,
      default: "info",
      validator: value => {
        const acceptedValues = [
          "info",
          "primary",
          "danger",
          "warning",
          "success"
        ]
        return _indexOf(acceptedValues, (value))
      }
    },
    timeout: {
      type: Number,
      default: 5000,
      validator: value => {
        return value >= 0
      }
    },
    timestamp: {
      type: Date,
      default: () => new Date()
    },
    component: {
      type: [Object, Function],
      default: () => ({})
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnClick: {
      type: Boolean,
      default: true
    },
    clickHandler: {
      type: Function,
      default: () => ({})
    }
  },
  data() {
    return {
      elmHeight: 0,
      percents: 0
    }
  },
  computed: {
    hasIcon() {
      return this.icon && this.icon.length > 0
    },
    alertType() {
      return `notify-${this.type}`
    },
    customPosition() {
      const initialMargin = 20
      const alertHeight = this.elmHeight + 10
      let sameAlertsCount = _filter(this.$notifications.state, alert => {
        return (
          alert.horizontalAlign === this.horizontalAlign &&
          alert.verticalAlign === this.verticalAlign &&
          alert.timestamp <= this.timestamp
        )
      }).length
      if (this.$notifications.settings.overlap) {
        sameAlertsCount = 1
      }
      const pixels = (sameAlertsCount - 1) * alertHeight + initialMargin
      const styles = {}
      if (this.verticalAlign === "top") {
        styles.top = `${pixels}px`
      } else {
        styles.bottom = `${pixels}px`
      }
      return styles
    }
  },
  methods: {
    stopTimeout() {
      this.close()
      clearInterval(this.progress)
    },
    close() {
      this.$emit("close", this.timestamp)
    },
    tryClose(evt) {
      if (this.clickHandler) {
        this.clickHandler(evt, this)
      }
      if (this.closeOnClick) {
        this.stopTimeout()
      }
    }
  },
  mounted() {
    this.elmHeight = this.$el.clientHeight
    if (this.timeout) {
      this.progress = setInterval(() => {
        this.percents >= 100 ? this.stopTimeout() : this.percents += 1
      }, this.timeout / 100)
      // setTimeout(this.close, this.timeout)
    }
  }
}
</script>
<style lang="scss">
.notifications .alert {
  position: fixed;
  z-index: 10000;

  &[data-notify='container'] {
    width: 480px;
    cursor: pointer;
  }

  &.center {
    left: 0;
    right: 0;
    margin: 0 auto;
  }

  &.left {
    left: 20px;
  }

  &.right {
    right: 20px;
  }
}
.notify-danger {
  position: relative;
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  color: #FFF;
  background: #961b20;
}
.message {
  padding-right: 70px;
}

.bg-danger {
  background: #000;
  width: 0;
  height: 10px;
  transition: all 0.5s linear;
}
</style>
