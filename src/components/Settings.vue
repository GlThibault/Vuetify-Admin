<template>
  <v-container fluid>
    <v-toolbar-title>{{this.store.store_name}}</v-toolbar-title>
    <a :href="this.store.url" target="_blank">{{this.store.url}}</a>
    <v-checkbox v-model="store.enabled" label="Widget Enabled" @click="update_store"></v-checkbox>
    <v-flex xs3>
      <v-subheader class="pl-0">A/B Testing %</v-subheader>
      <v-slider
        v-model="store.abtesting"
        thumb-label="always"
        @change="update_store"
      ></v-slider>
    </v-flex>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      store: {}
    }),
    mounted() {
      this.load()
    },
    methods: {
      load() {
        this.$store.dispatch('FETCH_STORE').then(res => {
          this.store = res.response
        })
      },
      update_store () {
        this.$store.dispatch('UPDATE_STORE', this.store)
      }
    },
    props: {
      source: String
    }
  }
</script>
