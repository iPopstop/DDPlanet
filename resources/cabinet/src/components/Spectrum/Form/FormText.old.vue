<script>
import FormGroup from "@/components/Spectrum/Form/FormGroup"
import _has from 'lodash/has'

export default {
  name: "FormText",
  components: { FormGroup },
  props: {
    validations: {
      required: true,
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
    formatValue (val) {
      let value = val.toString()
      if(this.template) {
        return _has(this.templates, this.template) ? value.replace(this.templates[this.template], this.replacement) : value
      }

      return value.replace(this.regExp, this.replacement)
    },
    // update the value of input
    updateValue (val) {
      const formattedValue = this.formatValue(val)
      this.val = formattedValue
      this.emitInput(formattedValue)
    },
    // emit input event
    emitInput (val) {
      this.$emit('update:' + this.validations.$model, val)
    }
  },
  computed: {
    id() {
      if (this.validations) {
        return this.validations.$model + "-ftext"
      }
      return ""
    }
  }
}
</script>
<template>
  <div>
    <form-group :validations="validations">
      <div class="form-group" slot-scope="{ errors, invalid }">
        <label :for="id">{{ label }}</label>
        <template v-if="type === 'text'">
          <input :id="id" :placeholder="placeholder || label" class="form-control" :class="{invalid}" v-model="val" @input="updateValue($event.target.value)" />
        </template>
        <template v-else-if="type === 'textarea'">
          <textarea :id="id" :placeholder="placeholder || label" class="form-control" :class="{invalid}" v-model="val" @input="updateValue($event.target.value)" />
        </template>
        <span v-for="error in errors" class="error">{{ error }}</span>
      </div>
    </form-group>
  </div>
</template>