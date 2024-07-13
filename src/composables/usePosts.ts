import { ref } from 'vue';
import { z } from 'zod';
import {useRequestStatus} from "./useRequestStatus.ts";

const postSchema = z.object({
    id: z.number(),
    title: z.string(),
    body: z.string(),
    userId: z.number(),
});

const postsSchema = z.array(postSchema);

export function usePosts(userId: number | null = null) {
    const post = ref(null);
    const posts = ref([]);
    const { state, cancelRequest } = useRequestStatus();

    const fetchPosts = async () => {
        state.loading = true;
        state.error = null;
        try {
            const url = userId
                ? `https://jsonplaceholder.typicode.com/users/${userId}/posts`
                : 'https://jsonplaceholder.typicode.com/posts';
            const response = await fetch(url, {
                signal: state.controller.signal,
            });
            const data = await response.json();
            postsSchema.parse(data);
            posts.value = data;
        } catch (err) {
            state.error = err;
        } finally {
            state.loading = false;
        }
    };

    const fetchPost = async (id: number) => {
        state.loading = true;
        state.error = null;
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                signal: state.controller.signal,
            });
            const data = await response.json();
            postSchema.parse(data);
            post.value = data;
        } catch (err) {
            state.error = err;
        } finally {
            state.loading = false;
        }
    };

    return {
        post,
        posts,
        state,
        fetchPosts,
        fetchPost,
        cancelRequest,
    };
}
