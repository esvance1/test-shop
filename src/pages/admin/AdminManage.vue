<template>
  <div class="max-w-5xl mx-auto p-6 mt-10">
    <div class="flex items-center mb-8 border-b pb-4">
      <button
        @click="$router.back()"
        class="mr-4 text-gray-500 hover:text-red-600 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>
      <h1 class="text-3xl font-bold text-gray-800">จัดการผู้ดูแลระบบ (Admins)</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-1">
        <div
          :class="isEditing ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-red-100'"
          class="rounded-2xl shadow-lg p-6 border-t-4 transition-colors"
        >
          <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span v-if="!isEditing" class="text-red-600">➕ เพิ่มแอดมินใหม่</span>
            <span v-else class="text-yellow-600">✏️ แก้ไขข้อมูลแอดมิน</span>
          </h2>

          <form @submit.prevent="submitAdmin" class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"
                >ชื่อผู้ใช้ (Username)</label
              >
              <input
                v-model="form.username"
                type="text"
                required
                class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 outline-none"
                placeholder="กรอกชื่อผู้ใช้"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                รหัสผ่าน
                <span v-if="isEditing" class="text-xs text-red-500 font-normal"
                  >(เว้นว่างไว้ถ้าไม่ต้องการเปลี่ยน)</span
                >
              </label>
              <input
                v-model="form.password"
                type="password"
                :required="!isEditing"
                class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-red-500 outline-none"
                placeholder="กรอกรหัสผ่าน"
              />
            </div>

            <div class="pt-4 flex flex-col gap-2">
              <button
                type="submit"
                :disabled="isLoading"
                class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors disabled:bg-gray-400"
              >
                {{ isLoading ? 'กำลังบันทึก...' : isEditing ? 'บันทึกการแก้ไข' : 'สร้างแอดมิน' }}
              </button>

              <button
                v-if="isEditing"
                type="button"
                @click="cancelEdit"
                class="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2.5 px-4 rounded-lg transition-colors"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="lg:col-span-2">
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-red-50 text-red-800 text-sm border-b border-red-100">
                <th class="p-4 font-bold">ลำดับ</th>
                <th class="p-4 font-bold">ชื่อผู้ใช้ (Username)</th>
                <th class="p-4 font-bold text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(admin, index) in admins"
                :key="admin._id"
                class="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td class="p-4 text-gray-500 font-medium">{{ index + 1 }}</td>
                <td class="p-4 font-bold text-gray-800 flex items-center gap-2">
                  <div
                    class="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs"
                  >
                    🛡️
                  </div>
                  {{ admin.username }}
                </td>
                <td class="p-4 text-center space-x-2">
                  <button
                    @click="startEdit(admin)"
                    class="text-yellow-600 hover:text-yellow-700 font-medium px-3 py-1 bg-yellow-50 hover:bg-yellow-100 rounded transition-colors"
                  >
                    แก้ไข
                  </button>
                  <button
                    @click="deleteAdmin(admin._id, admin.username)"
                    class="text-red-500 hover:text-red-700 font-medium px-3 py-1 bg-red-50 hover:bg-red-100 rounded transition-colors"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
              <tr v-if="admins.length === 0">
                <td colspan="3" class="p-8 text-center text-gray-500">ไม่พบข้อมูลแอดมิน</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const admins = ref([])
const isLoading = ref(false)

// สถานะการแก้ไข
const isEditing = ref(false)
const editingId = ref(null)

// ข้อมูลฟอร์ม
const form = reactive({
  username: '',
  password: '',
})

// ดึงข้อมูลแอดมินทั้งหมด
const fetchAdmins = async () => {
  try {
    const token = localStorage.getItem('token')
    // 💥 สังเกตตรงนี้: เราเรียกไปที่ /api/auth/users
    const response = await axios.get('http://localhost:3000/api/auth/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
    admins.value = response.data
  } catch (error) {
    console.error('Error fetching admins:', error)
    Swal.fire('ผิดพลาด', 'ไม่สามารถดึงข้อมูลแอดมินได้', 'error')
  }
}

// เริ่มการแก้ไข
const startEdit = (admin) => {
  isEditing.value = true
  editingId.value = admin._id
  form.username = admin.username
  form.password = '' // ล้างช่องรหัสผ่านไว้ เผื่อแอดมินไม่อยากเปลี่ยน
}

// ยกเลิกการแก้ไข
const cancelEdit = () => {
  isEditing.value = false
  editingId.value = null
  form.username = ''
  form.password = ''
}

// บันทึกข้อมูล (เพิ่มใหม่ หรือ แก้ไข)
const submitAdmin = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token')
    const config = { headers: { Authorization: `Bearer ${token}` } }

    if (isEditing.value) {
      // โหมดแก้ไข (PUT)
      await axios.put(`http://localhost:3000/api/auth/users/${editingId.value}`, form, config)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'อัปเดตข้อมูลสำเร็จ!',
        showConfirmButton: false,
        timer: 1500,
      })
    } else {
      // โหมดเพิ่มใหม่ (POST)
      await axios.post('http://localhost:3000/api/auth/users', form, config)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'สร้างแอดมินใหม่สำเร็จ!',
        showConfirmButton: false,
        timer: 1500,
      })
    }

    cancelEdit()
    fetchAdmins() // รีเฟรชตาราง
  } catch (error) {
    const errorMsg = error.response?.data?.error || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล'
    Swal.fire('ผิดพลาด', errorMsg, 'error')
  } finally {
    isLoading.value = false
  }
}

// ลบแอดมิน
const deleteAdmin = async (id, username) => {
  const result = await Swal.fire({
    title: 'ยืนยันการลบ?',
    text: `คุณกำลังจะลบสิทธิ์แอดมินของ "${username}" ใช่หรือไม่?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e21d48',
    cancelButtonColor: '#9ca3af',
    confirmButtonText: 'ใช่, ลบทิ้งเลย!',
    cancelButtonText: 'ยกเลิก',
  })

  if (result.isConfirmed) {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:3000/api/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      Swal.fire('ลบสำเร็จ!', 'ผู้ใช้นี้ถูกลบออกจากระบบแล้ว', 'success')
      fetchAdmins()
    } catch (error) {
      Swal.fire('ผิดพลาด', 'ไม่สามารถลบแอดมินได้', 'error')
    }
  }
}

onMounted(() => {
  fetchAdmins()
})
</script>
