<template>
  <component
    :is="tag"
    :class="[
      {'btn-round': round},
      {'btn-block': block},
      {'btn-icon btn-fab': icon},
      {[`btn-${type}`]: type},
      {[`btn-${size}`]: size},
      {'btn-simple': simple},
      {'btn-link': link},
      {'disabled': disabled && tag !== 'button'}
    ]"
    :disabled="disabled || loading"
    :type="tag === 'button' ? nativeType : ''"
    class="btn"
    @click="handleClick"
  >
    <slot name="loading">
      <template v-if="loading">
        <svg
          id="loader-1"
          class="default-loader"
          style="enable-background:new 0 0 50 50;"
          viewBox="0 0 50 50"
          x="0px"
          xml:space="preserve"
          xmlns="http://www.w3.org/2000/svg"
          y="0px"
        >
          <path
            d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
            fill="#000"
          >
            <animateTransform
              attributeName="transform"
              attributeType="xml"
              dur="0.6s"
              from="0 25 25"
              repeatCount="indefinite"
              to="360 25 25"
              type="rotate"
            />
          </path>
        </svg>
      </template>
      <!--      <i v-if="loading" class="fas fa-spinner fa-spin"></i>-->
    </slot>
    <slot />
  </component>
</template>
<script>
export default {
  name: "base-button",
  props: {
    tag: {
      type: String,
      default: "button",
      description: "Тег"
    },
    round: Boolean,
    icon: Boolean,
    block: Boolean,
    loading: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      default: "default",
      description: "Цвет (тип) (primary|secondary|danger)"
    },
    nativeType: {
      type: String,
      default: "button",
      description: "Нативный тип (input/button)"
    },
    size: {
      type: String,
      default: "",
      description: "Размер (sm|lg)"
    },
    simple: {
      type: Boolean,
      description: "Обводка"
    },
    link: {
      type: Boolean,
      description: "Кнопка-ссылка (без рамок и фона)"
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit("click", evt)
    }
  }
}
</script>
<style lang="scss">
.default-loader {
  display: inline-block;
  width: 1em;
  height: 1em;
}
</style>