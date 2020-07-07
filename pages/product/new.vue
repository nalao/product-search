<template>
  <div>
    New Product
    <v-row justify="center">
      <v-snackbar v-model="snackbar" top="top" :color="color">
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card>
          <v-card-text>
            <v-text-field v-model="title" label="Title"></v-text-field>
            <v-textarea v-model="body" label="Body"></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="handleCreateClicked">Create</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import * as ProductApi from "~/utils/product-api";
export default {
  data() {
    return {
      title: "",
      body: "",
      snackbar: false,
      text: "",
      color: ""
    };
  },
  methods: {
    async handleCreateClicked() {
      if (this.title.length == 0) {
        return;
      }
      const response = await ProductApi.create(this.title, this.body);
      this.$router.replace(`${response.data.id}`);
    }
  }
};
</script>

<style>
</style>