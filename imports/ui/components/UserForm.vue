<template>
  <div>
    <div class="row justify-around q-ma-sm">
      <div class="col-md-5 col-sm-12 q-ma-md">
        <q-input outlined v-model="form.username" label="Username" />
      </div>
      <div class="col-md-5 col-sm-12 q-ma-md">
        <q-input outlined v-model="form.email" label="Email" />
      </div>
      <div class="col-md-5 col-sm-12 q-ma-md">
        <q-input outlined v-model="form.phone" label="Phone" />
      </div>
      <div class="col-md-5 col-sm-12 q-ma-md">
        <q-select
          outlined
          v-model="form.role"
          label="Role"
          :options="roles"
          emit-value
          map-options
          option-label="label"
        />
      </div>
      <div class="col-md-5 col-sm-12 q-ma-md">
        <q-input
          outlined
          v-model="form.password"
          label="Password"
          type="password"
        />
      </div>
      <div class="col-md-5 col-sm-12 q-ma-md">
        <q-input
          outlined
          v-model="confirmPassword"
          label="Confirm"
          type="password"
        />
      </div>
    </div>
    <div class="text-center">
      <q-btn
        :label="updateDoc ? `Update` : `Submit`"
        color="primary"
        @click="handleSubmit"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    updateDoc: {
      default: null,
      type: Object,
    },
  },
  mounted() {
    if (this.updateDoc) {
      this.form = this.updateDoc;
    }
  },
  data() {
    return {
      form: {
        username: null,
        email: null,
        phone: null,
        role: null,
        password: null,
      },
      confirmPassword: null,
      roles: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Sale",
          value: "sale",
        },
      ],
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("close", this.form);
    },
  },
};
</script>

<style>
</style>