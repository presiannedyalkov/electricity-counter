<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Electricity Counter</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(entry, index) in entries"
          :key="index"
          @click="setActiveEntry(entry, index)"
        >
          The counter was {{ entry.counter }} on {{ entry.date }}. 
          <br>
          Added by {{ entry.reporter }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentEntry">
        <entry-details
          :entry="currentEntry"
          @refreshList="refreshList"
        />
      </div>
      <div v-else>
        <br />
        <p>Please click on an Entry...</p>
      </div>
    </div>
  </div>
</template>

<script>
import EntriesDataService from "../services/EntriesDataService";
import EntryDetails from "./Entry";


export default {
  name: 'entries-list',
  components: { EntryDetails },
  data() {
    return {
      entries: [],
      currentEntry: null,
      currentIndex: -1,
      unsubscribe: null
    };
  },
  methods: {
    onDataChange(items) {
      let _entries = [];

      items.forEach((item) => {
        let id = item.id;
        let data = item.data();
        _entries.push({
          id: id,
          counter: data.counter,
          date: data.date.toDate(),
          reporter: data.reporter,
        });
      });

      this.entries = _entries;
    },

    refreshList() {
      this.currentEntry = null;
      this.currentIndex = -1;
    },

    setActiveEntry(entry, index) {
      this.currentEntry = entry;
      this.currentIndex = index;
    },


  },
  mounted() {
    this.unsubscribe = EntriesDataService.getAll().orderBy("counter", "asc").onSnapshot(this.onDataChange);
  },
  beforeUnmount() {
    this.unsubscribe();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
