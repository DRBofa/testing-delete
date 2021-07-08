<template>
  <div class="q-ma-md">
    <q-card>
      <q-card-section class="text-center text-h5">
        Purchase Form
      </q-card-section>
      <q-card-section>
        <div class="fit row justify-evenly">
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-select
              outlined
              v-model="form.supplierId"
              label="Supplier"
              :options="supplierOpts"
              map-options
              emit-value
              option-value="_id"
              option-label="company"
            />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-select
              outlined
              v-model="form.itemId"
              label="Item"
              :options="itemOpts"
              map-options
              emit-value
              option-value="_id"
              option-label="name"
            />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input
              outlined
              v-model.number="form.cost"
              label="Cost"
              type="number"
            />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input
              outlined
              v-model.number="form.price"
              label="Price"
              type="number"
            />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input
              outlined
              v-model.number="form.qty"
              label="Quantity"
              type="number"
            />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input outlined v-model="form.date" label="Date" type="date" />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <fieldset>
              <label>Status</label>
              <q-radio v-model="form.status" val="active" label="Active" />
              <q-radio v-model="form.status" val="inactive" label="Inactive" />
            </fieldset>
          </div>

          <div class="col-xs-12 col-sm-4 q-ma-sm"></div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-btn
              color="primary"
              :label="updateDoc ? `Update` : `Submit`"
              @click="handleSubmit"
            />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm"></div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    updateDoc: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      form: {
        supplierId: null,
        itemId: null,
        cost: null,
        price: null,
        qty: null,
        date: moment(new Date()).format("YYYY-MM-DD"),
        status: "active",
      },
      supplierOpts: [],
      itemOpts: [],
    };
  },
  mounted() {
    this.getSupplier();
    this.getItem();
    if (this.updateDoc) {
      this.form = this.updateDoc;
    }
  },
  methods: {
    handleSubmit() {
      this.form.date = moment(this.form.date, "YYYY-MM-DD").toDate();
      let index = this.supplierOpts.findIndex((doc) => {
        return this.form.supplierId == doc._id;
      });
      let indexItem = this.itemOpts.findIndex((doc) => {
        return this.form.itemId == doc._id;
      });

      this.form.name = this.itemOpts[indexItem].name;
      this.form.company = this.supplierOpts[index].company;
      console.log("form:", this.form);
      this.$emit("close", this.form);
    },
    getItem() {
      this.itemOpts = [
        {
          _id: "01",
          name: "Coca",
          categoryName: "Drink",
          categoryId: "01",
          date: new Date(),
          description: "Coca 1.25L",
          satus: "active",
        },
        {
          _id: "02",
          name: "Spy",
          categoryName: "Drink",
          categoryId: "01",
          date: new Date(),
          description: "Spy 1.25L",
          satus: "active",
        },
      ];
    },
    getSupplier() {
      this.supplierOpts = [
        {
          _id: "01",
          company: "Cambodia Soft-Drink",
          ownerName: "Chetra",
          phone: "010202033",
          address: "Battambang",
          status: "active",
        },
      ];
    },
  },
};
</script>

<style>
</style>