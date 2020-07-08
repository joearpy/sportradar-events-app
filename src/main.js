import Vue from 'vue';
import App from './App.vue';
import vueEventCalendar from 'vue-event-calendar';
Vue.use(vueEventCalendar, { locale: "en", color: "#C41230" });

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
