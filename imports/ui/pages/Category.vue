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

        <category-form @close="close" :updateDoc="updateDoc" />
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

    <category-table
      :items="categories"
      @delete="handleDelete"
      @edit="handleEdit"
    />
  </div>
</template>

<script>
import CategoryForm from "../components/CategoryForm.vue";
import CategoryTable from "../components/CategoryTable.vue";
import moment from "moment";
export default {
  components: { CategoryForm, CategoryTable },
  data() {
    return {
      dialog: false,
      categories: [],
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
      Meteor.call("category.remove", id, (err, result) => {
        if (result) {
          this.getData();
        }
      });
    },
    handleEdit(doc) {
      this.dialog = true;
      this.updateDoc = Object.assign({}, doc);
      this.updateDoc.date = moment(doc.date).format("YYYY-MM-DD");
    },
    getData() {
      Meteor.call("category.find", (err, result) => {
        if (result) {
          this.categories = result;
        }
      });
    },
  },
};
</script>

<style>
</style>