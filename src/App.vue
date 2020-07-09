<template>
  <div id="app" class="app">
    <h1 class="app__title">Sport Events Calendar by</h1>
    <img class="app__logo" alt="Logo" src="./assets/logo.png">
    <div class="row">
      <div class="lg-3"></div>
      <div class="lg-6">
        <multiselect
          v-model="select.selected"
          :options="select.options"
          track-by="ID"
          label="name"
          placeholder="Choose sport"
          >
        </multiselect>
      </div>
      <div class="lg-3"></div>
    </div>
    <div class="app__calendar">
      <vue-event-calendar :events="events"></vue-event-calendar>
    </div>
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
      events: [],
    }
  },
  created: function() {
    this.get_categories();
    this.get_events();
  },
  watch: {
    'select.selected': function() {
      this.get_events_by_category();
    }
  },
  methods: {
    get_categories() {
      axios.post(process.env.VUE_APP_API_PROTOCOLL + process.env.VUE_APP_API_BASE_URL + process.env.VUE_APP_API_VERSION + "/get_categories", {})
        .then((response) => {
          this.select.options = response.data;
        }).catch((error) => {
          console.log(error);
      });
    },
    get_events() {
      axios.post(process.env.VUE_APP_API_PROTOCOLL + process.env.VUE_APP_API_BASE_URL + process.env.VUE_APP_API_VERSION + "/get_events", {})
        .then((response) => {
          this.events = response.data;
        }).catch((error) => {
          console.log(error);
      });
    },
    get_events_by_category() {
      axios.post(process.env.VUE_APP_API_PROTOCOLL + process.env.VUE_APP_API_BASE_URL + process.env.VUE_APP_API_VERSION + "/get_events_by_category", {
        categoryId: this.select.selected.ID
      }).then((response) => {
          this.events = response.data;
        }).catch((error) => {
          console.log(error);
      });
    }
  },
}
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.app__logo {
  width: 50%;
}
.app__calendar {
  margin-top: 2rem;
}
.lg-6 {
  width: 50%;
  display: inline-block;
}
.lg-3 {
  width: 25%;
  display: inline-block;
}
</style>
