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

        <purchase-form @close="close" :updateDoc="updateDoc" />
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

    <purchase-table :items="items" @delete="handleDelete" @edit="handleEdit" />
  </div>
</template>

<script>
import PurchaseForm from "../components/PurchaseForm.vue";
import PurchaseTable from "../components/PurchaseTable.vue";
import moment from "moment";
export default {
  components: { PurchaseForm, PurchaseTable },
  data() {
    return {
      dialog: false,
      items: [],
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

    getData() {
      Meteor.call("purchase.find", (err, result) => {
        if (result) {
          this.items = result;
        }
      });
    },
  },
};
</script>

<style>
</style>