<template>
  <div>
    EDIT
    <div v-if="product">
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
              <v-text-field v-model="product.title" label="Title"></v-text-field>
              <v-textarea v-model="product.body" label="Body"></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-btn text @click="handleUpdateClicked">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import * as ProductApi from "~/utils/product-api";
export default {
  data() {
    return {
      product: null,
      snackbar: false,
      text: "",
      color: ""
    };
  },
  async mounted() {
    const response = await ProductApi.show(this.$route.params.id);
    this.product = response.data;
  },
  methods: {
    async handleUpdateClicked() {
      if (this.product.title.length == 0) {
        return;
      }
      const response = await ProductApi.update(
        this.product.id,
        this.product.title,
        this.product.body
      );
      this.$router.replace({
        name: "product-id",
        params: { id: this.product.id }
      });
    }
  }
};
</script>

<style>
</style>