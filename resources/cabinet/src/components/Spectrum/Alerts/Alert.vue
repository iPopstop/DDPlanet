<template>
  <fade-transition>
    <div
      v-if="visible"
      :class="[`alert-${type}`, { 'alert-with-icon': withIcon }]"
      class="alert"
      role="alert"
      @click="tryClose"
    >
      <slot v-if="!dismissible" />
      <div
        v-else
        class="container"
      >
        <slot />
        <slot name="dismiss-icon">
          <button
            aria-label="Close"
            class="close"
            type="button"
            @click="dismissAlert"
          >
            <span aria-hidden="true">
              <i class="tim-icons icon-simple-remove">X</i>
            </span>
          </button>
        </slot>
      </div>
    </div>
  </fade-transition>
</template>
<script>
import { FadeTransition } from "vue2-transitions"

export default {
  name: "base-alert",
  components: {
    FadeTransition
  },
  props: {
    type: {
      type: String,
      default: "default",
      description: "Alert type"
    },
    dismissible: {
      type: Boolean,
      default: false,
      description: "Whether alert is dismissible (closeable)"
    },
    withIcon: {
      type: Boolean,
      default: false,
      description: "Whether alert contains icon"
    },
    clickHandler: Function
  },
  data() {
    return {
      visible: true
    }
  },
  methods: {
    tryClose(evt) {
      if (this.clickHandler) {
        this.clickHandler(evt, this)
      }
    },
    dismissAlert() {
      this.visible = false
    }
  }
}
</script>
