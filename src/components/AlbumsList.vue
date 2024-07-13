<template>
  <DataTable v-bind="$attrs" :data="albums" :columns="columns" :actions="actions">
    <template #header v-if="title">
      <h1 class="text-2xl font-bold pb-4">{{ title }}</h1>
    </template>
  </DataTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from "./DataTable.vue";

export default defineComponent({
  name: 'AlbumsList',
  components: {DataTable},
  props : {
    albums: {
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
    };

    const actions = [
      {
        label: 'Photos',
        method: (post: any) => {
          this.$router.push({ name: 'album-photos', params: { id: post.id } });
        },
      },
    ];

    return { columns, actions };
  },
});
</script>