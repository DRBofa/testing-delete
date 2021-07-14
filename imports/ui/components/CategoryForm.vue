<template>
  <div class="q-ma-md">
    <q-card>
      <q-card-section class="text-center text-h5">
        Category Form
      </q-card-section>
      <q-card-section>
        <div class="fit row justify-evenly">
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input outlined v-model="form.name" label="Name" />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input type="date" outlined v-model="form.date" label="Date" />
          </div>
          <div class="col-xs-12 col-sm-4 q-ma-sm">
            <q-input outlined v-model="form.description" label="Description" />
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
        date: null,
        description: null,
      },
    };
  },
  mounted() {
    if (this.updateDoc) {
      this.form = this.updateDoc;
    }
  },
  methods: {
    handleSubmit() {
      this.form.date = moment(this.form.date, "YYYY-MM-DD").toDate();
      let method = "category.insert";
      if (this.updateDoc) {
        // code update
        method = "category.update";
      }
      Meteor.call(method, this.form, (err, result) => {
        if (result) {
          this.$emit("close");
        }
      });
    },
  },
};
</script>

<style>
</style>