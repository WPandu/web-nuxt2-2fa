import Vue from 'vue';
import {
  Popover,
  Button,
  Select,
  Option,
  MessageBox,
  Message,
  Pagination,
  Loading,
  Notification,
  Progress,
  Dialog,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Popover);
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Pagination);
Vue.use(Loading);
Vue.use(Progress);
Vue.use(Dialog);
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
