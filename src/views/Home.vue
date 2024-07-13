<template>
  <DataTable
    v-if="!loading"
    :columns="columns"
    :data="users"
    :actions="actions"
  >
    <template #header>
      <h1 class="text-2xl font-bold pb-4">Liste des utilisateurs</h1>
    </template>
  </DataTable>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import { useUsers } from '../composables/useUsers';
import DataTable from '../components/DataTable.vue';

export default defineComponent({
  name: 'Home',
  components: {
    DataTable
  },
  setup() {
    const { users, fetchUsers, cancelRequest, state } = useUsers();

    const error = computed(() => state.error);
    const loading = computed(() => state.loading);

    const formatAddress = (address: any) => {
      return `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`;
    };

    const formatCompany = (company: any) => {
      return `${company.name} - ${company.catchPhrase} (${company.bs})`;
    };

    return { users, loading, error, fetchUsers, formatAddress, formatCompany, cancelRequest };
  },

  mounted() {
    this.fetchUsers();
  },

  data() {
    const columns = {
      id: {
        label: 'ID',
      },
      name: {
        label: 'Nom',
      },
      username: {
        label: 'Nom d\'utilisateur',
      },
      email: {
        label: 'Email',
      },
      phone: {
        label: 'Phone',
      },
      website: {
        label: 'Site web',
      },
      address: {
        label: 'Adresse',
        format: this.formatAddress,
      },
      company: {
        label: 'Entreprise',
        format: this.formatCompany,
      },
    };

    const actions = [
      {
        label: 'Posts',
        method: (item: any) => {
          this.$router.push({ name: 'user-posts', params: { userId: item.id } });
        },
      },
      {
        label: 'Albums',
        method: (item: any) => {
          this.$router.push({ name: 'user-albums', params: { userId: item.id } });
        },
      },
    ];

    return {
      columns,
      actions,
    };
  }
});
</script>
