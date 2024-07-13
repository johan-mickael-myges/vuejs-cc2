import { ref } from 'vue';
import { z } from 'zod';
import { useRequestStatus } from './useRequestStatus';

const photoSchema = z.object({
    id: z.number(),
    title: z.string(),
    url: z.string(),
    thumbnailUrl: z.string(),
});

const photosSchema = z.array(photoSchema);

export function usePhotos(albumId: number | null = null) {
    const photo = ref(null);
    const photos = ref([]);
    const { state, cancelRequest } = useRequestStatus();

    const fetchPhotos = async () => {
        state.loading = true;
        state.error = null;
        try {
            const url = albumId
                ? `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
                : 'https://jsonplaceholder.typicode.com/photos';
            const response = await fetch(url, {
                signal: state.controller.signal,
            });
            const data = await response.json();
            photosSchema.parse(data);
            photos.value = data;
        } catch (err) {
            state.error = err;
        } finally {
            state.loading = false;
        }
    };

    const fetchPhoto = async (id: number) => {
        state.loading = true;
        state.error = null;
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
                signal: state.controller.signal,
            });
            const data = await response.json();
            photoSchema.parse(data);
            photo.value = data;
        } catch (err) {
            state.error = err;
        } finally {
            state.loading = false;
        }
    };

    return {
        photo,
        photos,
        state,
        fetchPhotos,
        fetchPhoto,
        cancelRequest,
    };
}