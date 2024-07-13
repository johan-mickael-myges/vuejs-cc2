import { ref } from 'vue';
import { z } from 'zod';
import { useRequestStatus } from './useRequestStatus';

const albumSchema = z.object({
    id: z.number(),
    title: z.string(),
    userId: z.number(),
});

const albumsSchema = z.array(albumSchema);

export function useAlbums(userId: number | null = null) {
    const album = ref(null);
    const albums = ref([]);
    const { state, cancelRequest } = useRequestStatus();

    const fetchAlbums = async () => {
        state.loading = true;
        state.error = null;
        try {
            const url = userId
                ? `https://jsonplaceholder.typicode.com/users/${userId}/albums`
                : 'https://jsonplaceholder.typicode.com/albums';
            const response = await fetch(url, {
                signal: state.controller.signal,
            });
            const data = await response.json();
            albumsSchema.parse(data);
            albums.value = data;
        } catch (err) {
            state.error = err;
        } finally {
            state.loading = false;
        }
    };

    const fetchAlbum = async (id: number) => {
        state.loading = true;
        state.error = null;
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
                signal: state.controller.signal,
            });
            const data = await response.json();
            albumSchema.parse(data);
            album.value = data;
        } catch (err) {
            state.error = err;
        } finally {
            state.loading = false;
        }
    };

    return {
        album,
        albums,
        state,
        fetchAlbums,
        fetchAlbum,
        cancelRequest,
    };
}
