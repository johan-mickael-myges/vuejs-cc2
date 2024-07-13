import {computed, reactive} from 'vue';

const state = reactive({
    loading: false,
    error: null,
    controller: new AbortController(),
});

export function useRequestStatus() {
    const cancelRequest = () => {
        state.controller.abort();
        state.controller = new AbortController();
    };

    return {
        state,
        cancelRequest,
    };
}