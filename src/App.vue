<template>
  <v-app>
    <Navigation class="px-4" title="JSON Placeholder" :items="items" />
    <v-main>
      <v-progress-linear v-if="loading" indeterminate :height="12" color="blue-grey-lighten-3"></v-progress-linear>
      <v-container fluid>
        <v-alert
            v-if="errorText"
            class="mb-4"
            border="top"
            type="warning"
            variant="outlined"
            prominent
        >
          {{ errorText }}
        </v-alert>
        <v-btn v-if="loading" @click="cancelRequest" color="orange" class="mb-4">Annuler la requếte</v-btn>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import Navigation from "./components/Navigation.vue";
import {useRequestStatus} from "./composables/useRequestStatus.ts";

export default defineComponent({
  name: 'App',
  components: {Navigation},
  data() {
    return {
      items: [
        { label: 'Home', path: '/'},
        { label: 'Posts', path: '/posts' },
        { label: 'Albums', path: '/albums' },
      ],
    };
  },
  setup() {
    const { state, cancelRequest } = useRequestStatus();

    const loading = computed(() => state.loading);
    const error = computed(() => state.error);

    const errorText = computed(() => {
      if (error.value && error.value.name === 'AbortError') {
        return 'La requête a été annulée';
      }

      return error.value?.message || null;
    });

    return {
      loading,
      errorText,
      cancelRequest,
    };
  },
});
</script>