import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import VeeValidateRu from 'vee-validate/dist/locale/ru'

const messages = {
  alpha_dash: () => 'Только буквы, цифры и дефис',
  alpha_num: () => 'Только буквы и цифры',
  alpha_spaces: () => 'Только буквы и пробелы',
  alpha: () => 'Только буквы',
  max: (field, [length]) => `Не более ${length} символов`,
  max_value: (field, [max]) => `Не более ${max}`,
  min: (field, [length]) => `Длина не менее ${length} символов`,
  min_value: (field, [min]) => `Не менее ${min}`,
  required: () => 'Обязательное поле'
}

VeeValidateRu.messages = {
  ...VeeValidateRu.messages,
  ...messages
}

Vue.use(VeeValidate, {
  events: 'blur|change'
})

Validator.localize('ru', VeeValidateRu)