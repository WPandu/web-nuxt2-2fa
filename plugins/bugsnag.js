import Vue from 'vue'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'

if (process.env.BUGSNAG_KEY) {
  Bugsnag.start({
    apiKey: process.env.BUGSNAG_KEY,
    plugins: [new BugsnagPluginVue()]
  })

  const bugsnagVue = Bugsnag.getPlugin('vue')
  bugsnagVue.installVueErrorHandler(Vue)
}
