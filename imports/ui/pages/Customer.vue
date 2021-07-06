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
      customers: [
        {
          _id: "01",
          name: "Jame",
          gender: "male",
          dob: new Date(),
          phone: "017233344",
          address: "Battambang",
          status: "active",
        },
      ],
      updateDoc: null,
    };
  },
  methods: {
    close(doc) {
      if (doc._id) {
        // code update
        let index = this.customers.findIndex((obj) => {
          return obj._id == doc._id;
        });
        this.customers[index].name = doc.name;
        this.customers[index].gender = doc.gender;
        this.customers[index].dob = doc.dob;
        this.customers[index].phone = doc.phone;
        this.customers[index].address = doc.address;
        this.customers[index].status = doc.status;
      } else {
        // code insert
        this.customers.push(doc);
      }
      this.dialog = false;
    },
    handleAdd() {
      this.dialog = true;
    },
    handleDelete(id) {
      console.log("id:", id);
      let index = this.customers.findIndex((doc) => {
        return doc._id == id;
      });
      this.customers.splice(index, 1);
    },
    handleEdit(doc) {
      this.dialog = true;
      this.updateDoc = Object.assign({}, doc);
      this.updateDoc.dob = moment(doc.dob).format("YYYY-MM-DD");
    },
  },
};
</script>

<style>
</style>