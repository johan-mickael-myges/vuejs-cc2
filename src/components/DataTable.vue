<template>
  <div class="text-gray-600">
    <slot name="header"></slot>
  </div>
  <v-table class="border" hover>
    <thead class="bg-gray-200">
      <tr>
        <th v-for="(column, key) in columns" :key="`${key}-column`">{{ column.label }}</th>
        <th v-if="withActions">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td v-for="(column, key) in columns" :key="`${key}-value`">
          <span v-if="column.allowHTML" v-html="format(column, key, item)"></span>
          <span v-else>{{ format(column, key, item) }}</span>
        </td>
        <td v-if="withActions">
          <ul>
            <li v-for="action in actions" :key="action.label">
              <v-btn width="100" size="x-small" flat color="deep-purple-lighten-2" @click="action.method(item)">
                {{ action.label }}
              </v-btn>
            </li>
          </ul>
        </td>
      </tr>
    </tbody>
  </v-table>
  <slot name="footer"></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Column {
  label: string;
  mapped?: boolean;
  format?: (value: any) => string;
  allowHTML?: boolean;
}

interface Action {
  label: string;
  method: (item: any) => void;
}

export default defineComponent({
  name: 'DataTable',
  props: {
    columns: {
      type: Object as Prototype<Record<string, Column>>,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    formatData: {
      type: Function,
      required: false,
    },
    actions: {
      type: Array as PropType<Action[]>,
      required: false,
      default: () => []
    }
  },
  setup(props) {
    const withActions = props.actions.length > 0;

    const format = (column: string, key: string, item: any) => {
      const formattedData = column.format ? column.format(item[key]) : item[key];
      if (column.allowHTML) {
        return `<span>${formattedData}</span>`;
      }
      return formattedData;
    };

    return { withActions, format };
  }
});
</script>
