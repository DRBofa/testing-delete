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
      items: [
        {
          _id: "01",
          supplierId: "01",
          itemId: "01",
          name: "Pizza",
          cost: 4000,
          price: 5000,
          qty: 13,
          date: new Date(),
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
        let index = this.items.findIndex((obj) => {
          return obj._id == doc._id;
        });
        this.items[index].supplierId = doc.supplierId;
        this.items[index].itemId = doc.itemId;
        this.items[index].name = doc.name;
        this.items[index].cost = doc.cost;
        this.items[index].price = doc.price;
        this.items[index].qty = doc.qty;
        this.items[index].date = doc.date;
        this.items[index].status = doc.status;
      } else {
        // code insert
        this.items.push(doc);
      }
      this.dialog = false;
    },
    handleAdd() {
      this.dialog = true;
    },
    handleDelete(id) {
      console.log("id:", id);
      let index = this.items.findIndex((doc) => {
        return doc._id == id;
      });
      this.items.splice(index, 1);
    },
    handleEdit(doc) {
      this.dialog = true;
      this.updateDoc = Object.assign({}, doc);
      this.updateDoc.date = moment(doc.date).format("YYYY-MM-DD");
    },
  },
};
</script>

<style>
</style>