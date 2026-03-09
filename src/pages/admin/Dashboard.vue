<template>
  <div>
    <div class="flex justify-between items-end mb-10">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-800 tracking-tight">Dashboard Overview</h1>
        <p class="text-gray-500 font-medium mt-2">
          {{
            new Date().toLocaleDateString('th-TH', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }}
        </p>
      </div>
      <router-link
        to="/"
        target="_blank"
        class="bg-white border border-gray-200 text-gray-600 px-6 py-2.5 rounded-full font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2"
      >
        ดูหน้าร้าน 🚀
      </router-link>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div
        class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between"
      >
        <div>
          <p class="text-sm font-bold text-gray-400 mb-1">สินค้าทั้งหมด</p>
          <h3 class="text-3xl font-extrabold text-gray-800">
            {{ products.length }} <span class="text-sm font-medium text-gray-400">ชิ้น</span>
          </h3>
        </div>
        <div
          class="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl shadow-inner"
        >
          📦
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between"
      >
        <div>
          <p class="text-sm font-bold text-gray-400 mb-1">มูลค่ารวม</p>
          <h3 class="text-3xl font-extrabold text-gray-800">
            {{ products.reduce((sum, p) => sum + p.price, 0).toLocaleString() }}
            <span class="text-sm font-medium text-gray-400">฿</span>
          </h3>
        </div>
        <div
          class="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-xl shadow-inner"
        >
          💰
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between relative overflow-hidden"
      >
        <div class="relative z-10">
          <p class="text-sm font-bold text-gray-400 mb-1">ผู้เข้าชม (วันนี้)</p>
          <h3 class="text-3xl font-extrabold text-gray-800">
            {{ stats.totalToday.toLocaleString() }}
            <span class="text-sm font-medium text-gray-400">ครั้ง</span>
          </h3>
        </div>
        <div
          class="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-xl shadow-inner relative z-10"
        >
          🔥
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between"
      >
        <div>
          <p class="text-sm font-bold text-gray-400 mb-1">ผู้เข้าชม (เดือนนี้)</p>
          <h3 class="text-3xl font-extrabold text-gray-800">
            {{ stats.totalThisMonth.toLocaleString() }}
            <span class="text-sm font-medium text-gray-400">ครั้ง</span>
          </h3>
        </div>
        <div
          class="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-xl shadow-inner"
        >
          👁️
        </div>
      </div>

      <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 lg:col-span-4">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span class="w-2 h-6 bg-red-500 rounded-full"></span>
            สถิติผู้เข้าชมเว็บไซต์
          </h3>

          <div class="flex bg-gray-100 rounded-xl p-1">
            <button
              @click="setChartMode('daily')"
              :class="
                chartMode === 'daily'
                  ? 'bg-white shadow-sm text-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              "
              class="px-5 py-1.5 rounded-lg text-sm font-bold transition-all"
            >
              รายวัน
            </button>
            <button
              @click="setChartMode('monthly')"
              :class="
                chartMode === 'monthly'
                  ? 'bg-white shadow-sm text-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              "
              class="px-5 py-1.5 rounded-lg text-sm font-bold transition-all"
            >
              รายเดือน
            </button>
          </div>
        </div>

        <div class="h-64">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>

    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-50 flex justify-between items-center">
        <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
          <span class="w-2 h-6 bg-blue-500 rounded-full"></span> รายการสินค้าในระบบ
        </h3>
      </div>

      <div v-if="loading" class="text-center py-12 text-gray-400 font-medium animate-pulse">
        กำลังโหลดข้อมูล...
      </div>

      <table v-else class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-gray-50/50 text-gray-500 text-sm border-b border-gray-100">
            <th class="p-5 font-bold">รูปภาพ</th>
            <th class="p-5 font-bold">ชื่อสินค้า</th>
            <th class="p-5 font-bold">ราคา (บาท)</th>
            <th class="p-5 font-bold text-center">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in products"
            :key="product._id"
            class="border-b border-gray-50 hover:bg-blue-50/30 transition-colors"
          >
            <td class="p-5">
              <img
                :src="
                  product.image
                    ? `http://localhost:3000${product.image}`
                    : 'https://via.placeholder.com/150'
                "
                class="w-14 h-14 object-cover rounded-xl shadow-sm border border-gray-100"
              />
            </td>
            <td class="p-5 font-bold text-gray-800">{{ product.name }}</td>
            <td class="p-5 text-red-500 font-extrabold">{{ product.price.toLocaleString() }}</td>
            <td class="p-5 text-center space-x-2">
              <router-link
                :to="`/admin/products/edit/${product._id}`"
                class="text-blue-600 hover:text-blue-800 font-bold px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-sm"
                >แก้ไข</router-link
              >
              <button
                @click="deleteProduct(product._id, product.name)"
                class="text-red-500 hover:text-red-700 font-bold px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-sm"
              >
                ลบ
              </button>
            </td>
          </tr>
          <tr v-if="products.length === 0">
            <td colspan="4" class="p-12 text-center text-gray-400 font-medium">
              ยังไม่มีสินค้าในระบบ
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
import Swal from 'sweetalert2'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler)

const products = ref([])
const loading = ref(true)

// ข้อมูลสถิติดิบที่ได้จาก Backend
const stats = ref({
  totalToday: 0,
  totalThisMonth: 0,
  monthlyData: [],
  dailyData: [],
})

const chartMode = ref('daily') // ค่าเริ่มต้นให้แสดงรายวัน

// สร้าง Label แกน X
const monthlyLabels = [
  'ม.ค.',
  'ก.พ.',
  'มี.ค.',
  'เม.ย.',
  'พ.ค.',
  'มิ.ย.',
  'ก.ค.',
  'ส.ค.',
  'ก.ย.',
  'ต.ค.',
  'พ.ย.',
  'ธ.ค.',
]
const getDailyLabels = () => {
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
  return Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`) // ได้เลขวันที่ 1, 2, 3 ... 31
}

// โครงสร้างกราฟ
const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'จำนวนครั้งที่เข้าชม',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: '#ef4444',
      borderWidth: 3,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#ef4444',
      pointBorderWidth: 2,
      pointRadius: 4,
      fill: true,
      data: [],
      tension: 0.4,
    },
  ],
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: { beginAtZero: true, ticks: { precision: 0 }, grid: { borderDash: [5, 5] } },
    x: { grid: { display: false } },
  },
})

// ฟังก์ชันดึงสถิติ
const fetchVisitStats = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/visits/stats')
    stats.value = response.data
    setChartMode('daily') // โหลดเสร็จสั่งให้แสดงกราฟรายวันทันที
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
}

// ฟังก์ชันสลับกราฟ (รายวัน / รายเดือน)
const setChartMode = (mode) => {
  chartMode.value = mode

  const newLabels = mode === 'daily' ? getDailyLabels() : monthlyLabels
  const newData = mode === 'daily' ? stats.value.dailyData : stats.value.monthlyData

  chartData.value = {
    ...chartData.value,
    labels: newLabels,
    datasets: [
      {
        ...chartData.value.datasets[0],
        data: newData,
      },
    ],
  }
}

const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/products')
    products.value = response.data
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const deleteProduct = async (id, name) => {
  // โค้ดลบสินค้าเหมือนเดิม
}

onMounted(() => {
  fetchProducts()
  fetchVisitStats()
})
</script>
