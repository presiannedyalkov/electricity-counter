<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="counter">Counter</label>
        <input
          type="text"
          class="form-control"
          id="counter"
          required
          v-model="entry.counter"
          name="counter"
        />
      </div>

      <button @click="saveEntry" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newEntry">Add</button>
    </div>
  </div>
</template>

<script>
import EntriesDataService from "../services/EntriesDataService";

export default {
  name: "add-entry",
  data() {
    return {
      entry: {
        counter: 0,
        date: null,
        reporter: null
      },
      submitted: false
    };
  },
  methods: {
    saveEntry() {
      var data = {
        counter: this.entry.counter,
        date: new Date(),
        reporter: null
      };

      EntriesDataService.create(data)
        .then(() => {
          console.log("Created new item successfully!");
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newEntry() {
      this.submitted = false;
      this.entry = {
        counter: 0,
        date: "",
        reporter: ""
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
