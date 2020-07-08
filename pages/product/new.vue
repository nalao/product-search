<template>
  <div>
    <v-btn to="/product" color="primary">Product</v-btn>
    <v-row justify="center">
      <v-snackbar v-model="snackbar" top="top" :color="color">
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false"
            >Close</v-btn
          >
        </template>
      </v-snackbar>
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card>
          <v-card-text>
            <v-text-field v-model="pro_id" label="PRODUCT ID"></v-text-field>
            <v-text-field v-model="name" label="NAME"></v-text-field>
            <v-text-field v-model="price" label="PRICE"></v-text-field>
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
      pro_id: "",
      name: "",
      price: "",
      snackbar: false,
      text: "",
      color: ""
    };
  },
  methods: {
    async handleCreateClicked() {
      if (
        this.pro_id.length == 0 ||
        this.name.length == 0 ||
        this.price.length == 0
      ) {
        return;
      }
      const response = await ProductApi.create(
        this.pro_id,
        this.name,
        this.price
      );
      console.log(response);
      // this.$router.replace(`${response.data.id}`);
    }
  }
};
</script>

<style></style>
