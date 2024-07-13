<template>
  <DataTable v-bind="$attrs" :loading="loading" :data="comments" :columns="columns">
    <template #header v-if="title">
      <h6 class="text-lg font-bold pb-2">{{ title }}</h6>
    </template>
  </DataTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from "./DataTable.vue";

export default defineComponent({
  name: 'CommentsList',
  components: {DataTable},
  props : {
    comments: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      columns: {
        id: {
          label: 'ID',
        },
        name: {
          label: 'Nom',
        },
        email: {
          label: 'Email',
        },
        body: {
          label: 'Contenu',
        },
      },
    };
  }
});
</script>