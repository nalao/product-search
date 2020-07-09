<template>
  <v-layout column>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-snackbar v-model="snackbar" top="top" :color="color">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
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
                  <td><h2>ລະຫັດ</h2></td>
                  <td>
                    <h2>{{ item.pro_id }}</h2>
                  </td>
                </tr>
                <tr>
                  <td><h2>ຊື່</h2></td>
                  <td>
                    <h2>{{ item.name }}</h2>
                  </td>
                </tr>
                <tr>
                  <td><h2>ລາຄາຍ່ອຍ</h2></td>
                  <td>
                    <h2>{{ item.price | formatNumber }} {{ item.ccy }}</h2>
                  </td>
                </tr>
                <tr>
                  <td><h2>ລາຄາສົ່ງ</h2></td>
                  <td>
                    <h2>{{ item.price_send | formatNumber }} {{ item.ccy }}</h2>
                  </td>
                </tr>
                <tr>
                  <td><h2>ຈຳນວນ</h2></td>
                  <td>
                    <h2>{{ item.qty | formatNumber }}</h2>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">
                    <v-btn block color="warning" dark @click.stop="openSale">
                      ຂາຍ
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">ປ້ອນຈຳນວນທີ່ຕ້ອງການຂາຍ</v-card-title>
        <v-card-text
          ><v-text-field v-model="qty" @keyup.enter="sale"></v-text-field
        ></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="darken-1" text @click="dialog = false">ຍົກເລີກ</v-btn>
          <v-btn color="green darken-1" text @click="sale">ຂາຍ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import axios from "axios";
import * as ProductApi from "~/utils/product-api";
export default {
  data() {
    return {
      dialog: false,
      pro_id: "",
      qty: "",
      loading: false,
      items: null,
      warning: false,
      snackbar: false,
      text: "",
      color: ""
    };
  },
  methods: {
    async search() {
      this.loading = "overlay";
      this.warning = false;
      const response = await ProductApi.show(this.pro_id);
      this.items = response.data;
      this.loading = false;
      if (response.data.length == 0) {
        this.warning = true;
      }
    },
    openSale() {
      this.qty = "";
      this.dialog = true;
    },
    async sale() {
      this.loading = "overlay";
      const response = await ProductApi.sale(this.items[0].pro_id, this.qty);
      if (response.data.status) {
        this.color = "success";
        this.search();
        this.dialog = false;
      } else {
        this.color = "warning";
      }
      this.text = response.data.msg;
      this.snackbar = true;
      this.loading = false;
      this.search();
    }
  }
};
</script>
