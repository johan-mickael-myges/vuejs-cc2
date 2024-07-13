<template>
  <PostsList v-if="!loading" :posts="posts" :title="title" />
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import { useRoute } from 'vue-router';
import { usePosts } from '../../composables/usePosts';
import PostsList from '../../components/PostsList.vue';
import {useUsers} from "../../composables/useUsers.ts";

export default defineComponent({
  name: 'UserPosts',
  components: {
    PostsList,
  },
  setup() {
    const { fetchUsers, users } = useUsers();
    const route = useRoute();
    const userId = parseInt(route.params.userId as string);
    const { posts, state, fetchPosts } = usePosts(userId);
    const loading = computed(() => state.loading);

    return { userId, posts, loading, fetchPosts, fetchUser: fetchUsers, user: users };
  },

  async mounted() {
    await this.fetchUser(this.userId);
    await this.fetchPosts();
  },

  computed: {
    title () {
      console.log(this.user);
      return `Posts de: ${this.user.username}`;
    }
  }
});
</script>