<template>
  <div>
    <h1>Test</h1>
    <q-btn label="Inser Customer" @click="handleInsert" />
    <q-btn label="Find Customer" @click="handleFind" />
    <q-btn label="Update Customer" @click="handleUpdate" />
    <ul>
      <li v-for="(customer, index) in customers" :key="index">
        {{ customer._id }} | {{ customer.name }} | {{ customer.age }}
        <q-btn
          icon="delete"
          dense
          color="red"
          @click="handleDelete(customer._id)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customers: [],
    };
  },
  methods: {
    handleUpdate() {
      let doc = {
        _id: "ec5oZmxNg3LrfN8kG",
        name: "Jing Jing",
        age: 18,
      };
      Meteor.call("customer.update", doc, (err, result) => {
        if (result) {
          this.handleFind();
        }
      });
    },
    handleInsert() {
      let doc = {
        name: "Biona",
        age: 20,
      };
      Meteor.call("customer.insert", doc, (err, result) => {
        if (result) {
          console.log("result:", result);
        } else {
          console.log("err", err);
        }
      });
    },
    handleFind() {
      Meteor.call("customer.find", (err, result) => {
        if (result) {
          console.log("result:", result);
          this.customers = result;
        } else {
          console.log("err", err);
        }
      });
    },
    handleDelete(id) {
      Meteor.call("customer.remove", id, (err, result) => {
        if (result) {
          this.handleFind();
        }
      });
    },
  },
};
</script>

<style>
</style>