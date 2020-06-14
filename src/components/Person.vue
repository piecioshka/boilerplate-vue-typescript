<template>
  <div>
    {{ person.name }}
    {{ person.surname }}
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Person",
  props: ["person"]
});
</script>
