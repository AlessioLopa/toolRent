<script lang="ts" setup>
import { reactive } from 'vue'
import { login } from '../services/authService'
import router from '@/router'

const loginData = reactive({
  email: '',
  password: '',
})

async function onSubmit() {
  if (loginData.email === '' || loginData.password === '') {
    alert('Please fill in all fields')
    return
  }

  try {
    if (await login(loginData.email, loginData.password)) {
      if (localStorage.getItem('token')) {
        await router.push('/home')
      }
    }
  } catch (error: any) {
    alert('Login failed: ' + error.message)
    return
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="onSubmit" id="login-form">
      <div class="email">
        <input type="text" placeholder="email" v-model="loginData.email" />
      </div>
      <div class="password">
        <input type="password" placeholder="Password" v-model="loginData.password" />
      </div>

      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>

<style scoped></style>
