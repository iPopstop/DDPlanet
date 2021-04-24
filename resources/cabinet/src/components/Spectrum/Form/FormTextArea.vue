<script>
import FormGroup from '@/components/Spectrum/Form/FormGroup'
export default {
  name: "FormTextArea",
  components: {FormGroup},
  props: {
    validations: {
      type: Object,
      default: () => ({})
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  computed: {
    id() {
      if(this.validations) {
        return this.validations.$model + '-ftextarea'
      }
      return ''
    }
  }
}
</script>
<template>
  <div>
    <form-group :validations="validations">
      <div class="form-group" slot-scope="{ errors, invalid }">
        <label :for="id">{{ label }}</label>
        <textarea
          v-model="validations.$model"
          class="form-control"
          :class="{ invalid }"
          :placeholder="placeholder || label"
          :id="id"
        />
        <span v-for="error in errors" class="error">{{ error }}</span>
      </div>
    </form-group>
  </div>
</template>