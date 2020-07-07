<template>
  <div>
    Product !!! required login
    <v-btn to="product/new">New Product</v-btn>
    <v-card class="mx-auto" max-width="344" v-for="product in products" :key="product.id">
      <v-card-text>
        <p class="display-1 text--primary">{{product.title}}</p>
        <div class="text--primary">Product id {{product.id}}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4" :to="`product/${product.id}`">Learn More</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import * as ProductApi from "~/utils/product-api";
export default {
  middleware: "auth",
  data() {
    return {
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

<style>
</style>