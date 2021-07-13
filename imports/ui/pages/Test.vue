<template>
  <div>
    <h1>Test</h1>
    <q-btn label="Inser Customer" @click="handleInsert" />
  </div>
</template>

<script>
export default {
  methods: {
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
  },
};
</script>

<style>
</style>