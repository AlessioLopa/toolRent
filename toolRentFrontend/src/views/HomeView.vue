<script setup lang="ts">
import ToolsListComponent from '@/components/ToolsListComponent.vue'
import { getTools, getToolsOverdue, getToolsOverdueSimulate } from '@/services/toolsService'
import { onMounted, ref } from 'vue'
import Button from 'primevue/button'

const VITE_ENV = import.meta.env.VITE_ENV
const tools = ref()
const delayed = ref(false)

onMounted(async () => {
  await getAllTools()
})

const getAllTools = async () => {
  try {
    tools.value = setToolsStatusIfDelayed(setToolsDueDateIfNull(await getTools()))
  } catch (error: any) {
    alert('Failed to fetch tools: ' + error.message)
  }
}

const toolsOverdue = async () => {
  try {
    tools.value = setToolsStatusDelayed(setToolsDueDateIfNull(await getToolsOverdue()))
    delayed.value = true
  } catch (error: any) {
    alert('Failed to fetch overdue tools: ' + error.message)
  }
}
const timeSimulation = async () => {
  try {
    tools.value = setToolsStatusDelayed(setToolsDueDateIfNull(await getToolsOverdueSimulate()))
    delayed.value = true
  } catch (error: any) {
    alert('Failed to simulate time: ' + error.message)
  }
}

// Set due date to '-' if tool is available, to avoid blank value in the table
const setToolsDueDateIfNull = (tools: any[]) => {
  for (const tool of tools) {
    if (tool.dueDate === null) {
      tool.dueDate = '-'
    }
  }

  return tools
}

// Set status to 'delayed' for all tools, used for the overdue tools list
const setToolsStatusDelayed = (tools: any[]) => {
  for (const tool of tools) {
    tool.status = 'delayed'
  }

  return tools
}

// Set status to 'delayed' for tools that are overdue, used with the current date
const setToolsStatusIfDelayed = (tools: any[]) => {
  const currentDate = new Date()

  for (const tool of tools) {
    if (tool.dueDate !== '-' && tool.status === 'rented' && new Date(tool.dueDate) < currentDate) {
      tool.status = 'delayed'
    }
  }

  return tools
}
</script>

<template>
  <div class="page">
    <div class="list-options">
      <Button @click="getAllTools()">See all tools</Button>
      <Button @click="toolsOverdue()">See tools overdue</Button>
      <Button v-if="VITE_ENV === 'development'" @click="timeSimulation()"
        >Simulate time (+48h)</Button
      >
    </div>
    <div class="data-table">
      <ToolsListComponent :tools="tools" @update:tools="getAllTools" />
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
}

.list-options {
  display: flex;
  gap: 1rem;
  margin-right: 2rem;
}
</style>
