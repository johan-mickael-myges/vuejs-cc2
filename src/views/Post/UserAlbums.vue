<template>
  <AlbumsList v-if="!loading && albums.length > 0" :albums="albums" title="Album" />
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import { useRoute } from 'vue-router';
import {useAlbums} from "../../composables/useAlbums.ts";
import AlbumsList from "../../components/AlbumsList.vue";

export default defineComponent({
  name: 'UserAlbums',
  components: {
    AlbumsList,
  },
  setup() {
    const route = useRoute();
    const userId = parseInt(route.params.userId as string);
    const { albums, state, fetchAlbums } = useAlbums(userId);
    const loading = computed(() => state.loading);

    return { userId, albums, loading, fetchAlbums };
  },

  mounted() {
      this.fetchAlbums();
  },
});
</script>