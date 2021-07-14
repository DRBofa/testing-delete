<template>
  <div class="q-ma-md">
    <q-dialog
      v-model="dialog"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-white">
        <q-bar>
          <q-space />
          <q-btn
            dense
            flat
            icon="close"
            v-close-popup
            class="bg-red text-white"
            rounded
          >
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <customer-form @close="close" :updateDoc="updateDoc" />
      </q-card>
    </q-dialog>
    <q-btn
      dense
      icon="add"
      color="primary"
      round
      class="q-mb-sm"
      @click="handleAdd"
    />

    <customer-table
      :items="customers"
      @delete="handleDelete"
      @edit="handleEdit"
    />
  </div>
</template>

<script>
import CustomerForm from "../components/CustomerForm.vue";
import CustomerTable from "../components/CustomerTable.vue";
import moment from "moment";
export default {
  components: { CustomerForm, CustomerTable },
  data() {
    return {
      dialog: false,
      customers: [],
      updateDoc: null,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    close() {
      this.dialog = false;
      this.updateDoc = null;
      this.getData();
    },
    handleAdd() {
      this.dialog = true;
      this.updateDoc = null;
    },
    handleDelete(id) {
      Meteor.call("customer.remove", id, (err, result) => {
        if (result) {
          this.getData();
        }
      });
    },
    handleEdit(doc) {
      this.dialog = true;
      this.updateDoc = Object.assign({}, doc);
      this.updateDoc.dob = moment(doc.dob).format("YYYY-MM-DD");
    },
    getData() {
      Meteor.call("customer.find", (err, result) => {
        if (result) {
          this.customers = result;
        }
      });
    },
  },
};
</script>

<style>
</style>