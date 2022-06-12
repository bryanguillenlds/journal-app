<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Hello World</h1>
    <button @click="go" class="btn-primary">Primary</button>
    <button class="btn-secondary">Secondary</button>
    <button class="btn-success">Success</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToDayBook() {
      this.$router.push({ name: 'no-entry' })
    }
  }
}
</script>
