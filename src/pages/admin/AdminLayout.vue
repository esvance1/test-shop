<template>
  <div class="flex h-screen bg-[#F4F7FE] font-sans overflow-hidden">
    <aside
      class="w-64 bg-white border-r border-gray-100 flex flex-col justify-between shadow-sm hidden md:flex"
    >
      <div>
        <div class="p-8 text-center border-b border-gray-50">
          <div
            class="w-20 h-20 mx-auto bg-gradient-to-tr from-red-500 to-red-400 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-4 ring-4 ring-red-50"
          >
            TS
          </div>
          <h2 class="font-bold text-gray-800 text-lg">ผู้ดูแลระบบ</h2>
          <p class="text-xs text-gray-400 mt-1">TEST SHOP ADMIN</p>
        </div>

        <nav class="p-4 space-y-2 mt-4">
          <router-link
            to="/admin/dashboard"
            class="flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold transition-all text-gray-400 hover:bg-gray-50 hover:text-red-500"
            active-class="bg-red-50 text-red-600 shadow-sm"
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
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
            Dashboard
          </router-link>

          <router-link
            to="/admin/products"
            class="flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold transition-all text-gray-400 hover:bg-gray-50 hover:text-red-500"
            active-class="bg-red-50 text-red-600 shadow-sm"
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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            เพิ่มสินค้าใหม่
          </router-link>

          <router-link
            to="/admin/banners"
            class="flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold transition-all text-gray-400 hover:bg-gray-50 hover:text-red-500"
            active-class="bg-red-50 text-red-600 shadow-sm"
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            แบนเนอร์
          </router-link>

          <router-link
            to="/admin/manage-users"
            class="flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold transition-all text-gray-400 hover:bg-gray-50 hover:text-red-500"
            active-class="bg-red-50 text-red-600 shadow-sm"
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            จัดการทีมงาน
          </router-link>
          <router-link
            to="/admin/logs"
            class="flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold transition-all text-gray-400 hover:bg-gray-50 hover:text-red-500"
            active-class="bg-red-50 text-red-600 shadow-sm"
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            ประวัติการใช้งาน
          </router-link>
        </nav>
      </div>

      <div class="p-6">
        <button
          @click="handleLogout"
          class="flex items-center gap-4 text-gray-400 hover:text-red-600 px-5 py-3.5 w-full rounded-2xl font-bold transition-all hover:bg-red-50"
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
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          ออกจากระบบ
        </button>
      </div>
    </aside>

    <main class="flex-1 overflow-y-auto p-8 lg:p-12">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()

const handleLogout = () => {
  Swal.fire({
    title: 'ออกจากระบบ?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#e21d48',
    cancelButtonColor: '#9ca3af',
    confirmButtonText: 'ออกจากระบบ',
    cancelButtonText: 'ยกเลิก',
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('token')
      router.push('/')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'ออกจากระบบเรียบร้อย',
        showConfirmButton: false,
        timer: 1500,
      })
    }
  })
}
</script>
