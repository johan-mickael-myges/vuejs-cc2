import { ref } from 'vue';
import { z } from 'zod';
import { useRequestStatus } from './useRequestStatus';

const commentSchema = z.object({
    postId: z.number(),
    id: z.number(),
    name: z.string(),
    email: z.string(),
    body: z.string(),
});

const commentsSchema = z.array(commentSchema);

export function useComments(postId: number | null = null) {
    const comments = ref([]);
    const { state, cancelRequest } = useRequestStatus();

    const fetchComments = async () => {
        state.loading = true;
        state.error = null;
        try {
            const url = postId
                ? `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
                : 'https://jsonplaceholder.typicode.com/comments';
            const response = await fetch(url, {
                signal: state.controller.signal,
            });
            const data = await response.json();
            commentsSchema.parse(data);
            comments.value = data;
        } catch (err) {
            state.error = err;
        } finally {
            state.loading = false;
        }
    };

    return {
        comments,
        state,
        fetchComments,
        cancelRequest,
    };
}
