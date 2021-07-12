<template>
  <div>
    <form-search-by-date @searchByDate="handleSubmit" />
  </div>
</template>

<script>
import FormSearchByDate from "../components/FormSearchByDate.vue";
export default {
  components: { FormSearchByDate },
  methods: {
    handleSubmit(val) {
      console.log("doc: ", val);
    },
  },
};
</script>

<style>
</style>