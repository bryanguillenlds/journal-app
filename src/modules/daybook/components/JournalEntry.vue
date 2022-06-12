<template>
  <div
    class="entry-container mb-3 pointer p-2"
    @click="$router.push({ name: 'entry', params: { id: 10 }})"
  >
    <div class="entry-title">
      <span class="text-success fs-5 fw-bold">July</span>
      <span class="fx-1 fs-5">15</span>
      <span class="mx-2 fw-light">2022, Friday</span>
    </div>

    <div class="entry-description">
      Duis labore anim commodo id ea commodo. Officia consequat irure nisi occaecat.
      Consequat dolore dolore proident veniam qui excepteur minim reprehenderit ullamco. 
      Irure id officia ea mollit fugiat ut ex.
    </div>
  </div>
</template>

<script>
export default {
  name: 'JournalEntry'
}
</script>

<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #2c3250;
  transition: 0.2s all ease-in;

  &:hover {
    background-color: lighten($color: grey, $amount: 45);
    transition: 0.2s all ease-in;
  }
  .entry-description {
    font-size: 12px;
  }
}

</style>