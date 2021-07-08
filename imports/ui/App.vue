<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="drawer = !drawer" />

        <q-toolbar-title> Master IT Shop </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above bordered content-class="bg-grey-3">
      <q-scroll-area class="fit">
        <q-list>
          <q-item clickable v-ripple to="/" exact>
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>
            <q-item-section> Home </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/user">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section> User </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/customer">
            <q-item-section avatar>
              <q-icon name="group" />
            </q-item-section>
            <q-item-section> Customer </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/category">
            <q-item-section avatar>
              <q-icon name="backup_table" />
            </q-item-section>
            <q-item-section> Category </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/item">
            <q-item-section avatar>
              <q-icon name="dns" />
            </q-item-section>
            <q-item-section> Item </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/supplier">
            <q-item-section avatar>
              <q-icon name="maps_home_work" />
            </q-item-section>
            <q-item-section> Supplier </q-item-section>
          </q-item>
          <q-item clickable v-ripple to="/purchase">
            <q-item-section avatar>
              <q-icon name="inventory" />
            </q-item-section>
            <q-item-section> Purchase </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <div class="text-center text-h5">{{ $route.name }}</div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
};
</script>