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
export default {
  components: { SupplierForm, SupplierTable },
  data() {
    return {
      dialog: false,
      suppliers: [],
      updateDoc: null,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    close() {
      this.dialog = false;
      this.getData();
    },
    handleAdd() {
      this.dialog = true;
      this.updateDoc = null;
    },
    handleDelete(id) {
      Meteor.call("supplier.remove", id, (err, result) => {
        if (result) {
          this.getData();
        }
      });
    },
    handleEdit(doc) {
      this.dialog = true;
      this.updateDoc = Object.assign({}, doc);
    },
    getData() {
      Meteor.call("supplier.find", (err, result) => {
        if (result) {
          this.suppliers = result;
        }
      });
    },
  },
};
</script>

<style>
</style>