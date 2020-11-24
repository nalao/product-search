<template>
  <div>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row justify="center">
      <v-snackbar v-model="snackbar" top="top" :color="color">
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card>
          <v-card-title>{{ title }}</v-card-title>
          <v-card-text>
            <v-text-field v-model="pro_id" label="ລະຫັດສິນຄ້າ" v-if="handleMangeClicked"></v-text-field>
            <v-text-field v-model="pro_id" label="ລະຫັດສິນຄ້າ" v-if="!handleMangeClicked" disabled></v-text-field>
            <v-text-field v-model="name" label="ຊື່"></v-text-field>
            <v-text-field v-model="price" label="ລາຄາຍ່ອຍ"></v-text-field>
            <v-text-field v-model="price_send" label="ລາຄາສົ່ງ"></v-text-field>
            <v-text-field v-model="qty" label="ຈຳນວນສິນຄ້າ"></v-text-field>
            <v-select v-model="ccy" :items="items" item-text="text" item-value="value" label=" CCY"></v-select>
          </v-card-text>
          <v-card-actions>
            <v-btn
              outlined
              color="primary"
              @click="handleCreateClicked"
              v-if="handleMangeClicked"
            >SAVE</v-btn>
            <v-btn
              outlined
              color="primary"
              @click="handleUpdateClicked"
              v-if="!handleMangeClicked"
            >EDIT</v-btn>
            <v-spacer></v-spacer>
            <v-btn outlined color="warning" @click="resetForm">Reset</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="products" :search="search">
      <template v-slot:item.price="{ item }">{{ item.price | formatNumber }} {{ item.ccy }}</template>
      <template v-slot:item.price_send="{ item }">{{ item.price_send | formatNumber }} {{ item.ccy }}</template>
      <template v-slot:item.qty="{ item }">
        <v-chip :color="getColor(item.qty)" dark>{{ item.qty }}</v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialData">Reload</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import * as ProductApi from "~/utils/product-api";
export default {
  data() {
    return {
      ccy: { text: "ກີບ", value: "ກີບ" },
      items: [
        { text: "ກີບ", value: "ກີບ" },
        { text: "ບາດ", value: "ບາດ" }
      ],
      title: "MANAGE PRODUCT",
      btnAction: "SAVE",
      handleMangeClicked: true,
      loading: false,
      pro_id: "",
      name: "",
      price: "",
      price_send: "",
      qty: "",
      snackbar: false,
      text: "",
      color: "",
      search: "",
      headers: [
        { text: "ລະຫັດສິນຄ້າ", value: "pro_id", sortable: true },
        { text: "ຊື່", value: "name" },
        { text: "ລາຄາຍ່ອຍ", value: "price" },
        { text: "ລາຄາສົ່ງ", value: "price_send" },
        { text: "ຈຳນວນສິນຄ້າ", value: "qty" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      products: []
    };
  },
  mounted() {
    this.initialData();
  },
  methods: {
    getColor(qty) {
      if (qty > 10) return "green";
      else return "red";
    },
    async initialData() {
      this.loading = "overlay";
      const response = await ProductApi.index();
      this.products = response.data;
      this.loading = false;
    },
    resetForm() {
      this.pro_id = "";
      this.name = "";
      this.price = "";
      this.price_send = "";
      this.qty = "";
      this.ccy = "";
      this.handleMangeClicked = true;
    },
    async handleCreateClicked() {
      if (
        this.pro_id.length == 0 ||
        this.name.length == 0 ||
        this.price.length == 0 ||
        this.price_send.length == 0 ||
        this.qty.length == 0 ||
        this.ccy.length == 0
      ) {
        return;
      }
      this.loading = "overlay";
      const response = await ProductApi.create(
        this.pro_id,
        this.name,
        this.price,
        this.price_send,
        this.qty,
        this.ccy
      );
      if (response.data.status) {
        this.color = "success";
        this.resetForm();
        this.initialData();
      } else {
        this.color = "warning";
      }
      this.text = response.data.msg;
      this.snackbar = true;
      this.loading = false;
    },
    async editItem(item) {
      const response = await ProductApi.show(item.pro_id);
      this.pro_id = response.data[0].pro_id;
      this.name = response.data[0].name;
      this.price = response.data[0].price;
      this.price_send = response.data[0].price_send;
      this.qty = response.data[0].qty;
      this.ccy = response.data[0].ccy;
      this.handleMangeClicked = false;
    },
    async handleUpdateClicked() {
      if (
        this.pro_id.length == 0 ||
        this.name.length == 0 ||
        this.price.length == 0 ||
        this.price_send.length == 0 ||
        this.qty.length == 0 ||
        this.ccy.length == 0
      ) {
        return;
      }
      this.loading = "overlay";
      const response = await ProductApi.update(
        this.pro_id,
        this.name,
        this.price,
        this.price_send,
        this.qty,
        this.ccy
      );
      if (response.data.status) {
        this.color = "success";
        this.resetForm();
        this.initialData();
      } else {
        this.color = "warning";
      }
      this.text = response.data.msg;
      this.snackbar = true;
      this.loading = false;
    },
    deleteItem(item) {
      const index = this.products.indexOf(item);
      confirm(
        "Are you sure you want to delete this product id " + item.pro_id + " ?"
      ) && this.handleDeleteClicked(item.pro_id);
    },
    async handleDeleteClicked(pro_id) {
      this.loading = "overlay";
      const response = await ProductApi.destroy(pro_id);
      if (response.data.status) {
        this.color = "success";
        this.resetForm();
        this.initialData();
      } else {
        this.color = "warning";
      }
      this.text = response.data.msg;
      this.snackbar = true;
      this.loading = false;
    }
  }
};
</script>

<style></style>
