<template>
  <DataTable v-bind="$attrs" :data="posts" :columns="columns" :actions="actions">
    <template #header v-if="title">
      <h1 class="text-2xl font-bold pb-4">{{ title }}</h1>
    </template>
  </DataTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from "./DataTable.vue";

export default defineComponent({
  name: 'PostsList',
  components: {DataTable},
  props : {
    posts: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
  },
  data() {
    const columns = {
      id: {
        label: 'ID',
      },
      title: {
        label: 'Titre',
      },
      body: {
        label: 'Contenu',
      },
    };

    const actions = [
      {
        label: 'Détails',
        method: (post: any) => {
          this.$router.push({ name: 'post-show', params: { id: post.id } });
        },
      },
    ];

    return { columns, actions };
  },
});
</script>