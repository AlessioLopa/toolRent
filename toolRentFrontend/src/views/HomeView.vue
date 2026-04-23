<script setup lang="ts">
import ToolsListComponent from '@/components/ToolsListComponent.vue'
import { getTools, getToolsOverdue } from '@/services/toolsService'
import { onMounted, ref } from 'vue'

const tools = ref()

onMounted(async () => {
  await getAllTools()
})

const getAllTools = async () => {
  try {
    tools.value = await getTools()
  } catch (error: any) {
    alert('Failed to fetch tools: ' + error.message)
  }
}

const toolsOverdue = async () => {
  try {
    tools.value = await getToolsOverdue()
  } catch (error: any) {
    alert('Failed to fetch overdue tools: ' + error.message)
  }
}
const timeSimulation = () => {}
</script>

<template>
  <div class="page">
    <div class="list-options">
      <Button @click="getAllTools()">See all tools</Button>
      <button @click="toolsOverdue()">See tools overdue</button>
      <button @click="timeSimulation()">Simulate time (+48h)</button>
    </div>
    <div class="data-table">
      <ToolsListComponent :tools="tools" />
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
