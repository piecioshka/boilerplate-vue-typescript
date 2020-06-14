<template>
  <div class="app">
    <h1>Boilerplate <strong>Vue.js</strong> & <strong>TypeScript</strong></h1>
    <ul>
      <li v-for="item in items" :key="item.id">
        <Person :person="item"></Person>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Person from "./Person";

interface Item {
  name: string;
  surname: string;
}

interface DataProps {
  items: Item[];
}

export default Vue.extend({
  components: { Person },
  data(): DataProps {
    return {
      items: []
    };
  },
  methods: {
    fetchItems(): Item[] {
      return [
        { name: "Piotr", surname: "Kowalski" },
        { name: "Forrest", surname: "Gump" }
      ];
    }
  },
  mounted() {
    this.items = this.fetchItems();
  }
});
</script>

<style lang="scss" scoped>
.app {
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  background-color: #35495d;
  padding: 10px;
  margin: 10px;
  color: #eee;

  h1 {
    font-weight: 300;
    margin-top: 0;
  }

  ul {
    list-style: square;

    li {
      line-height: 25px;
    }
  }
}
</style>
