<template>
  <v-card
      v-if="post"
      class="mb-4"
      elevation="4"
  >
    <v-card-item>
      <v-card-title>
        {{ post.title }}
      </v-card-title>
    </v-card-item>

    <v-card-text>
      {{ post.body }}
    </v-card-text>

    <v-card-actions>
      <v-btn
          color="primary"
          @click="fetchComments"
      >
        Charger les commentaires
      </v-btn>
    </v-card-actions>
  </v-card>
  <CommentsList v-if="comments.length > 0" :comments="comments" title="Commentaires" />
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {usePosts} from '../../composables/usePosts';
import {useComments} from "../../composables/useComments.ts";
import DataTable from '../../components/DataTable.vue';
import CommentsList from "../../components/CommentsList.vue";
import {useRoute} from "vue-router";

export default defineComponent({
  name: 'PostDetail',
  components: {
    CommentsList,
    DataTable
  },
  setup() {
    const route = useRoute();
    const id = route.params.id;

    const {post, state, fetchPost} = usePosts();
    const loading = computed(() => state.loading);

    const {comments, fetchComments, state: commentState} = useComments(Number(id));
    const commentsLoading = computed(() => commentState.loading);

    return {post, loading, fetchPost, id, comments, commentsLoading, fetchComments};
  },

  mounted() {
    this.fetchPost(Number(this.id));
  },
});
</script>