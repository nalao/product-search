<template>
  <div>
    <div v-if="product">
      <v-btn :to="{name :'product-id-edit', params: {id:$route.params.id }}">Edit</v-btn>
      <v-btn @click="handleDeleteClicked" color="error">Delete</v-btn>
      <h1>{{ product.title }}</h1>
      <p>{{ product.body }}</p>
    </div>
  </div>
</template>

<script>
import * as ProductApi from "~/utils/product-api";
export default {
  data() {
    return {
      product: null
    };
  },
  async mounted() {
    const response = await ProductApi.show(this.$route.params.id);
    this.product = response.data;
  },
  methods: {
    async handleDeleteClicked() {
      const response = await ProductApi.destroy(this.product.id);
      this.$router.replace({ name: "product" });
    }
  }
};
</script>

<style>
</style>