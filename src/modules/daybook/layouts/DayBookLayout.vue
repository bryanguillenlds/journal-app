<template>
  <Navbar />

  <div class="d-flex">
    <div class="col-4">
      <EntryList />
    </div>
    <div class="col">
      <router-view />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'DayBookLayout',
  // This achieves lazy loading of a component so that it doesn't get loaded unless necessary
  components: {
    Navbar: defineAsyncComponent(() => import('../components/NavBar.vue')),
    EntryList: defineAsyncComponent(() => import('../components/EntryList.vue'))
  }
}
</script>