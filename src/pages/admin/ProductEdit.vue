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
        <h1 class="text-3xl font-bold text-gray-800">แก้ไขสินค้า</h1>
      </div>

      <div v-if="loading" class="text-center py-10 text-gray-500">กำลังดึงข้อมูลสินค้า...</div>

      <form v-else @submit.prevent="updateProduct" class="space-y-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">ชื่อสินค้า</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">รายละเอียดสินค้า</label>
          <textarea
            v-model="form.description"
            rows="4"
            class="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-500 outline-none"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">ราคา (บาท)</label>
          <input
            v-model="form.price"
            type="number"
            required
            class="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2"
            >รูปภาพสินค้า (เลือกใหม่ถ้าต้องการเปลี่ยน)</label
          >
          <input
            type="file"
            @change="handleFileUpload"
            accept="image/*"
            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-red-50 file:text-red-700"
          />

          <div v-if="previewImage" class="mt-4">
            <p class="text-sm text-gray-500 mb-2">พรีวิวรูปภาพ:</p>
            <img :src="previewImage" class="w-48 h-48 object-cover rounded-lg border shadow-sm" />
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
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg disabled:bg-gray-400 transition-colors"
          >
            {{ isSubmitting ? 'กำลังบันทึกข้อมูล...' : 'บันทึกการแก้ไข' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2' // 👈 นำเข้า SweetAlert2

const route = useRoute()
const router = useRouter()
const productId = route.params.id

const form = reactive({ name: '', description: '', price: '' })
const oldImage = ref('')
const selectedFile = ref(null)
const previewImage = ref(null)

const loading = ref(true)
const isSubmitting = ref(false)

// ดึงข้อมูลเก่ามาใส่ฟอร์ม
const fetchProduct = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/products/${productId}`)
    const data = response.data
    form.name = data.name
    form.description = data.description
    form.price = data.price
    oldImage.value = data.image
    if (data.image) previewImage.value = `http://localhost:3000${data.image}`
  } catch (err) {
    Swal.fire('ผิดพลาด', 'ไม่พบข้อมูลสินค้า', 'error')
    router.push('/admin/dashboard')
  } finally {
    loading.value = false
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    previewImage.value = URL.createObjectURL(file)
  }
}

// 💥 อัปเกรด: เด้งป๊อปอัปถามก่อนบันทึก
const updateProduct = async () => {
  // 1. เด้งถามความแน่ใจ
  const result = await Swal.fire({
    title: 'ยืนยันการแก้ไขข้อมูล?',
    text: 'ตรวจสอบข้อมูลให้ถูกต้องก่อนบันทึกนะครับ',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'ใช่, บันทึกเลย!',
    cancelButtonText: 'ยกเลิก',
  })

  // 2. ถ้ากดยืนยัน ถึงจะยิง API
  if (result.isConfirmed) {
    isSubmitting.value = true
    let finalImagePath = oldImage.value

    try {
      const token = localStorage.getItem('token')

      if (selectedFile.value) {
        const formData = new FormData()
        formData.append('image', selectedFile.value)
        const uploadRes = await axios.post('http://localhost:3000/api/upload', formData)
        finalImagePath = uploadRes.data.imagePath
      }

      await axios.put(
        `http://localhost:3000/api/products/${productId}`,
        {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          image: finalImagePath,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      // 3. แจ้งเตือนเมื่อสำเร็จแบบสวยๆ
      await Swal.fire({
        title: 'สำเร็จ!',
        text: 'แก้ไขข้อมูลสินค้าเรียบร้อยแล้ว',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      })

      router.push('/admin/dashboard')
    } catch (error) {
      console.error(error)
      Swal.fire('เกิดข้อผิดพลาด!', 'ไม่สามารถแก้ไขข้อมูลได้', 'error')
    } finally {
      isSubmitting.value = false
    }
  }
}

onMounted(() => {
  fetchProduct()
})
</script>
