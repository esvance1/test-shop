<template>
  <div class="min-h-screen bg-white flex flex-col font-sans">
    <!-- NAVBAR -->
    <nav class="bg-white border-b-4 border-red-600 sticky top-0 z-50 shadow-sm">
      <div class="max-w-6xl mx-auto px-6">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <router-link to="/" class="flex items-center gap-2 group">
            <div class="bg-red-600 p-2 rounded-lg group-hover:bg-red-700 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <span class="text-xl font-black tracking-widest text-gray-900 uppercase"
              >Test<span class="text-red-600">Shop</span></span
            >
          </router-link>

          <!-- Desktop Links -->
          <div class="hidden md:flex items-center gap-1">
            <router-link
              to="/"
              class="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all"
              >หน้าแรก</router-link
            >
            <router-link
              to="/products"
              class="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all"
              >สินค้าทั้งหมด</router-link
            >
            <router-link
              to="/about"
              class="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all"
              >เกี่ยวกับ</router-link
            >
            <router-link
              to="/contact"
              class="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all"
              >ติดต่อ</router-link
            >
          </div>

          <!-- Admin Button + Hamburger -->
          <div class="flex items-center gap-3">
            <button
              @click="mobileOpen = !mobileOpen"
              class="md:hidden p-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              <svg
                v-if="!mobileOpen"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-red-600"
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
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition name="fade">
        <div
          v-if="mobileOpen"
          class="md:hidden bg-white border-t border-red-100 px-6 py-4 flex flex-col gap-1"
        >
          <router-link
            to="/"
            @click="mobileOpen = false"
            class="px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all"
            >หน้าแรก</router-link
          >
          <router-link
            to="/products"
            @click="mobileOpen = false"
            class="px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all"
            >สินค้าทั้งหมด</router-link
          >
          <a
            href="#"
            class="px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all"
            >เกี่ยวกับเรา</a
          >
          <a
            href="#"
            class="px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all"
            >ติดต่อ</a
          >
          <router-link
            to="/admin/login"
            @click="mobileOpen = false"
            class="mt-2 flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Admin Panel
          </router-link>
        </div>
      </transition>
    </nav>

    <!-- MAIN -->
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- FOOTER -->
    <footer class="bg-gray-900 text-white mt-16">
      <!-- Red accent line -->
      <div class="h-1 bg-red-600"></div>

      <div class="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="bg-red-600 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <span class="text-xl font-black tracking-widest uppercase"
              >Test<span class="text-red-500">Shop</span></span
            >
          </div>
          <p class="text-gray-400 text-sm leading-relaxed mb-6">
            ร้านค้าออนไลน์ที่รวบรวมสินค้าคุณภาพดีที่สุดสำหรับคุณ จัดส่งรวดเร็ว ปลอดภัย เชื่อถือได้
            100%
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              class="bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-semibold px-3 py-1 rounded-full"
              >จัดส่งฟรี</span
            >
            <span
              class="bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-semibold px-3 py-1 rounded-full"
              >คืนสินค้าได้</span
            >
            <span
              class="bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-semibold px-3 py-1 rounded-full"
              >ปลอดภัย 100%</span
            >
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3
            class="text-sm font-bold uppercase tracking-widest text-white mb-5 flex items-center gap-3"
          >
            <span class="w-6 h-0.5 bg-red-600 inline-block"></span>
            ลิงก์ด่วน
          </h3>
          <ul class="space-y-3">
            <li>
              <router-link
                to="/"
                class="text-gray-400 hover:text-red-400 text-sm flex items-center gap-2 transition-colors group"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-red-500 transition-colors"
                ></span>
                หน้าแรก
              </router-link>
            </li>
            <li>
              <router-link
                to="/products"
                class="text-gray-400 hover:text-red-400 text-sm flex items-center gap-2 transition-colors group"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-red-500 transition-colors"
                ></span>
                สินค้าทั้งหมด
              </router-link>
            </li>
            <li>
              <router-link
                to="/about"
                class="text-gray-400 hover:text-red-400 text-sm flex items-center gap-2 transition-colors group"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-red-500 transition-colors"
                ></span>
                เกี่ยวกับเรา
              </router-link>
            </li>
            <li>
              <router-link
                to="/contact"
                class="text-gray-400 hover:text-red-400 text-sm flex items-center gap-2 transition-colors group"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-red-500 transition-colors"
                ></span>
                ติดต่อเรา
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3
            class="text-sm font-bold uppercase tracking-widest text-white mb-5 flex items-center gap-3"
          >
            <span class="w-6 h-0.5 bg-red-600 inline-block"></span>
            ติดต่อเรา
          </h3>
          <div class="space-y-4">
            <div class="flex items-center gap-3 text-sm text-gray-400">
              <div class="bg-red-600/20 p-2 rounded-lg flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              support@testshop.com
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-400">
              <div class="bg-red-600/20 p-2 rounded-lg flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-red-400"
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
              </div>
              02-XXX-XXXX
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-400">
              <div class="bg-red-600/20 p-2 rounded-lg flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              เปิดบริการ จ.–ศ. 09:00–18:00 น.
            </div>
            <div class="fixed bottom-6 right-6 z-50 group pointer-events-auto">
              <div
                class="absolute bottom-16 right-0 flex flex-col gap-3 items-center mb-4 opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300"
              >
                <a
                  href="https://m.me/YOUR_PAGE_NAME"
                  target="_blank"
                  class="relative flex items-center justify-center w-12 h-12 bg-[#0084FF] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
                >
                  <span
                    class="absolute right-14 bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Facebook
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2C6.477 2 2 6.145 2 11.259c0 2.915 1.531 5.489 3.896 7.152v3.31l3.551-1.956c.823.23 1.687.354 2.553.354 5.523 0 10-4.145 10-9.259S17.523 2 12 2zm1.096 12.605l-2.79-2.983-5.454 2.983 5.978-6.362 2.83 2.983 5.412-2.983-5.976 6.362z"
                    />
                  </svg>
                </a>

                <a
                  href="https://line.me/ti/p/~YOUR_LINE_ID"
                  target="_blank"
                  class="relative flex items-center justify-center w-12 h-12 bg-[#00B900] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
                >
                  <span
                    class="absolute right-14 bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    LINE
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992zm-18.988-2.595c.129 0 .234.105.234.234v4.153h2.25c.129 0 .234.104.234.234v.516c0 .129-.105.234-.234.234h-2.985c-.129 0-.234-.105-.234-.234v-4.903c0-.129.105-.234.234-.234zm3.984 4.903c0 .129-.105.234-.234.234h-.516c-.129 0-.234-.105-.234-.234v-4.903c0-.129.105-.234.234-.234h.516c.129 0 .234.105.234.234v4.903zm6.398-3.047c0 .129-.104.234-.234.234h-1.547v.938h1.547c.129 0 .234.105.234.234v.516c0 .129-.105.234-.234.234h-2.296c-.129 0-.234-.105-.234-.234v-4.903c0-.129.105-.234.234-.234h2.296c.129 0 .234.105.234.234v.516c0 .129-.105.234-.234.234h-1.547v.938h1.547c.129 0 .234.105.234.234v.515zm4.848.281l-1.922 2.766h.016c-.046.071-.125.118-.211.118h-.515c-.129 0-.234-.105-.234-.234v-4.903c0-.129.105-.234.234-.234h.515c.086 0 .165.047.211.118l1.922 2.766h-.016c.046-.071.125-.118.211-.118h.516c.129 0 .234.105.234.234v4.903c0 .129-.105.234-.234.234h-.516c-.086 0-.165-.047-.211-.118v-2.766z"
                    />
                  </svg>
                </a>
              </div>

              <button
                class="w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
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
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-gray-800 py-5">
        <div
          class="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500"
        >
          <p @click="handleSecretClick" class="text-gray-400 text-sm select-none">
            © 2026 TEST SHOP. All rights reserved.
          </p>
          <span>@ Dev Mon</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const mobileOpen = ref(false)
import { useRouter } from 'vue-router'

const router = useRouter()
const secretCount = ref(0)
let clickTimer = null

const handleSecretClick = () => {
  secretCount.value++

  // ถ้ากดครบ 5 ครั้ง ให้วาร์ปไปหน้า Login ทันที
  if (secretCount.value >= 5) {
    router.push('/admin/login')
    secretCount.value = 0 // รีเซ็ตค่า
  }

  // เคลียร์ค่าทิ้งถ้าหยุดกดเกิน 2 วินาที (ป้องกันคนบังเอิญกดโดน)
  clearTimeout(clickTimer)
  clickTimer = setTimeout(() => {
    secretCount.value = 0
  }, 2000)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
