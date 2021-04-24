<script>
import VuePhoneNumberInput from "vue-phone-number-input"
import FormText from "@/components/Spectrum/Form/FormText"
import {Form} from '@/utils/helpers/_form'
import {maxLength, minLength, required} from "vuelidate/lib/validators"

export default {
  name: 'StoreRequest',
  components: {VuePhoneNumberInput, FormText, Form},
  data: () => ({
    phone: '',
    createForm: new Form({
      fio: '',
      phone: '',
      message: ''
    })
  }),
  validations: {
    createForm: {
      fio: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(50)
      },
      phone: {
        required
      },
      message: {
        required,
        minLength: minLength(5)
      }
    }
  },
  methods: {
    checkPhone(result) {
      this.createForm.phone = result.isValid ? result.nationalNumber : ''
    },
    handleSubmit() {
      this.createForm.submit('applications/create').then(() => {
        this.createForm = new Form({
          fio: '',
          phone: '',
          message: ''
        })
        this.phone = ''
      })
    }
  },
}
</script>
<template>
  <div class="requests">
    <div class="auth-content">
      <div class="card">
        <div class="row align-items-center text-center">
          <div class="col-md-12">
            <div class="card-body">
              <h3 class="mb-3 f-w-400">Обращение в поддержку</h3>
              <form @submit.prevent="handleSubmit">
                <form-text
                  placeholder="ФИО"
                  feather="user"
                  other="mb-3"
                  :first-upper="true"
                  :prepend="true"
                  :icon-size="21"
                  :validations="$v.createForm.fio"
                  :value.sync="$v.createForm.fio.$model"
                />
                <div class="form-group mb-3">
                  <VuePhoneNumberInput
                    id="phone"
                    :default-country-code="'RU'"
                    :translations="{
                          countrySelectorLabel: 'Код страны',
                          countrySelectorError: 'Выберите страну',
                          phoneNumberLabel: 'Номер телефона',
                          example: 'Пример:'
                        }"
                    @update="checkPhone"
                    v-model="phone"
                  />
                </div>
                <form-text
                  type="textarea"
                  label="Текст обращения"
                  :validations="$v.createForm.message"
                  :value.sync="$v.createForm.message.$model"
                />
                <button type="submit" class="btn btn-primary btn-block" :disabled="$v.createForm.$invalid">Отправить</button>
              </form>
              <template v-if="!$isAuth">
                <div class="d-flex justify-content-center mt-4">
                  <router-link :to="{name: 'login'}">Вход для администрации</router-link>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style src='@/assets/styles/pages/requests/index.scss' lang='scss'></style>
