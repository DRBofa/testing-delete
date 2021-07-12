<template>
  <div class="q-ma-md">
    <form-search-by-date @searchByDate="searchByDate" />
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">No</th>
          <th class="text-left">Date</th>
          <th class="text-left">Customer</th>
          <th class="text-left">Item</th>
          <th class="text-left">Price</th>
          <th class="text-left">Quanity</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in items">
          <tr :key="index">
            <td class="text-left">{{ index + 1 }}</td>
            <td class="text-left">{{ item.date | toDate }}</td>
            <td class="text-left">{{ item.customerName }}</td>
            <td class="text-left">{{ item.items[0].name }}</td>
            <td class="text-left">{{ item.items[0].price }}</td>
            <td class="text-left">{{ item.items[0].qty }}</td>
          </tr>
          <template v-for="(it, idx) in item.items">
            <tr :key="idx + `it` + index" v-if="idx != 0">
              <td colspan="3"></td>
              <td class="text-left">{{ it.name }}</td>
              <td class="text-left">{{ it.price }}</td>
              <td class="text-left">{{ it.qty }}</td>
            </tr>
          </template>
        </template>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import moment from "moment";
import FormSearchByDate from "../components/FormSearchByDate.vue";
export default {
  components: { FormSearchByDate },
  data() {
    return {
      items: [],
    };
  },
  filters: {
    toDate(date) {
      return moment(date).format("DD-MM-YYYY");
    },
  },
  methods: {
    searchByDate(date) {
      console.log("Date:", date);
      this.items = [
        {
          _id: "01",
          date: new Date(),
          customerName: "Biona",
          items: [
            {
              _id: "01",
              name: "Coca",
              price: 6000,
              qty: 2,
            },
            {
              _id: "02",
              name: "Spy",
              price: 6000,
              qty: 4,
            },
          ],
        },
      ];
    },
  },
};
</script>

<style>
</style>