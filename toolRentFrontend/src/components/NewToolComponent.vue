<script lang="ts" setup>
import Dialog from 'primevue/dialog'
import { reactive, ref } from 'vue'
import { type Tool } from '@/interfaces/Tool'
import Button from 'primevue/button'
import Select from 'primevue/select'
import { onMounted } from 'vue'
import { getCategories } from '@/services/categoriesService'
import { postTool } from '@/services/toolsService'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'

const categories = ref([])
const toast = useToast()

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:visible'])

onMounted(async () => {
  try {
    categories.value = await getCategories()
  } catch (error: any) {
    alert('Failed to fetch categories: ' + error.message)
  }
})

const tool = reactive<Tool>({
  name: '',
  description: '',
  status: 'available',
  due_date: null,
  categoryId: 0,
})

const addTool = async () => {
  if (tool.name === '' || tool.description === '' || tool.categoryId === 0) {
    alert('Please fill in all fields')
  } else {
    try {
      if (await postTool(tool)) {
        toast.add({
          severity: 'success',
          summary: 'Tool added',
          detail: `You have successfully added the tool: ${tool.name}`,
          life: 3000,
        })
        emit('update:visible', false)
      }
    } catch (error: any) {
      alert('Failed to add tool: ' + error.message)
    }
  }
}
</script>

<template>
  <Toast />
  <div>
    <Dialog
      :visible="props.visible"
      @update:visible="emit('update:visible', $event)"
      modal
      header="Add new tool"
      :style="{ width: '25rem' }"
    >
      <div>
        <label for="name">Name</label>
        <input id="name" v-model="tool.name" />
      </div>
      <div>
        <label for="description">Description</label>
        <input id="description" v-model="tool.description" />
      </div>
      <div>
        <label for="categoryId">Category</label>
        <Select
          id="categoryId"
          v-model="tool.categoryId"
          :options="categories"
          optionLabel="name"
          optionValue="id"
          placeholder="Select a category"
          class="w-full md:w-56"
        />
      </div>
      <div>
        <Button label="Add" @click="addTool">Add</Button>
        <Button label="Cancel" severity="secondary" @click="emit('update:visible', false)"
          >Cancel</Button
        >
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
