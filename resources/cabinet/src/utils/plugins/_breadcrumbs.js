import Vue from 'vue'
import VueBreadcrumbs from 'vue-2-breadcrumbs'

Vue.use(VueBreadcrumbs, {
  template:
        '        <nav class="page-breadcrumb" v-if="$breadcrumbs.length" aria-label="breadcrumb">\n' +
        '            <ol class="breadcrumb">\n' +
        '                <li v-for="(crumb, key) in $breadcrumbs" v-if="crumb.meta.breadcrumb" :key="key" :class="[\'breadcrumb-item\', {\'active\': $router.currentRoute.path === getPath(crumb) }]" aria-current="page">\n' +
        '                    <router-link :to="{ path: getPath(crumb) }" :class="[{\'text-muted\': $router.currentRoute.path === getPath(crumb) }]">{{ getBreadcrumb(crumb.meta.breadcrumb) }}</router-link>' +
        '                </li>\n' +
        '            </ol>\n' +
        '        </nav>'
})
