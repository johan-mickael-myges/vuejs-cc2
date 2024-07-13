<template>
    <AlbumsList v-if="!loading" :albums="albums" title="Tous les albums" />
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import DataTable from '../../components/DataTable.vue';
import PostsList from "../../components/PostsList.vue";
import AlbumsList from "../../components/AlbumsList.vue";
import {useAlbums} from "../../composables/useAlbums.ts";

export default defineComponent({
  name: 'PostList',
  components: {
    AlbumsList,
    PostsList,
    DataTable
  },
  setup() {
    const { albums, state, fetchAlbums } = useAlbums();
    const loading = computed(() => state.loading);

    return { albums, loading, fetchAlbums };
  },

  mounted() {
    this.fetchAlbums();
  },
});
</script>