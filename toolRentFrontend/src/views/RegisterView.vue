<script lang="ts" setup>
import { reactive } from 'vue'
import { register } from '../services/authService'
import router from '@/router'

const registerData = reactive({
  email: '',
  password: '',
})

async function onSubmit() {
  if (registerData.email === '' || registerData.password === '') {
    alert('Please fill in all fields')
    return
  }

  try {
    if (await register(registerData.email, registerData.password)) {
      console.log('Registration successful')
      await router.push('/login')
    }
  } catch (error: any) {
    alert('Login failed: ' + error.message)
    return
  }
}
</script>

<template>
  <div>
    <Label>Register</Label>
    <form @submit.prevent="onSubmit" id="login-form">
      <div class="email">
        <input type="text" placeholder="email" v-model="registerData.email" />
      </div>
      <div class="password">
        <input type="password" placeholder="Password" v-model="registerData.password" />
      </div>

      <button type="submit" class="login-button">Register</button>
    </form>
  </div>
</template>

<style scoped></style>
