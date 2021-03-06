<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{month}}</span>
        <span class="mx-1 fs-3">{{day}}</span>
        <span class="mx-2 fs-34 fw-light">{{yearDay}}</span>
      </div>
  
      <div>
        <input
          v-show="false"
          type="file"
          @change="onSelectedImage"
          ref="imageSelector"
          accept="image/png, image/jpeg"
        >

        <button v-if="entry.id" class="btn btn-danger mx-2" @click="onDeleteEntry">
          Remove
          <i class="fa fa-trash-alt"></i>
        </button>

        <button class="btn btn-primary" @click="onSelectImage">
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
      v-if="entry.picture && !localImage"
      :src="entry.picture"
      alt="guy programming"
      class="img-thumbnail"
    >
    <img
      v-if="localImage"
      :src="localImage"
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
import Swal from 'sweetalert2';
import { defineAsyncComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';
import getDates from '../helpers/dates';
import uploadImage from '../helpers/uploadImage';

export default {
  name: 'EntryView',
  components: {
    Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
  },
  data() {
    return {
      entry: null,
      localImage: null, //processed image file for local upload
      file: null //actual image file for db saving
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
      updateEntry: 'journal/updateEntry',
      createEntry: 'journal/createEntry',
      deleteEntry: 'journal/deleteEntry'
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

      new Swal({
        title: 'Please Wait',
        allowOutsideClick: false
      });

      Swal.showLoading();
      const picture = await uploadImage(this.file); //returns secure_url for cloudinary image

      this.entry.picture = picture;

      if (this.entry.id) {
        await this.updateEntry(this.entry);
      } else {
        const id = await this.createEntry(this.entry);
        
        this.$router.push({ name: 'entry', params: { id }});
      }

      this.file = null;
      Swal.fire('Saved', 'Entry Saved!', 'success');
    },
    async onDeleteEntry () {
      const result = await Swal.fire({
        title: 'Are you Sure?',
        text: 'You will not be able to recover a deleted Entry',
        showDenyButton: true,
        confirmButtonText: 'Yes, Delete'
      })

      if(result.isConfirmed) {
        new Swal({
          title: 'Please wait...',
          allowOutsideClick: false
        });

        Swal.showLoading();
        await this.deleteEntry(this.entry.id); 
        this.$router.push({ name: 'no-entry'});
      }

      Swal.fire('Entry Deleted', '', 'success');
    },
    onSelectedImage(event) {
      const file = event.target.files[0];

      if (!file) {
        this.localImage = null;
        this.file = null;
        return;
      }

      this.file = file;

      const fr = new FileReader();
      fr.onload = () => this.localImage = fr.result;
      fr.readAsDataURL(file);
    },
    onSelectImage() {
      this.$refs.imageSelector.click();
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