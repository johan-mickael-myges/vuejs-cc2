import {ref} from 'vue';
import {z} from 'zod';
import {useRequestStatus} from "./useRequestStatus.ts";

const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    username: z.string(),
    email: z.string(),
    address: z.object({
        street: z.string(),
        suite: z.string(),
        city: z.string(),
        zipcode: z.string(),
        geo: z.object({
            lat: z.string(),
            lng: z.string(),
        }),
    }),
    phone: z.string(),
    website: z.string(),
    company: z.object({
        name: z.string(),
        catchPhrase: z.string(),
        bs: z.string(),
    }),
});

const usersSchema = z.array(userSchema);

export function useUsers() {
    const users = ref([]);
    const { state, cancelRequest } = useRequestStatus();

    const fetchUsers = async (id: number | null) => {
        state.loading = true;
        state.error = null;
        try {
            const URL = id
                ? `https://jsonplaceholder.typicode.com/users/${id}`
                : 'https://jsonplaceholder.typicode.com/users';
            const response = await fetch(URL, {
                signal: state.controller.signal,
            });
            const data = await response.json();
            if (id) {
                userSchema.parse(data);
                users.value = data;
                return;
            }
            usersSchema.parse(data);
            users.value = data;
        } catch (err) {
            state.error = err;
        } finally {
            state.loading = false;
        }
    };

    return {
        users,
        state,
        fetchUsers,
        cancelRequest,
    };
}
