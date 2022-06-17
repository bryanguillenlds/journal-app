<template>
  <Navbar />

  <div v-if="isLoading" class="row justify-content-md-center">
    <div class="col-3 alert-info text-center mt-5">
      Please Wait...
      <h3 class="mt-2">
        <i class="fa fa-spin fa-sync"></i>
      </h3>
    </div>
  </div>

  <div v-else class="d-flex">
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
import { mapActions, mapState } from 'vuex';

export default {
  name: 'DayBookLayout',
  // This achieves lazy loading of a component so that it doesn't get loaded unless necessary
  components: {
    Navbar: defineAsyncComponent(() => import('../components/NavBar.vue')),
    EntryList: defineAsyncComponent(() => import('../components/EntryList.vue'))
  },
  created() {
    this.loadEntries();
  },
  computed: {
    ...mapState({
      isLoading: 'journal/isLoading'
    })
  },
  methods: {
    ...mapActions({
      loadEntries: 'journal/loadEntries'
    })
  },
}
</script>