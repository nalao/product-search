<template>
  <v-row justify="center">
    <v-snackbar v-model="snackbar" top="top">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card>
        <v-card-text>
          <v-text-field v-model="email" label="Username"></v-text-field>
          <v-text-field v-model="password" label="Password" type="password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="handleLoginClicked">Login</v-btn>
          <v-spacer></v-spacer>
          <nuxt-link to="/">
            <v-btn text>Cancel</v-btn>
          </nuxt-link>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "session",
  data() {
    return {
      email: "",
      password: "",
      snackbar: false,
      text: "Login Error, Please try again..."
    };
  },
  methods: {
    async handleLoginClicked() {
      this.snackbar = false;
      try {
        let response = await this.$auth.loginWith("local", {
          data: {
            user: {
              email: this.email,
              password: this.password
            }
          }
        });
        console.log(response);
        if (response.data.success) {
          this.$router.replace({ name: "product" });
        }
      } catch (err) {
        this.snackbar = true;
        console.log(err);
      }
    }
  }
};
</script>

<style>
</style>