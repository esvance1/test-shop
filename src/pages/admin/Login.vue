<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border-t-4 border-red-600">
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-600 mb-4 shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h2 class="text-3xl font-extrabold text-gray-900">เข้าสู่ระบบ (Admin)</h2>
        <p class="text-gray-500 mt-2">จัดการข้อมูลสินค้าในร้านของคุณ</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2"
            >ชื่อผู้ใช้ (Username)</label
          >
          <input
            v-model="username"
            type="text"
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            placeholder="กรอกชื่อผู้ใช้"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">รหัสผ่าน (Password)</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            placeholder="กรอกรหัสผ่าน"
          />
        </div>

        <div
          v-if="error"
          class="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-bold border border-red-100"
        >
          🚨 {{ error }}
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2 disabled:bg-red-400"
        >
          <svg
            v-if="isLoading"
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {{ isLoading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ' }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <router-link
          to="/"
          class="text-sm text-gray-500 hover:text-red-600 font-medium transition-colors"
        >
          &larr; กลับสู่หน้าหลักของร้าน
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2' // 👈 1. นำเข้า SweetAlert2

const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  try {
    isLoading.value = true
    error.value = ''

    const response = await axios.post('http://localhost:3000/api/auth/login', {
      username: username.value,
      password: password.value,
    })

    localStorage.setItem('token', response.data.token)

    // 💥 2. เปลี่ยน alert ธรรมดา เป็น SweetAlert2 เด้งกลางจอสวยๆ
    await Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'ยินดีต้อนรับเข้าสู่ระบบ!',
      showConfirmButton: false,
      timer: 1500,
    })

    router.push('/admin/dashboard')
  } catch (err) {
    console.error(err)
    if (err.response && err.response.data.error) {
      error.value = err.response.data.error
    } else {
      error.value = 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง'
    }
  } finally {
    isLoading.value = false
  }
}
</script>
