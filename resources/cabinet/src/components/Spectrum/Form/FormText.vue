<script>
import FormGroup from "@/components/Spectrum/Form/FormGroup"
import _has from 'lodash/has'
import ShowError from '@/components/Spectrum/Form/ShowError'

const slugify = require('slugify')

export default {
  name: "FormText",
  components: {FormGroup, ShowError},
  props: {
    validations: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: 'text'
    },
    allowOnly: {
      type: Boolean,
      default: false
    },
    template: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    firstUpper: {
      type: Boolean,
      default: false
    },
    regExp: {
      type: RegExp,
      default: null
    },
    replacement: {
      type: String,
      default: ''
    },
    err: {
      type: String,
      default: "Произошла ошибка"
    },
    placeholder: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number],
      default: ""
    },
    prepend: {
      type: Boolean,
      default: false
    },
    other: {
      type: String,
      default: ""
    },
    errorForm: {
      type: [Object],
      default: () => ({})
    },
    propName: {
      type: String,
      default: ""
    },
    feather: {
      type: String,
      default: ""
    },
    iconSize: {
      type: Number,
      default: 24
    }
  },
  data: () => ({
    val: '',
    templates: {
      cyrillicLetters: /[^А-Яа-яЁё]/g,
      cyrillicAndOther: /[A-Za-z]/g,
      positiveInteger: /^[0\D]*|\D*/g
    }
  }),
  methods: {
    formatValue(val) {
      let value = val.toString()
      if (value && this.firstUpper) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
      }
      if (this.template) {
        return _has(this.templates, this.template) ? value.replace(this.templates[this.template], this.replacement) : value
      }

      return value.replace(this.regExp, this.replacement)
    },
    // update the value of input
    updateValue(val) {
      const formattedValue = this.formatValue(val)
      this.val = formattedValue
      this.emitInput(formattedValue)
    },
    // emit input event
    emitInput(val) {
      this.$emit('update:value', val);
    }
  },
  computed: {
    id() {
      if (this.validations) {
        return this.slug + "-f" + this.type
      }
      return ""
    },
    slug() {
      let label = this.label
      return slugify(label.substring(0, 20))
    }
  },
  watch: {
    // watch value prop
    value: {
      handler(value = '') {
        if (value !== this.val) {
          this.updateValue(value)
        }
      },
      immediate: true
    }
  }
}
</script>
<template>
  <div>
    <form-group :validations="validations">
      <div slot-scope="{ errors, invalid }">
        <div :class="[other, {'form-group': !prepend, 'input-group': prepend}]">
          <label :for="id" v-if="label">{{ label }}</label>
          <template v-if="prepend && feather">
            <div class="input-group-prepend">
             <span class="input-group-text">
               <feather :type="feather" class="icon-sm" :size="iconSize"/>
             </span>
            </div>
          </template>
          <template v-if="type === 'text' || type === 'password'">
            <input :type="type" :id="id" :placeholder="placeholder || label" class="form-control"
                   :class="{invalid, 'mb-1': errorForm && propName}" v-model="val"
                   @input="updateValue($event.target.value)"/>
          </template>
          <template v-else-if="type === 'textarea'">
          <textarea :id="id" :placeholder="placeholder || label" class="form-control" :class="{invalid}" v-model="val"
                    @input="updateValue($event.target.value)"/>
          </template>
        </div>
        <span v-for="error in errors" class="d-flex error font-weight-bold text-danger mb-3">{{ error }}</span>
        <template v-if="errorForm && propName">
          <show-error :form="errorForm" :prop="propName"/>
        </template>
      </div>
    </form-group>
  </div>
</template>