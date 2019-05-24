<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-alert
            :value="error"
            type="error"
          >
            Error with Email or Password
          </v-alert>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field prepend-icon="person" name="email" label="email" type="text" v-model="email"></v-text-field>
                <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="signin">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    data: () => ({
      email: '',
      password: '',
      drawer: null,
      error: false
    }),
    methods: {
      signin () {
        const email = this.email
        const password = this.password
        this.$store.dispatch('SIGN_IN', { email, password }).then(res => {
          if (res.success) {
            this.error = false
            if (this.$route.query.redirect != undefined) {
              this.$router.push({ path : this.$route.query.redirect })
            } else {
              this.$router.push({ name : 'home' })
            }
          }
          else {
            this.error = true
          }
        })
      },
    },
    props: {
      source: String
    }
  }
</script>
