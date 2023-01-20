import Vue from 'vue'
import {
  mapState
} from 'vuex'

import moment from 'moment'

Vue.mixin({
  data() {
    return {
      path1: '',
      path2: '',
      path3: '',
    }
  },
  watch: {
    $route: function (to) {
      this.resolvePath(to.path)
    }
  },
  computed: {
    ...mapState({
      USER: state => state.auth.user,
      // CATEGORIES: state => state.data.categories
    }),
  },
  methods: {
    renderNewLine(val) {
      if (val != undefined) {
        return val.replace(/(?:\r\n|\r|\n)/g, '<br />');
      }
      return;
    },
    resolvePath(path) {
      let splited = path.split('/')

      this.path1 = splited[1] ? splited[1] : ''
      this.path2 = splited[2] ? splited[2] : ''
      this.path3 = splited[3] ? splited[3] : ''
    },
    capitalize(str) {
      if (str != undefined) {
        return str.replace(/\w\S*/g, function (txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
      }
    },
    async makeToast(type, data) {
      // type : success, error, warning, message
      if (!data) {
        return
      }

      let message = ''
      if (type == 'error' && typeof data === 'object') {
        message = await this.handleError(data)
      }
      if (typeof data === 'string') {
        message = data
      }

      if (!message) {
        return
      }

      this.$message({
        showClose: true,
        message: message,
        type: type,
        duration: 5000
      });
    },
    async handleError(error) {
      if (!error) {
        return 'Network Error, Please Refresh this page'
      }

      switch (error.status) {
        case 401:
          if (
            !error.config.url.includes('auth/logout') &&
            !error.config.url.includes('auth/login')
          ) {
            await this.logout()
            return null
          }
          break
        case 413:
          return "Filesize too Large!"
        default:
          break
      }

      if (error.data.message) {
        return error.data.message
      }

      let message = ''
      if (typeof error.data.errors === 'string') {
        message = error.data.errors
      } else {
        for (var i in error.data.errors) {
          message = typeof error.data.errors[i] === 'string' ? error.data.errors[0] : error.data.errors[i][0]
          break
        }
      }

      return message
    },
    formatDateISO(date, type = null) {
      if (type) {
        var result = moment(date).format(type)
      } else {
        var result = moment(date).format('DD MMMM YYYY, HH:mm')
      }

      return result == "Invalid date" ? '-' : result;
    },
    resolveNo(index) {
      return ((index + 1) + ((this.pagination.current_page - 1) * this.pagination.per_page))
    },
    isNumber(evt) {
      let event = evt;

      if (!event) {
        event = window.event;
      }

      const charCode = event.which ? event.which : event.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        event.preventDefault();

        return;
      }

      return true;
    },
  },
  components: {},
  mounted() {
    let route = this.$route ? this.$route.path : ''
    this.resolvePath(route)
  }
})
