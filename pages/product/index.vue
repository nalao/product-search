<template>
  <div>
    <v-card-title>
      <v-btn to="product/new" color="primary">New Product</v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="products"
      :search="search"
    ></v-data-table>
  </div>
</template>

<script>
import * as ProductApi from "~/utils/product-api";
export default {
  data() {
    return {
      search: "",
      headers: [
        { text: "PRODUCT ID", value: "pro_id" },
        { text: "NAME", value: "name" },
        { text: "PRICE", value: "price" }
      ],
      products: []
    };
  },
  async mounted() {
    const response = await ProductApi.index();
    this.products = response.data;
    console.log("response", response);
  }
};
</script>

<style></style>
