<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input type="text" class="form-control" placeholder="Find Entries" >
    </div>

    <div class="entry-scrollarea">
      <JournalEntry
        v-for="entry in 30"
        :key="entry"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'EntryList',
  components: {
    JournalEntry: defineAsyncComponent(() => import('./JournalEntry.vue'))
  }
}
</script>

<style lang="scss" scoped>
.entry-list-container {
  border-right: 1px solid #2c3e50;
  height: calc(100vh - 56px);
}

.entry-scrollarea {
  height: calc(100vh - 110px);
  overflow: scroll;
}
</style>