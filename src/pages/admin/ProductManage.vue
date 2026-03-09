<template>
  <div class="max-w-4xl mx-auto p-6 mt-10">
    <div class="bg-white rounded-2xl shadow-lg p-8">
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
        <h1 class="text-3xl font-bold text-gray-800">เพิ่มสินค้าใหม่ (Admin)</h1>
      </div>

      <form @submit.prevent="submitProduct" class="space-y-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2"
            >ชื่อสินค้า <span class="text-red-500">*</span></label
          >
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            placeholder="เช่น เสื้อยืดลายทาง"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">รายละเอียดสินค้า</label>
          <textarea
            v-model="form.description"
            rows="4"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            placeholder="อธิบายสรรพคุณสินค้าของคุณ..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2"
            >ราคา (บาท) <span class="text-red-500">*</span></label
          >
          <input
            v-model="form.price"
            type="number"
            required
            min="0"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
            placeholder="0"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">รูปภาพสินค้า</label>
          <input
            type="file"
            @change="handleFileUpload"
            accept="image/*"
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 transition-all"
          />
          <div v-if="previewImage" class="mt-4">
            <p class="text-sm text-gray-500 mb-2">พรีวิวรูปภาพ:</p>
            <img
              :src="previewImage"
              alt="Preview"
              class="w-48 h-48 object-cover rounded-lg border shadow-sm"
            />
          </div>
        </div>

        <div class="flex gap-4 pt-4">
          <button
            type="button"
            @click="$router.back()"
            class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg transition-colors"
          >
            ยกเลิก / ย้อนกลับ
          </button>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-gray-400"
          >
            {{ isSubmitting ? 'กำลังบันทึกข้อมูล...' : 'บันทึกสินค้า' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router' // 👈 นำเข้า router
import axios from 'axios'
import Swal from 'sweetalert2' // 👈 นำเข้า SweetAlert2

const router = useRouter() // 👈 เรียกใช้ router

// ตัวแปรสำหรับเก็บข้อมูลฟอร์ม
const form = reactive({
  name: '',
  description: '',
  price: '',
})

// ตัวแปรสำหรับจัดการไฟล์รูปภาพ
const selectedFile = ref(null)
const previewImage = ref(null)

// ตัวแปรสถานะการโหลด
const isSubmitting = ref(false)

// ฟังก์ชันเมื่อมีการเลือกไฟล์
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    previewImage.value = URL.createObjectURL(file)
  }
}

// 💥 อัปเกรด: เด้งป๊อปอัปถามก่อนบันทึก
const submitProduct = async () => {
  // 1. เด้งถามความแน่ใจก่อนเพิ่มสินค้า
  const result = await Swal.fire({
    title: 'ยืนยันการเพิ่มสินค้า?',
    text: 'ตรวจสอบข้อมูลให้ถูกต้องก่อนบันทึกนะครับ',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#e21d48', // สีแดง
    cancelButtonColor: '#9ca3af', // สีเทา
    confirmButtonText: 'ใช่, เพิ่มเลย!',
    cancelButtonText: 'ยกเลิก',
  })

  // 2. ถ้ากดยืนยัน ถึงจะยิง API
  if (result.isConfirmed) {
    isSubmitting.value = true
    let imagePath = ''

    try {
      if (selectedFile.value) {
        const formData = new FormData()
        formData.append('image', selectedFile.value)

        const uploadRes = await axios.post('http://localhost:3000/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        imagePath = uploadRes.data.imagePath
      }

      const productData = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        image: imagePath,
      }

      const token = localStorage.getItem('token')
      await axios.post('http://localhost:3000/api/products', productData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      // 3. แจ้งเตือนเมื่อสำเร็จ และเด้งกลับไปหน้า Dashboard อัตโนมัติ
      await Swal.fire({
        title: 'สำเร็จ!',
        text: 'เพิ่มสินค้าเรียบร้อยแล้ว',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      })

      router.push('/admin/dashboard') // เตะกลับไปหน้า Dashboard
    } catch (error) {
      console.error(error)
      Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง', 'error')
    } finally {
      isSubmitting.value = false
    }
  }
}
</script>
