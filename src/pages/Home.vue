<template>
  <div class="font-sans bg-white text-gray-900 overflow-x-hidden pb-10">
    <section
      v-if="banners.length > 0"
      class="relative w-full max-w-[1400px] mx-auto mt-8 mb-16 overflow-hidden rounded-3xl aspect-[21/9]"
    >
      <div
        class="flex h-full transition-transform duration-700 ease-in-out"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
          v-for="banner in banners"
          :key="banner._id"
          class="w-full flex-shrink-0 h-full relative group"
        >
          <img
            :src="`http://localhost:3000${banner.image}`"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div
            class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"
          ></div>
        </div>
      </div>

      <div class="absolute inset-0 rounded-3xl ring-1 ring-white/20 pointer-events-none"></div>
      <div
        class="absolute -inset-px rounded-3xl shadow-[0_0_60px_-10px_rgba(220,38,38,0.3)] pointer-events-none"
      ></div>

      <button
        @click="prevSlide"
        class="absolute top-1/2 left-5 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-red-600 hover:border-transparent hover:scale-110 transition-all duration-300 z-10 shadow-lg"
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
            stroke-width="2.5"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        @click="nextSlide"
        class="absolute top-1/2 right-5 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/30 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-red-600 hover:border-transparent hover:scale-110 transition-all duration-300 z-10 shadow-lg"
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
            stroke-width="2.5"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div class="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
        <button
          v-for="(_, index) in banners"
          :key="'dot-' + index"
          @click="goToSlide(index)"
          :class="[
            'h-2 rounded-full transition-all duration-300 cursor-pointer',
            currentSlide === index
              ? 'bg-red-600 w-10 shadow-[0_0_12px_rgba(220,38,38,0.8)]'
              : 'bg-white/50 w-2 hover:bg-white',
          ]"
        ></button>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-5 mb-20">
      <div class="flex flex-col items-center mb-14 text-center">
        <div
          class="bg-red-50 text-red-600 text-[0.7rem] font-black tracking-widest uppercase px-5 py-2 rounded-full mb-4"
        >
          ✦ New Arrivals
        </div>
        <h2 class="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
          สินค้ามาใหม่ล่าสุด
        </h2>
        <div class="flex items-center gap-2">
          <span class="w-16 h-1 bg-gradient-to-r from-transparent to-red-600 rounded-full"></span>
          <span class="w-2.5 h-2.5 bg-red-600 rotate-45 rounded-sm"></span>
          <span class="w-16 h-1 bg-gradient-to-l from-transparent to-red-600 rounded-full"></span>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center py-20">
        <div
          class="w-12 h-12 border-4 border-red-100 border-t-red-600 rounded-full animate-spin"
        ></div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <router-link
          v-for="product in featuredProducts"
          :key="product._id"
          :to="`/products/${product._id}`"
          class="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-[0_20px_50px_-10px_rgba(220,38,38,0.15)] hover:-translate-y-2 hover:border-red-200 transition-all duration-500 overflow-hidden group flex flex-col relative"
        >
          <div class="relative h-56 bg-gray-50 overflow-hidden">
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
              class="absolute inset-0 bg-gradient-to-t from-red-900/80 via-red-800/40 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <span
                class="text-white font-bold text-sm border-2 border-white/60 px-6 py-2.5 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
              >
                คลิกดูรายละเอียด
              </span>
            </div>

            <span
              class="absolute top-4 left-4 bg-red-600 text-white text-[0.65rem] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg z-10"
            >
              NEW
            </span>
          </div>

          <div class="p-6 flex flex-col flex-grow">
            <h3
              class="text-base font-bold text-gray-800 mb-4 line-clamp-2 group-hover:text-red-600 transition-colors"
            >
              {{ product.name }}
            </h3>
            <div class="mt-auto flex items-center justify-between">
              <span class="text-2xl font-black text-red-600 tracking-tight"
                >฿{{ product.price.toLocaleString() }}</span
              >
              <span
                class="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1 shadow-sm"
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
              </span>
            </div>
          </div>
        </router-link>
      </div>

      <div class="text-center mt-12">
        <router-link
          to="/products"
          class="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-black text-lg px-10 py-4 rounded-2xl shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:shadow-[0_15px_40px_rgba(220,38,38,0.4)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
        >
          <div
            class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
          ></div>
          <span class="relative z-10">ดูสินค้าทั้งหมด</span>
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
              stroke-width="2.5"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </router-link>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-5 mb-16">
      <div
        class="relative bg-gradient-to-r from-red-800 via-red-600 to-red-700 rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_-10px_rgba(220,38,38,0.4)] overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group"
      >
        <div
          class="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"
        ></div>
        <div
          class="absolute -bottom-24 -right-24 w-72 h-72 bg-black/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"
        ></div>

        <div class="relative z-10 text-center md:text-left">
          <span
            class="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm border border-white/30"
          >
            Special Offer
          </span>
          <h3 class="text-3xl md:text-4xl font-black text-white mb-3 drop-shadow-md">
            ลูกค้าใหม่ รับส่วนลด 20% 🎉
          </h3>
          <p class="text-red-100 font-medium text-lg">
            ช็อปฟินๆ กับสินค้าพรีเมียม เพียงใช้โค้ดด้านล่าง
          </p>
        </div>

        <div class="relative z-10 flex flex-col sm:flex-row items-center gap-4">
          <div
            class="bg-white/10 border-2 border-dashed border-white/50 rounded-2xl px-8 py-4 backdrop-blur-md"
          >
            <span class="text-3xl font-black text-white tracking-widest drop-shadow-lg"
              >NEW2026</span
            >
          </div>
          <button
            @click="copyCode('NEW2026')"
            class="bg-white text-red-600 font-black px-8 py-4 rounded-2xl shadow-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300"
          >
            คัดลอกโค้ด
          </button>
        </div>
      </div>
    </section>

    <div class="max-w-5xl mx-auto px-5 mb-24 relative z-20">
      <div
        class="bg-white border border-gray-100 rounded-3xl shadow-lg flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100 overflow-hidden"
      >
        <div
          class="flex-1 flex flex-col items-center justify-center py-8 px-5 gap-1 hover:bg-red-50/50 transition-colors group"
        >
          <span
            class="text-4xl font-black text-red-600 tracking-tight group-hover:scale-110 transition-transform"
            >10K+</span
          >
          <span class="text-sm text-gray-400 font-bold uppercase tracking-widest"
            >ลูกค้าไว้วางใจ</span
          >
        </div>
        <div
          class="flex-1 flex flex-col items-center justify-center py-8 px-5 gap-1 hover:bg-red-50/50 transition-colors group"
        >
          <span
            class="text-4xl font-black text-red-600 tracking-tight group-hover:scale-110 transition-transform"
            >500+</span
          >
          <span class="text-sm text-gray-400 font-bold uppercase tracking-widest"
            >สินค้าพรีเมียม</span
          >
        </div>
        <div
          class="flex-1 flex flex-col items-center justify-center py-8 px-5 gap-1 hover:bg-red-50/50 transition-colors group"
        >
          <span
            class="text-4xl font-black text-red-600 tracking-tight group-hover:scale-110 transition-transform"
            >99%</span
          >
          <span class="text-sm text-gray-400 font-bold uppercase tracking-widest"
            >จัดส่งตรงเวลา</span
          >
        </div>
      </div>
    </div>

    <section class="bg-gradient-to-b from-gray-50 to-white py-24 mb-10">
      <div class="max-w-6xl mx-auto px-5">
        <div class="flex flex-col items-center mb-16 text-center">
          <div
            class="bg-red-50 text-red-600 text-[0.7rem] font-black tracking-widest uppercase px-5 py-2 rounded-full mb-4"
          >
            ✦ Why Choose Us
          </div>
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            ทำไมต้องเลือกเรา?
          </h2>
          <div class="flex items-center gap-2">
            <span class="w-16 h-1 bg-gradient-to-r from-transparent to-red-600 rounded-full"></span>
            <span class="w-2.5 h-2.5 bg-red-600 rotate-45 rounded-sm"></span>
            <span class="w-16 h-1 bg-gradient-to-l from-transparent to-red-600 rounded-full"></span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="bg-white border border-gray-100 rounded-[2rem] p-10 text-center relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(220,38,38,0.15)] group"
          >
            <div
              class="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600 group-hover:text-white group-hover:rotate-12 transition-all duration-500"
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-black text-gray-900 mb-3">ของแท้ 100%</h3>
            <p class="text-gray-500 text-sm leading-relaxed">
              รับประกันคุณภาพสินค้าทุกชิ้น คัดสรรมาอย่างพิถีพิถัน ผ่านมาตรฐานสูงสุด
            </p>
          </div>

          <div
            class="bg-gradient-to-br from-red-600 to-red-800 rounded-[2rem] p-10 text-center relative overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-[0_20px_40px_rgba(220,38,38,0.3)] hover:shadow-[0_30px_60px_rgba(220,38,38,0.4)] group"
          >
            <div
              class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"
            ></div>
            <div
              class="w-16 h-16 bg-white/20 backdrop-blur-sm text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:-rotate-12 transition-all duration-500 border border-white/30 relative z-10"
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-black text-white mb-3 relative z-10">ตอบไว ส่งด่วน</h3>
            <p class="text-red-100 text-sm leading-relaxed relative z-10">
              ทักปุ๊บตอบปั๊บ พร้อมจัดส่งทุกวันทั่วประเทศ ด้วยระบบโลจิสติกส์ที่ทันสมัย
            </p>
          </div>

          <div
            class="bg-white border border-gray-100 rounded-[2rem] p-10 text-center relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(220,38,38,0.15)] group"
          >
            <div
              class="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600 group-hover:text-white group-hover:rotate-12 transition-all duration-500"
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-black text-gray-900 mb-3">บริการด้วยใจ</h3>
            <p class="text-gray-500 text-sm leading-relaxed">
              ดูแลลูกค้าด้วยใจ พร้อมให้คำปรึกษาตลอด 24 ชั่วโมง ทุกวันไม่มีวันหยุด
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const featuredProducts = ref([])
const loading = ref(true)
const banners = ref([])
const currentSlide = ref(0)
let slideInterval = null

const fetchBanners = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/banners')
    banners.value = res.data
  } catch (err) {
    console.error(err)
  }
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % banners.value.length
}
const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? banners.value.length - 1 : currentSlide.value - 1
}
const goToSlide = (index) => {
  currentSlide.value = index
}

const fetchFeaturedProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/products')
    featuredProducts.value = response.data.slice(0, 4)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const recordVisit = async () => {
  try {
    await axios.post('http://localhost:3000/api/visits/record')
  } catch (error) {
    console.log('บันทึกสถิติไม่สำเร็จ')
  }
}

const copyCode = (code) => {
  navigator.clipboard.writeText(code).then(() => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'คัดลอกโค้ดสำเร็จ!',
      text: `นำโค้ด ${code} ไปใช้ตอนชำระเงินได้เลย`,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      iconColor: '#dc2626',
    })
  })
}

onMounted(() => {
  fetchFeaturedProducts()
  fetchBanners()
  recordVisit()
  slideInterval = setInterval(nextSlide, 6000)
})

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval)
})
</script>
