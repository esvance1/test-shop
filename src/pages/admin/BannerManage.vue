<template>
  <div class="max-w-4xl mx-auto p-6 mt-10">
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
      <h1 class="text-3xl font-bold text-gray-800">จัดการภาพสไลด์ (Banners)</h1>
    </div>

    <div
      :class="editingId ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-100'"
      class="rounded-xl shadow-md p-6 mb-8 border transition-colors"
    >
      <h2 class="text-lg font-bold mb-4 text-gray-800">
        {{
          editingId
            ? `กำลังแก้ไขภาพที่ ${editingIndex + 1}`
            : 'เพิ่มภาพโปรโมชันใหม่ (แนะนำขนาด 1200x400 px)'
        }}
      </h2>

      <div class="flex flex-col md:flex-row items-start md:items-center gap-4">
        <input
          type="file"
          ref="fileInput"
          @change="handleFileUpload"
          accept="image/*"
          class="flex-grow text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer"
        />

        <div class="flex gap-2 w-full md:w-auto">
          <button
            v-if="editingId"
            @click="cancelEdit"
            class="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-bold w-full md:w-auto transition-colors"
          >
            ยกเลิก
          </button>

          <button
            @click="saveBanner"
            :disabled="(!selectedFile && !editingId) || isUploading"
            class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold disabled:bg-gray-300 w-full md:w-auto transition-colors"
          >
            {{ isUploading ? 'กำลังบันทึก...' : editingId ? 'บันทึกการแก้ไข' : 'เพิ่มภาพสไลด์' }}
          </button>
        </div>
      </div>

      <div v-if="previewImage" class="mt-6 border-t pt-4 border-gray-200 border-dashed">
        <p class="text-sm font-semibold text-gray-500 mb-2">ภาพตัวอย่างที่จะแสดงผล:</p>
        <img
          :src="previewImage"
          class="w-full max-h-64 object-cover rounded-lg border-2 border-red-200 shadow-sm"
        />
      </div>
    </div>

    <h3 class="text-xl font-bold text-gray-800 mb-4 border-l-4 border-red-600 pl-3">
      ภาพสไลด์ปัจจุบัน
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="(banner, index) in banners"
        :key="banner._id"
        class="bg-white p-4 rounded-xl shadow-md border border-gray-100 relative group hover:border-red-300 transition-colors"
      >
        <div
          class="absolute top-6 left-6 bg-black/70 text-white px-3 py-1 rounded-br-lg rounded-tl-lg text-sm font-bold z-10 shadow-md"
        >
          รูปที่ {{ index + 1 }}
        </div>

        <img
          :src="`http://localhost:3000${banner.image}`"
          class="w-full h-48 object-cover rounded-lg"
        />

        <div
          class="absolute bottom-6 right-6 flex gap-2 transform scale-0 group-hover:scale-100 transition-transform origin-bottom-right"
        >
          <button
            @click="startEdit(banner, index)"
            class="bg-yellow-500 text-white p-2.5 rounded-full shadow-lg hover:bg-yellow-600"
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
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>

          <button
            @click="deleteBanner(banner._id, index)"
            class="bg-red-500 text-white p-2.5 rounded-full shadow-lg hover:bg-red-600"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        v-if="banners.length === 0"
        class="col-span-full text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300"
      >
        <p class="text-gray-500">ยังไม่มีภาพโปรโมชันในระบบ</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const banners = ref([])
const fileInput = ref(null) // อ้างอิงถึงช่อง input file
const selectedFile = ref(null)
const previewImage = ref(null)
const isUploading = ref(false)

// ตัวแปรสำหรับโหมดแก้ไข
const editingId = ref(null)
const editingIndex = ref(null)

const fetchBanners = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/banners')
    banners.value = res.data
  } catch (error) {
    console.error(error)
  }
}

// เมื่อกดเลือกรูป
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    previewImage.value = URL.createObjectURL(file) // สร้างพรีวิว
  }
}

// 💥 กดปุ่มแก้ไขรูปเดิม
const startEdit = (banner, index) => {
  editingId.value = banner._id
  editingIndex.value = index
  previewImage.value = `http://localhost:3000${banner.image}` // เอารูปเก่ามาโชว์เป็นพรีวิวก่อน
  selectedFile.value = null
  if (fileInput.value) fileInput.value.value = '' // ล้างช่องเลือกไฟล์
  window.scrollTo({ top: 0, behavior: 'smooth' }) // เลื่อนจอขึ้นไปข้างบนให้
}

// กดยกเลิกการแก้ไข
const cancelEdit = () => {
  editingId.value = null
  editingIndex.value = null
  previewImage.value = null
  selectedFile.value = null
  if (fileInput.value) fileInput.value.value = ''
}

// 💥 ฟังก์ชันรวม: เพิ่มรูปใหม่ หรือ อัปเดตรูปเดิม
const saveBanner = async () => {
  // ดักไว้เผื่อกดแก้ไขแต่ไม่ยอมเลือกรูปใหม่
  if (editingId.value && !selectedFile.value) {
    Swal.fire('แจ้งเตือน', 'กรุณาเลือกไฟล์รูปภาพใหม่ที่ต้องการเปลี่ยนครับ', 'warning')
    return
  }

  isUploading.value = true
  try {
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('image', selectedFile.value)

    // อัปโหลดไฟล์รูปไปเก็บก่อน
    const uploadRes = await axios.post('http://localhost:3000/api/upload', formData)
    const newImagePath = uploadRes.data.imagePath

    if (editingId.value) {
      // โหมด: แก้ไขรูปเดิม (PUT)
      await axios.put(
        `http://localhost:3000/api/banners/${editingId.value}`,
        { image: newImagePath },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      Swal.fire('สำเร็จ!', 'แก้ไขภาพสไลด์เรียบร้อยแล้ว', 'success')
    } else {
      // โหมด: เพิ่มรูปใหม่ (POST)
      await axios.post(
        'http://localhost:3000/api/banners',
        { image: newImagePath },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      Swal.fire('สำเร็จ!', 'เพิ่มภาพสไลด์ใหม่แล้ว', 'success')
    }

    cancelEdit() // ล้างฟอร์ม
    fetchBanners() // ดึงข้อมูลมาอัปเดตหน้าจอ
  } catch (error) {
    console.error(error)
    Swal.fire('ผิดพลาด', 'ไม่สามารถบันทึกภาพได้', 'error')
  } finally {
    isUploading.value = false
  }
}

// 💥 ใช้ SweetAlert2 ก่อนลบรูป
const deleteBanner = async (id, index) => {
  const result = await Swal.fire({
    title: `ลบรูปที่ ${index + 1}?`,
    text: 'คุณต้องการลบภาพสไลด์นี้ใช่หรือไม่?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#9ca3af',
    confirmButtonText: 'ใช่, ลบทิ้งเลย',
    cancelButtonText: 'ยกเลิก',
  })

  if (result.isConfirmed) {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:3000/api/banners/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      Swal.fire('ลบแล้ว!', 'ลบภาพสไลด์สำเร็จ', 'success')
      fetchBanners()
    } catch (error) {
      Swal.fire('ผิดพลาด', 'ไม่สามารถลบภาพได้', 'error')
    }
  }
}

onMounted(() => fetchBanners())
</script>
