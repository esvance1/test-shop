<template>
  <div class="bg-[#F8FAFC] min-h-screen pb-20 font-sans">
    <section
      class="relative pt-20 pb-16 px-5 text-center overflow-hidden bg-white border-b border-gray-100"
    >
      <div class="absolute inset-0 flex justify-center items-center opacity-30 pointer-events-none">
        <div
          class="w-[600px] h-[300px] bg-gradient-to-r from-red-100 to-red-50 rounded-full blur-[80px]"
        ></div>
      </div>

      <div class="relative z-10 max-w-3xl mx-auto">
        <span
          class="inline-block bg-red-50 text-red-600 text-xs font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full mb-6 shadow-sm border border-red-100"
        >
          Our Collection
        </span>
        <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          ค้นพบ
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400"
            >ไอเทมชิ้นโปรด</span
          >
          ของคุณ
        </h1>
        <p class="text-gray-500 text-lg max-w-xl mx-auto font-medium">
          สินค้าคุณภาพพรีเมียมที่เราคัดสรรมาอย่างดี เพื่อตอบโจทย์ทุกไลฟ์สไตล์
        </p>
      </div>
    </section>

    <div class="max-w-[1400px] mx-auto px-5 mt-[-2rem] relative z-20">
      <div
        class="bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-3 border border-gray-100 flex flex-col md:flex-row gap-3 mb-12"
      >
        <div class="relative flex-grow group">
          <div
            class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-600 transition-colors"
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            class="block w-full pl-14 pr-12 py-4 bg-gray-50/50 border border-transparent rounded-2xl text-gray-800 placeholder-gray-400 focus:bg-white focus:border-red-200 focus:ring-4 focus:ring-red-50 transition-all font-medium text-lg outline-none"
            placeholder="ค้นหาชื่อสินค้าที่ต้องการ..."
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-red-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 bg-gray-200 rounded-full p-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="relative min-w-[250px]">
          <div
            class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </div>
          <select
            v-model="sortOption"
            class="appearance-none block w-full pl-12 pr-10 py-4 bg-gray-50/50 border border-transparent rounded-2xl text-gray-700 font-bold focus:bg-white focus:border-red-200 focus:ring-4 focus:ring-red-50 transition-all cursor-pointer outline-none"
          >
            <option value="newest">มาใหม่ล่าสุด</option>
            <option value="price_asc">ราคา: ต่ำ → สูง</option>
            <option value="price_desc">ราคา: สูง → ต่ำ</option>
          </select>
          <div
            class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="flex justify-between items-center mb-8 px-2">
        <h2 class="text-xl font-black text-gray-800">
          สินค้า <span v-if="searchQuery" class="text-red-600">"{{ searchQuery }}"</span>
        </h2>
        <div
          v-if="!loading && !error"
          class="text-sm font-bold text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm"
        >
          พบ <span class="text-red-600">{{ filteredAndSortedProducts.length }}</span> รายการ
        </div>
      </div>

      <div v-if="loading" class="flex flex-col items-center justify-center py-32">
        <div
          class="w-16 h-16 border-4 border-red-100 border-t-red-600 rounded-full animate-spin mb-4"
        ></div>
        <p class="text-gray-400 font-bold animate-pulse">กำลังจัดเตรียมสินค้า...</p>
      </div>

      <div
        v-else-if="error"
        class="text-center py-20 bg-red-50 rounded-3xl border border-red-100 max-w-2xl mx-auto shadow-sm"
      >
        <div class="text-5xl mb-4">⚠️</div>
        <p class="text-red-600 font-bold text-lg">{{ error }}</p>
      </div>

      <div
        v-else-if="filteredAndSortedProducts.length === 0"
        class="text-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-300 shadow-sm max-w-3xl mx-auto"
      >
        <div
          class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p class="text-2xl font-black text-gray-800 mb-2">อุ๊ปส์! ไม่พบสินค้าที่คุณมองหา</p>
        <p class="text-gray-500 mb-8 font-medium">
          ลองเปลี่ยนคำค้นหา หรือเลือกตัวกรองใหม่อีกครั้งนะครับ
        </p>
        <button
          @click="searchQuery = ''"
          class="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
        >
          ดูสินค้าทั้งหมด
        </button>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <router-link
          v-for="(product, index) in filteredAndSortedProducts"
          :key="product._id"
          :to="`/products/${product._id}`"
          class="bg-white rounded-[1.5rem] p-3 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.2)] hover:-translate-y-2 hover:border-red-100 border border-gray-100 transition-all duration-500 group flex flex-col relative"
          :style="`animation: fadeSlideUp 0.5s ease forwards ${index * 0.05}s`"
        >
          <span
            v-if="sortOption === 'newest' && index < 8"
            class="absolute top-6 left-6 bg-red-600 text-white text-[0.65rem] font-black tracking-widest px-3 py-1.5 rounded-full z-20 shadow-md uppercase"
          >
            New
          </span>

          <div class="relative w-full aspect-square bg-gray-50 rounded-[1rem] overflow-hidden mb-4">
            <img
              :src="
                product.image
                  ? `http://localhost:3000${product.image}`
                  : 'https://via.placeholder.com/400?text=No+Image'
              "
              :alt="product.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            <div
              class="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6"
            >
              <span
                class="bg-white/90 backdrop-blur-sm text-gray-900 font-bold text-sm px-6 py-2.5 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                ดูรายละเอียด
              </span>
            </div>
          </div>

          <div class="px-2 pb-2 flex flex-col flex-grow">
            <h3
              class="text-base font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors leading-snug"
            >
              {{ product.name }}
            </h3>

            <div class="mt-auto flex items-center justify-between">
              <div class="flex flex-col">
                <span class="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1"
                  >ราคา</span
                >
                <span class="text-2xl font-black text-red-600 leading-none"
                  >฿{{ product.price.toLocaleString() }}</span
                >
              </div>

              <div
                class="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white text-gray-400 transition-all duration-300 transform group-hover:rotate-[-45deg] shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.5"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const sortOption = ref('newest')

const fetchProducts = async () => {
  try {
    loading.value = true
    const response = await axios.get('http://localhost:3000/api/products')
    products.value = response.data
  } catch (err) {
    error.value = 'ไม่สามารถดึงข้อมูลสินค้าได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง'
  } finally {
    loading.value = false
  }
}

const filteredAndSortedProducts = computed(() => {
  // 1. กรองตามคำค้นหา
  let result = products.value.filter((product) => {
    if (!searchQuery.value) return true
    const query = searchQuery.value.toLowerCase()
    return (
      product.name.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query))
    )
  })

  // 2. จัดเรียง
  if (sortOption.value === 'price_asc') {
    result.sort((a, b) => a.price - b.price)
  } else if (sortOption.value === 'price_desc') {
    result.sort((a, b) => b.price - a.price)
  } else {
    // newest (เรียงวันที่ล่าสุดขึ้นก่อน)
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  return result
})

// บันทึกสถิติเมื่อเข้าหน้าเว็บ (เพื่อให้หลังบ้านรู้ว่ามีคนเข้าหน้านี้)
const recordVisit = async () => {
  try {
    await axios.post('http://localhost:3000/api/visits/record')
  } catch (error) {}
}

onMounted(() => {
  fetchProducts()
  recordVisit()
  window.scrollTo(0, 0)
})
</script>

<style scoped>
/* ตัวตัดคำเมื่อยาวเกิน 2 บรรทัด */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* แอนิเมชันการ์ดสินค้าโผล่ขึ้นมาตอนโหลดเสร็จ */
@keyframes fadeSlideUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
