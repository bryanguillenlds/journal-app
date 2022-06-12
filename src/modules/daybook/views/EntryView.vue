<template>
  <div class="entry-title d-flex justify-content-between p-2">
    <div>
      <span class="text-success fs-3 fw-bold">July</span>
      <span class="mx-1 fs-3">15</span>
      <span class="mx-2 fs-34 fw-light">2022, Friday</span>
    </div>

    <div>
      <button class="btn btn-danger mx-2">
        Remove
        <i class="fa fa-trash-alt"></i>
      </button>
      <button class="btn btn-primary">
        Upload Picture
        <i class="fa fa-upload"></i>
      </button>
    </div>
  </div>

  <hr>
  <div class="d-flex flex-column px-3 h-75">
    <textarea placeholder="What happened today?"></textarea>
  </div>

  <Fab
    icon="fa-save"
  />

  <img
    src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80"
    alt="guy programming"
    class="img-thumbnail"
  >
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
  }
}
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #0000, $alpha: 0.2);
}
</style>