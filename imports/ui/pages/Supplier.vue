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

        <supplier-form @close="close" :updateDoc="updateDoc" />
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

    <supplier-table
      :items="suppliers"
      @delete="handleDelete"
      @edit="handleEdit"
    />
  </div>
</template>

<script>
import SupplierForm from "../components/SupplierForm.vue";
import SupplierTable from "../components/SupplierTable.vue";
import moment from "moment";
export default {
  components: { SupplierForm, SupplierTable },
  data() {
    return {
      dialog: false,
      suppliers: [
        {
          _id: "01",
          company: "Cambodia Soft-Drink",
          ownerName: "Chetra",

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
        let index = this.suppliers.findIndex((obj) => {
          return obj._id == doc._id;
        });
        this.suppliers[index].company = doc.company;
        this.suppliers[index].ownerName = doc.ownerName;
        this.suppliers[index].phone = doc.phone;
        this.suppliers[index].address = doc.address;
        this.suppliers[index].status = doc.status;
      } else {
        // code insert
        this.suppliers.push(doc);
      }
      this.dialog = false;
    },
    handleAdd() {
      this.dialog = true;
    },
    handleDelete(id) {
      console.log("id:", id);
      let index = this.suppliers.findIndex((doc) => {
        return doc._id == id;
      });
      this.suppliers.splice(index, 1);
    },
    handleEdit(doc) {
      this.dialog = true;
      this.updateDoc = Object.assign({}, doc);
    },
  },
};
</script>

<style>
</style>