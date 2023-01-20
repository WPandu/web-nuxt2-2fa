import VueJwtDecode from 'vue-jwt-decode'
const moment = require('moment')

export default function ({ app, redirect }) {
  if (app.$auth.$state.loggedIn == false && app.context.from.name != 'login') {
    app.$auth.logout()
    app.$cookies.removeAll()
    return redirect('/login')
  }
  if (app.$cookies.get('auth._token.local')) {
    try {
      let token = app.$cookies.get('auth._token.local').substring(7)
      let jwt = VueJwtDecode.decode(token)
      let expires = moment.unix(jwt.exp)
      var now = moment()
      var diff = expires.diff(now, 'seconds')

      if (diff < 0) {
        app.$auth.logout()
        app.$cookies.removeAll()
        return redirect('/login')
      }
    } catch (error) {
      return redirect('/login')
    }
  } else {
    return redirect('/login')
  }
}
