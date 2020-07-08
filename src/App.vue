<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <multiselect
      v-model="select.selected"
      :options="select.options"
      track-by="ID"
      label="name"
      >
    </multiselect>
    {{selected}}
    <vue-event-calendar :events="demoEvents"></vue-event-calendar>
  </div>
</template>

<script>
import 'vue-event-calendar/dist/style.css';
import "vue-multiselect/dist/vue-multiselect.min.css";
import Multiselect from 'vue-multiselect';
import axios from "axios";

export default {
  name: 'App',
  components: {
    Multiselect
  },
  data () {
    return {
      select: {
        selected: null,
        options: []
      },
      events: [

      ],
      demoEvents: [{
        date: '2020-07-13', // Required
        title: 'Foo' // Required
      }, {
        date: '2020/07/11',
        title: 'Bar',
        desc: 'description',
      }]
    }
  },
  created: function() {
    this.get_categories();
  },
  methods: {
    get_categories() {
      axios.post(process.env.VUE_APP_API_PROTOCOLL + process.env.VUE_APP_API_BASE_URL + process.env.VUE_APP_API_VERSION + "/get_categories", {})
        .then((response) => {
          this.select.options = response.data;
        })
        .catch((error) => {
          console.log(error);
      });
    },
    get_events_by_category() {
      axios.post(process.env.VUE_APP_API_PROTOCOLL + process.env.VUE_APP_API_BASE_URL + process.env.VUE_APP_API_VERSION + "/get_events_by_category", {})
        .then((response) => {
          this.events = response.data;
        })
        .catch((error) => {
          console.log(error);
      });
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
