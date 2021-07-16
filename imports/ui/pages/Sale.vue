<template>
  <div class="q-ma-md">
    <form @submit.prevent="handleSubmit">
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
                  @input="handleChangeItem"
                />
              </div>
            </div>
            <div class="col-md-4 col-xl-12">
              <div class="q-pa-xl">
                <div class="text-h5 text-center">Total : {{ total() }}</div>
              </div>
            </div>
          </div>
          <q-markup-table>
            <thead>
              <tr>
                <th class="text-left">No</th>
                <th class="text-left">Name</th>
                <th class="text-left">Price</th>
                <th class="text-left">Qty</th>
                <th class="text-left">Amount</th>
                <th class="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in form.items" :key="index">
                <td class="text-left">{{ index + 1 }}</td>
                <td class="text-left">{{ item.name }}</td>
                <td class="text-left">{{ item.price }}</td>
                <td class="text-left" style="width: 150px">
                  <q-input type="number" v-model.number="item.qty" />
                </td>
                <td class="text-left">{{ item.price * item.qty }}</td>
                <td class="text-left">
                  <q-btn
                    color="red"
                    icon="delete"
                    dense
                    flat
                    @click="handleRemove(index)"
                  />
                </td>
              </tr>
            </tbody>
          </q-markup-table>
          <div class="text-center q-ma-md">
            <q-btn color="primary" label="Submit" type="submit" />
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
    this.getInvoiceNumber();
  },
  methods: {
    clearForm() {
      this.form = {
        invoiceNumber: null,
        date: moment(new Date()).format("YYYY-MM-DD"),
        customerId: null,
        items: [],
      };
      this.item = null;
      this.getInvoiceNumber();
    },
    handleSubmit() {
      let doc = {
        invoiceNumber: this.form.invoiceNumber,
        customerId: this.form.customerId,
        date: moment(this.form.date, "YYYY-MM-DD").toDate(),
        items: [],
      };

      this.form.items.forEach((it) => {
        doc.items.push({
          _id: it._id,
          price: it.price,
          qty: it.qty,
        });
      });
      Meteor.call("invoice.insert", doc, (err, result) => {
        if (result) {
          this.clearForm();
        }
      });
    },
    handleRemove(index) {
      this.form.items.splice(index, 1);
    },
    getInvoiceNumber() {
      Meteor.call("invoice.number", (err, result) => {
        if (result) {
          this.form.invoiceNumber = result;
        }
      });
    },
    total() {
      let total = 0;
      this.form.items.forEach((it) => {
        total += it.price * it.qty;
      });
      return total;
    },
    handleChangeItem(val) {
      let found = this.form.items.findIndex((doc) => {
        return doc._id == val.itemId;
      });
      if (found != -1) {
        this.form.items[found].qty++;
      } else {
        this.form.items.push({
          _id: val.itemId,
          name: val.name,
          price: val.price,
          qty: 1,
        });
      }
      console.log("form", this.form);
    },
    getPurchase() {
      Meteor.call("purchase.find", (err, result) => {
        if (result) {
          this.itemOpts = result;
        }
      });
    },
    getCustomer() {
      Meteor.call("customer.find", (err, result) => {
        if (result) {
          this.customerOpts = result;
        }
      });
    },
  },
};
</script>

<style>
</style>