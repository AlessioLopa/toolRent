<script setup lang="ts">
import { getCategories } from '@/services/categoriesService'
import { onMounted, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'

const tools = ref<Tool[]>()
const categories = ref<Category[]>()

const props = defineProps({
  tools: {
    type: Array as () => Tool[],
    required: true,
  },
})

interface Tool {
  id: number
  name: string
  description: string
  status: string
  categoryId: number
  dueDate: string
}

const getSeverityStatus = (status: string) => {
  switch (status) {
    case 'available':
      return 'success'
    case 'rented':
      return 'warning'
    default:
      return 'success'
  }
}
</script>

<template>
  <div class="body">
    <DataTable class="tools-table" :value="props.tools">
      <Column field="name" header="Name"></Column>
      <Column field="description" header="Description"></Column>
      <Column header="Status">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.status"
            :severity="getSeverityStatus(slotProps.data.status)"
          />
        </template>
      </Column>
      <Column field="category.name" header="Category"></Column>
      <Column field="dueDate" header="Date de retour"></Column>
    </DataTable>
  </div>
</template>

<style scoped>
.body {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
  min-height: 100vh;
  box-sizing: border-box;
}

.tools-table {
  width: 100%;
}
</style>
