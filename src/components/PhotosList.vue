<template>
  <DataTable v-bind="$attrs" :data="photos" :columns="columns">
    <template #header v-if="title">
      <h1 class="text-2xl font-bold pb-4">{{ title }}</h1>
    </template>
  </DataTable>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DataTable from "./DataTable.vue";

export default defineComponent({
  name: 'PhotosList',
  components: {DataTable},
  props : {
    title: {
      type: String,
      required: false,
    },
    photos: {
      type: Array,
      required: true,
    },
  },
  setup() {
      const formatURL = (url: string) => `<a href="${url}" target="_blank">${url}</a>`;
      const formatThumbnail = (url: string) => `<img src="${url}" alt="Miniature" loading="eager" />`;
      return {
        formatURL,
        formatThumbnail,
      }
  },
  data() {
    const columns = {
      id: {
        label: 'ID',
      },
      title: {
        label: 'Titre',
      },
      url: {
        label: 'URL',
        allowHTML: true,
        format: this.formatURL,
      },
      thumbnailUrl: {
        label: 'Miniature',
        allowHTML: true,
        format: this.formatThumbnail,
      },
    };

    const actions = [
      {
        label: 'Photos',
        method: (post: any) => {
          this.$router.push({ name: 'post-show', params: { id: post.id } });
        },
      },
    ];

    return { columns, actions };
  },
});
</script>