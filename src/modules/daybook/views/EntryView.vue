<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{month}}</span>
        <span class="mx-1 fs-3">{{day}}</span>
        <span class="mx-2 fs-34 fw-light">{{yearDay}}</span>
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
      <textarea placeholder="What happened today?" v-model="entry.text"></textarea>
    </div>
    
    <img
      src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3870&q=80"
      alt="guy programming"
      class="img-thumbnail"
    >
  </template>

  <Fab
    icon="fa-save"
    @onClick="saveEntry"
  />

</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import getDates from '../helpers/dates';

export default {
  components: {
    Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
  },
  data() {
    return {
      entry: null
    }
  },
  props: {
    //this id prop comes from the router
    id: {
      type: String,
      required: true
    }
  },
  created() {
    this.loadEntry();
  },
  computed: {
    ...mapGetters({
      getEntryById: 'journal/getEntryById'
    }),
    day() {
      const { day } = getDates(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDates(this.entry.date);
      return month;
    },
    yearDay() {
      const { yearDay } = getDates(this.entry.date);
      return yearDay;
    }
  },
  methods: {
    ...mapActions({
      updateEntry: 'journal/updateEntry'
    }),
    loadEntry() {
      let entry;

      if (this.id === 'new') {
        entry = {
          text: '',
          date: new Date().getTime()
        }
      } else {
        entry = this.getEntryById(this.id);
  
        if (!entry) return this.$router.push({ name: 'no-entry'});
      }

      this.entry = entry;
    },
    async saveEntry() {
      if (this.entry.id) {
        await this.updateEntry(this.entry);
      } else {
        console.log('POST')
      }
    }
  },
  watch: {
    id() {
      //load an entry by id if the id changes dynamically
      this.loadEntry();
    }
  },
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