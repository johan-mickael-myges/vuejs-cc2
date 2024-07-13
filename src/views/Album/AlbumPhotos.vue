<template>
    <PhotosList v-if="!loading" :photos="photos" title="Photos" />
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {usePhotos} from "../../composables/usePhotos.ts";
import {useRoute} from "vue-router";
import PhotosList from "../../components/PhotosList.vue";

export default defineComponent({
  name: 'AlbumPhotos',
  components: {
    PhotosList,
  },
  setup() {
    const route = useRoute();
    const albumId = parseInt(route.params.id as string);
    const { photos, state, fetchPhotos } = usePhotos(albumId);

    const loading = computed(() => state.loading);
    const error = computed(() => state.error);

    return { photos, loading, error, fetchPhotos };
  },

  mounted() {
    this.fetchPhotos();
  },
});
</script>