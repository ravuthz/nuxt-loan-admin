<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">Login</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field type="email" name="email" v-model="form.email"/>
            <v-text-field type="password" name="password" v-model="form.password"/>
            <v-btn @click="handleLogin">Login</v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" flat nuxt to="/inspire">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  components: {
    VuetifyLogo
  },
  data() {
    return {
      form: {
        email: _.get(process, "API_DEFAULT_EMAIL"),
        password: _.get(process, "API_DEFAUTL_PASSWORD")
      }
      // form: {
      //   email: "eve.holt@reqres.in",
      //   password: "cityslicka"
      // }
    };
  },
  methods: {
    handleLogin() {
      this.$auth
        .loginWith("local", { data: this.form })
        .then(data => {
          console.log("data ", data);
        })
        .catch(err => {
          console.log("err ", err);
        });
    }
  }
};
</script>
