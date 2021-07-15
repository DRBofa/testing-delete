<template>
  <div class="q-ma-md">
    <q-card>
      <q-card-section class="text-center text-h5"> Item Form </q-card-section>
      <q-card-section>
        <div class="fit row justify-evenly">
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input outlined v-model="form.name" label="Name" />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-select
              outlined
              v-model="form.categoryId"
              label="Category"
              :options="categoryOpts"
              map-options
              emit-value
              option-value="_id"
              option-label="name"
            />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input type="date" outlined v-model="form.date" label="Date" />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input outlined v-model="form.description" label="Description" />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <fieldset>
              <label for="">Status</label>
              <q-radio v-model="form.status" val="active" label="Active" />
              <q-radio v-model="form.status" val="inactive" label="Inactive" />
            </fieldset>
          </div>

          <div class="col-xs-12 col-sm-4 q-ma-sm"></div>
          <div class="col-xs-12 col-sm-4 q-ma-sm text-center">
            <q-btn
              color="primary"
              :label="updateDoc ? `Update` : `Submit`"
              @click="handleSubmit"
            />
          </div>
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
        name: null,
        date: moment(new Date()).format("YYYY-MM-DD"),
        categoryId: null,
        description: null,
        status: "active",
      },
      categoryOpts: [],
    };
  },
  mounted() {
    this.getCategory();
    if (this.updateDoc) {
      this.form = this.updateDoc;
    }
  },
  methods: {
    handleSubmit() {
      this.form.date = moment(this.form.date, "YYYY-MM-DD").toDate();
      let method = "item.insert";
      if (this.updateDoc) {
        method = "item.update";
      }

      Meteor.call(method, this.form, (err, result) => {
        if (result) {
          this.$emit("close");
        }
      });
    },
    getCategory() {
      Meteor.call("category.find", (err, result) => {
        if (result) {
          this.categoryOpts = result;
        }
      });
    },
  },
};
</script>

<style>
</style>