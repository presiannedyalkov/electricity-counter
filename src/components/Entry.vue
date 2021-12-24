<template>
  <div v-if="currentEntry" class="edit-form">
    <h4>Entry</h4>
    <form>
      <div class="form-group">
        <label for="counter">Counter</label>
        <input
          type="text"
          class="form-control"
          id="counter"
          v-model="currentEntry.counter"
        />
      </div>

      <div class="form-group">
        <label for="date">Date</label>
        <input
          type="text"
          class="form-control"
          id="date"
          v-model="currentEntry.date"
        />
      </div>

      <div class="form-group">
        <label for="reporter">Reporter</label>
        <input
          type="text"
          class="form-control"
          id="reporter"
          v-model="currentEntry.reporter"
        />
      </div>
    </form>

    <button class="badge badge-danger mr-2" @click="deleteEntry">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateEntry">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on an Entry...</p>
  </div>
</template>

<script>
import EntriesDataService from "../services/EntriesDataService";

export default {
  name: "entry",
  props: ["entry"],
  data() {
    return {
      currentEntry: null,
      message: "",
    };
  },
  watch: {
    entry: function(entry) {
      this.currentEntry = { ...entry };
      this.message = "";
    },
  },
  methods: {
    updateEntry() {
      const data = {
        counter: this.currentEntry.counter,
        date: this.currentEntry.date,
        reporter: this.currentEntry.reporter,
      };

      EntriesDataService.update(this.currentEntry.id, data)
        .then(() => {
          this.message = "The entry was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteEntry() {
      EntriesDataService.delete(this.currentEntry.id)
        .then(() => {
          this.$emit("refreshList");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.currentEntry = { ...this.entry }
  },
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>