<template>
  <div
    class="bg-[#F8FAFC] min-h-screen pb-24 font-sans selection:bg-red-100 selection:text-red-900"
  >
    <div
      class="max-w-[1400px] mx-auto px-5 pt-8 pb-4 sticky top-0 z-30 bg-[#F8FAFC]/80 backdrop-blur-md"
    >
      <button
        @click="$router.back()"
        class="inline-flex items-center gap-3 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-gray-600 font-bold text-sm hover:text-red-600 hover:border-red-200 hover:shadow-[0_8px_20px_rgba(220,38,38,0.1)] hover:-translate-x-1 transition-all duration-300 group"
      >
        <span class="bg-gray-100 group-hover:bg-red-50 p-1.5 rounded-full transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        กลับไปหน้าสินค้า
      </button>
    </div>

    <div v-if="loading" class="flex flex-col items-center justify-center py-32 gap-4">
      <div
        class="w-16 h-16 border-4 border-red-100 border-t-red-600 rounded-full animate-spin"
      ></div>
      <p class="text-gray-400 font-bold animate-pulse tracking-widest uppercase text-sm">
        Loading Product...
      </p>
    </div>

    <div
      v-else-if="error"
      class="max-w-2xl mx-auto text-center py-24 bg-white rounded-[2.5rem] border border-red-100 shadow-sm mt-10"
    >
      <div
        class="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-400 text-4xl"
      >
        ⚠️
      </div>
      <p class="text-red-600 font-black text-xl mb-2">เกิดข้อผิดพลาด</p>
      <p class="text-gray-500 font-medium">{{ error }}</p>
    </div>

    <div v-else-if="product" class="max-w-[1200px] mx-auto px-5 mt-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div class="lg:col-span-6 relative">
          <div
            class="sticky top-28 bg-white rounded-[2.5rem] p-0 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-gray-100 flex justify-center items-center group overflow-hidden min-h-[400px] md:min-h-[550px] cursor-zoom-in"
          >
            <img
              :src="
                product.image
                  ? `https://test-shop-esvance.onrender.com${product.image}`
                  : 'https://via.placeholder.com/800x800?text=No+Image'
              "
              :alt="product.name"
              class="w-full h-full object-cover aspect-square group-hover:scale-125 transition-transform duration-700 ease-out"
            />

            <div
              class="absolute top-6 left-6 z-20 bg-red-600 text-white text-[0.65rem] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg"
            >
              Hot Item 🔥
            </div>

            <div
              class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center pointer-events-none"
            >
              <div
                class="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex justify-center items-center text-red-600 shadow-xl transform scale-50 group-hover:scale-100 transition-transform duration-300"
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-6 flex flex-col justify-center pt-4 lg:pt-6">
          <div class="mb-4 flex items-center gap-3">
            <span
              class="inline-flex items-center gap-1.5 bg-green-50 text-green-600 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
              พร้อมส่ง
            </span>
            <span class="text-sm text-gray-400 font-medium"
              >รหัส: P-{{ product._id.substring(0, 6).toUpperCase() }}</span
            >
          </div>

          <h1
            class="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-[1.2] tracking-tight"
          >
            {{ product.name }}
          </h1>

          <div class="flex items-end gap-3 mb-8 pb-8 border-b border-gray-100">
            <span
              class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 tracking-tight"
            >
              ฿{{ product.price.toLocaleString() }}
            </span>
          </div>

          <div class="mb-10">
            <h3
              class="text-sm font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              รายละเอียดสินค้า
            </h3>
            <p
              class="text-gray-600 text-base leading-relaxed whitespace-pre-wrap font-medium bg-white p-6 rounded-2xl border border-gray-100"
            >
              {{
                product.description ||
                'ทางร้านยังไม่ได้เพิ่มรายละเอียดสำหรับสินค้ารายการนี้ครับ สามารถทักแชทเพื่อสอบถามเพิ่มเติมได้เลยครับ'
              }}
            </p>
          </div>

          <div class="space-y-4">
            <p class="text-sm font-bold text-gray-400 uppercase tracking-widest pl-2">
              🛒 สั่งซื้อหรือสอบถามเลย
            </p>

            <div class="flex flex-col sm:flex-row gap-4">
              <a
                href="https://line.me/ti/p/~YOUR_LINE_ID"
                target="_blank"
                class="flex-1 relative group overflow-hidden bg-[#00B900] text-white font-black text-lg py-4 px-8 rounded-2xl flex justify-center items-center gap-3 shadow-[0_10px_20px_rgba(0,185,0,0.2)] hover:shadow-[0_15px_30px_rgba(0,185,0,0.3)] hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
                ></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="relative z-10"
                >
                  <path
                    d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992zm-18.988-2.595c.129 0 .234.105.234.234v4.153h2.25c.129 0 .234.104.234.234v.516c0 .129-.105.234-.234.234h-2.985c-.129 0-.234-.105-.234-.234v-4.903c0-.129.105-.234.234-.234zm3.984 4.903c0 .129-.105.234-.234.234h-.516c-.129 0-.234-.105-.234-.234v-4.903c0-.129.105-.234.234-.234h.516c.129 0 .234.105.234.234v4.903zm6.398-3.047c0 .129-.104.234-.234.234h-1.547v.938h1.547c.129 0 .234.105.234.234v.516c0 .129-.105.234-.234.234h-2.296c-.129 0-.234-.105-.234-.234v-4.903c0-.129.105-.234.234-.234h2.296c.129 0 .234.105.234.234v.516c0 .129-.105.234-.234.234h-1.547v.938h1.547c.129 0 .234.105.234.234v.515zm4.848.281l-1.922 2.766h.016c-.046.071-.125.118-.211.118h-.515c-.129 0-.234-.105-.234-.234v-4.903c0-.129.105-.234.234-.234h.515c.086 0 .165.047.211.118l1.922 2.766h-.016c.046-.071.125-.118.211-.118h.516c.129 0 .234.105.234.234v4.903c0 .129-.105.234-.234.234h-.516c-.086 0-.165-.047-.211-.118v-2.766z"
                  />
                </svg>
                <span class="relative z-10">สั่งซื้อผ่าน LINE</span>
              </a>

              <button
                @click="copyPhone"
                class="flex-1 relative group overflow-hidden bg-gray-900 text-white font-black text-lg py-4 px-8 rounded-2xl flex justify-center items-center gap-3 shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.25)] hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  class="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
                ></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 relative z-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span class="relative z-10">080-XXX-XXXX</span>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-3 mt-10">
            <div
              class="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:border-red-200 transition-colors group"
            >
              <div
                class="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-2 group-hover:bg-red-600 group-hover:text-white transition-colors"
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <span class="text-xs font-bold text-gray-600">ของแท้ 100%</span>
            </div>

            <div
              class="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:border-red-200 transition-colors group"
            >
              <div
                class="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-2 group-hover:bg-red-600 group-hover:text-white transition-colors"
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span class="text-xs font-bold text-gray-600">จัดส่งด่วนฟรี</span>
            </div>

            <div
              class="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:border-red-200 transition-colors group"
            >
              <div
                class="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-2 group-hover:bg-red-600 group-hover:text-white transition-colors"
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
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <span class="text-xs font-bold text-gray-600">รับประกันสินค้า</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2' // 👈 นำเข้า Swal เพื่อใช้ป๊อปอัปแจ้งเตือนคัดลอกเบอร์โทร

const route = useRoute()
const productId = route.params.id
const product = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchProductDetail = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await axios.get(
      `https://test-shop-esvance.onrender.com/api/products/${productId}`,
    )
    product.value = response.data
  } catch (err) {
    console.error(err)
    error.value = 'ไม่พบข้อมูลสินค้าที่คุณต้องการ หรืออาจถูกลบออกจากระบบไปแล้ว'
  } finally {
    loading.value = false
  }
}

// ฟังก์ชันสำหรับกดคัดลอกเบอร์โทรศัพท์ (มีลูกเล่นจากหน้า Contact)
const copyPhone = () => {
  const phoneNumber = '080-123-4567'
  navigator.clipboard.writeText(phoneNumber).then(() => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'คัดลอกเบอร์โทรแล้ว!',
      text: `โทรสั่งซื้อได้เลยที่ ${phoneNumber}`,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      iconColor: '#dc2626',
    })
  })
}

// ให้ส่งข้อมูลไปนับสถิติ (ถ้ามี) และเด้งกลับไปบนสุดของหน้า
onMounted(() => {
  fetchProductDetail()
  window.scrollTo(0, 0)
})
</script>
