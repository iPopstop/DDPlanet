import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAis-5hTn4Wyc0W6oviC8HuWsAvEsIb6zI',
    libraries: 'places',
  },
  installComponents: true
})