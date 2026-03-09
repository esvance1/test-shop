<template>
  <div>
    <h1 class="text-3xl font-extrabold text-gray-800 tracking-tight mb-8">
      ประวัติการใช้งานระบบ (System Logs)
    </h1>

    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
        <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
          <span class="w-2 h-6 bg-red-600 rounded-full"></span>
          100 รายการล่าสุด
        </h3>
        <button
          @click="fetchLogs"
          class="text-sm font-bold text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors"
        >
          🔄 รีเฟรชข้อมูล
        </button>
      </div>

      <div v-if="loading" class="text-center py-12 text-gray-400 font-medium animate-pulse">
        กำลังโหลดข้อมูล...
      </div>

      <table v-else class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-white text-gray-500 text-sm border-b border-gray-100">
            <th class="p-5 font-bold">วัน-เวลา</th>
            <th class="p-5 font-bold">ผู้ใช้งาน</th>
            <th class="p-5 font-bold">การกระทำ (Action)</th>
            <th class="p-5 font-bold">รายละเอียด</th>
            <th class="p-5 font-bold text-center">IP Address</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="log in logs"
            :key="log._id"
            class="border-b border-gray-50 hover:bg-red-50/40 transition-colors"
          >
            <td class="p-5 text-sm text-gray-500 font-medium">
              {{ new Date(log.createdAt).toLocaleString('th-TH') }}
            </td>
            <td class="p-5 font-bold text-gray-800 flex items-center gap-2">
              <div
                class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs"
              >
                👤
              </div>
              {{ log.username }}
            </td>
            <td class="p-5">
              <span class="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700">
                {{ log.action }}
              </span>
            </td>
            <td class="p-5 text-gray-600 text-sm">{{ log.details }}</td>
            <td class="p-5 text-center">
              <span class="font-mono text-xs bg-gray-100 px-2 py-1 rounded border text-gray-500">{{
                log.ipAddress
              }}</span>
            </td>
          </tr>
          <tr v-if="logs.length === 0">
            <td colspan="5" class="p-12 text-center text-gray-400 font-medium">
              ยังไม่มีประวัติการใช้งาน
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const logs = ref([])
const loading = ref(true)

const fetchLogs = async () => {
  try {
    loading.value = true
    const token = localStorage.getItem('token')
    const response = await axios.get('http://localhost:3000/api/logs', {
      headers: { Authorization: `Bearer ${token}` },
    })
    logs.value = response.data
  } catch (error) {
    console.error('Error fetching logs:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchLogs())
</script>
