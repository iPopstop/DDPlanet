import Vue from 'vue'
import VueI18n from 'vue-i18n'
import _forEach from 'lodash/forEach'

Vue.use(VueI18n)

function loadLocaleMessages() {
  const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  _forEach(locales.keys(), (key) => {
    const matched = key.match(/([a-z0-9]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

export default new VueI18n({
  locale: process.env.VUE_APP_LOCALE_DEFAULT_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_LOCALE_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
