<template>
  <div class="q-ma-md">
    <form>
      <q-card class="shadow-6">
        <q-card-section class="text-h5 text-center"> Form Sale </q-card-section>
        <q-card-section>
          <div class="row items-center">
            <div class="col-md-8 col-xs-12">
              <div class="col-xs-12 col-sm-4 q-ma-sm">
                <q-input
                  outlined
                  type="number"
                  readonly
                  v-model.number="form.invoiceNumber"
                  label="Invoice Number"
                />
              </div>
              <div class="col-xs-12 col-sm-4 q-ma-sm">
                <q-input
                  outlined
                  type="date"
                  readonly
                  v-model.number="form.date"
                  label="Date"
                />
              </div>
              <div class="col-xs-12 col-sm-4 q-ma-sm">
                <q-select
                  outlined
                  v-model="form.customerId"
                  :options="customerOpts"
                  label="Customer"
                  map-options
                  emit-value
                  option-label="name"
                  option-value="_id"
                />
              </div>
              <div class="col-xs-12 col-sm-4 q-ma-sm">
                <q-select
                  outlined
                  v-model="item"
                  :options="itemOpts"
                  label="Item"
                  map-options
                  emit-value
                  option-label="name"
                  option-value="_id"
                />
              </div>
            </div>
            <div class="col-md-4 col-xl-12">
              <div class="q-pa-xl">
                <div class="text-h5 text-center">Total : 5500</div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      item: null,
      form: {
        invoiceNumber: null,
        date: moment(new Date()).format("YYYY-MM-DD"),
        customerId: null,
        items: [],
      },
      itemOpts: [],
      customerOpts: [],
    };
  },
  mounted() {
    this.getCustomer();
    this.getPurchase();
  },
  methods: {
    getPurchase() {
      this.itemOpts = [
        {
          _id: "01",
          itemId: "01",
          name: "Coca",
          price: 5500,
          qty: 15,
        },
        {
          _id: "02",
          itemId: "02",
          name: "Spy",
          price: 6000,
          qty: 12,
        },
      ];
    },
    getCustomer() {
      this.customerOpts = [
        {
          _id: "01",
          name: "Sopheak Chan",
        },
        {
          _id: "02",
          name: "Leakena",
        },
      ];
    },
  },
};
</script>

<style>
</style>