<template>
  <v-app-bar v-bind="$attrs" :elevation="2" color="deep-purple-lighten-2">
    <v-app-bar-title class="font-extrabold">{{ title }}</v-app-bar-title>
    <v-spacer></v-spacer>
    <div class="flex gap-4">
      <router-link v-for="item in items" :to="item.path">{{ item.label }}</router-link>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from "./DataTable.vue";

interface Item {
  label: string;
  path: string;
}

export default defineComponent({
  name: 'Navigation',
  components: {DataTable},
  props : {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array as PropType<Item[]>,
      required: true,
    },
  },
});
</script>