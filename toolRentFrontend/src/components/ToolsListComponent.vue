<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { returnTool, rentTool } from '@/services/toolsService'

const tools = ref<Tool[]>()
const toast = useToast()

const props = defineProps({
  tools: {
    type: Array as () => Tool[],
    required: true,
  },
})

const emit = defineEmits(['update:tools'])

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
      return 'warn'
    case 'delayed':
      return 'danger'
    default:
      return 'success'
  }
}

const seeDetailTool = (data: Tool) => {
  toast.add({
    severity: 'info',
    summary: 'Tool details',
    detail: `Name: ${data.name}, Description: ${data.description}`,
    life: 3000,
  })
}

const selectRentTool = async (data: Tool) => {
  if (await rentTool(data.id)) {
    toast.add({
      severity: 'info',
      summary: 'Tool rented',
      detail: `You have successfully rented the tool: ${data.name}`,
      life: 3000,
    })
    emit('update:tools')
  }
}

const selectReturnTool = async (data: Tool) => {
  if (await returnTool(data.id)) {
    toast.add({
      severity: 'info',
      summary: 'Tool returned',
      detail: `You have successfully returned the tool: ${data.name}`,
      life: 3000,
    })
    emit('update:tools')
  }
}
</script>

<template>
  <div class="body">
    <Toast />
    <DataTable class="tools-table" :value="props.tools" sortField="category.name" :sortOrder="-1">
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
      <Column class="w-24 !text-end">
        <template #body="{ data }">
          <Button icon="pi pi-search" @click="seeDetailTool(data)" severity="secondary"></Button>
          <Button
            v-show="data.status === 'available'"
            icon="pi pi-sign-out"
            @click="selectRentTool(data)"
            severity="secondary"
          ></Button>
          <Button
            v-show="data.status === 'rented'"
            icon="pi pi-sign-in"
            @click="selectReturnTool(data)"
            severity="secondary"
          ></Button> </template
      ></Column>
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
