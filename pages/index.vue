<template>
  <v-layout column>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">
          <v-text-field
            v-model="pro_id"
            label="ປ້ອນລະຫັດ ເພື່ອຄົ້ນຫາ"
            @keyup.enter="search"
          ></v-text-field>
          <v-btn class="ma-2" color="primary" @click="search">ຄົ້ນຫາ</v-btn>
        </v-card-title>
        <v-card-text>
          <v-alert type="error" v-if="warning">
            ບໍ່ພົບຂໍ້ມູນທີ່ຄົ້ນຫາ.
          </v-alert>
          <v-simple-table v-for="item in items" :key="item.name">
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>ລະຫັດ</td>
                  <td>{{ item.pro_id }}</td>
                </tr>
                <tr>
                  <td>ຊື່</td>
                  <td>{{ item.name }}</td>
                </tr>
                <tr>
                  <td><h2>ລາຄາ</h2></td>
                  <td>
                    <h2>{{ item.price | formatNumber }}</h2>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import * as ProductApi from "~/utils/product-api";
export default {
  data() {
    return {
      pro_id: "",
      loading: false,
      items: null,
      warning: false
    };
  },
  methods: {
    async search() {
      this.loading = "overlay";
      this.warning = false;
      const response = await ProductApi.show(this.pro_id);
      this.items = response.data;
      this.loading = false;
      console.log("response", response);
      if (response.data.length == 0) {
        this.warning = true;
      }
    }
  }
};
</script>
