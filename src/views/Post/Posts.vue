<template>
    <PostsList v-if="!loading" :loading="loading" :posts="posts" title="Tous les posts" />
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import { usePosts } from '../../composables/usePosts';
import DataTable from '../../components/DataTable.vue';
import PostsList from "../../components/PostsList.vue";

export default defineComponent({
  name: 'PostList',
  components: {
    PostsList,
    DataTable
  },
  setup() {
    const { posts, fetchPosts, state } = usePosts();
    const loading = computed(() => state.loading);

    return { posts, loading, fetchPosts };
  },

  mounted() {
    this.fetchPosts();
  },
});
</script>