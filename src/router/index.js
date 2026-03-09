import { createRouter, createWebHistory } from 'vue-router'
import Swal from 'sweetalert2'

// --- Imports ของหน้าทั่วไป ---
import Home from '../pages/Home.vue'
import Products from '../pages/Products.vue'
import ProductDetail from '../pages/ProductDetail.vue'
import Contact from '../pages/Contact.vue'

// --- Imports ของหน้าแอดมิน ---
import AdminLogin from '../pages/admin/Login.vue'
import AdminLayout from '../pages/admin/AdminLayout.vue' // 💥 1. นำเข้ากรอบ Layout ที่เราเพิ่งสร้าง
import AdminDashboard from '../pages/admin/Dashboard.vue'
import AdminProductManage from '../pages/admin/ProductManage.vue'
import AdminProductEdit from '../pages/admin/ProductEdit.vue'
import AdminBanner from '../pages/admin/BannerManage.vue'
import About from '../pages/About.vue'

const routes = [
  // ==========================================
  // 🟢 โซนสาธารณะ (ใครก็เข้าได้)
  // ==========================================
  { path: '/', name: 'Home', component: Home },
  { path: '/products', name: 'Products', component: Products },
  { path: '/products/:id', name: 'ProductDetail', component: ProductDetail },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/about', name: 'About', component: About },

  // หน้า Login ของแอดมิน ปล่อยไว้โซนนี้เพราะยังไม่ต้องมีเมนูซ้ายมือ
  { path: '/admin/login', name: 'AdminLogin', component: AdminLogin },

  // ==========================================
  // 🔴 โซนหวงห้าม (Admin เท่านั้น + มีแถบเมนูด้านซ้าย)
  // ==========================================
  {
    path: '/admin',
    component: AdminLayout, // 💥 2. เรียกใช้กรอบโครงสร้างเป็นตัวหลัก
    meta: { requiresAuth: true }, // 💥 แปะป้ายห้ามเข้าที่ตัวแม่เลย (ลูกๆ จะโดนล็อคด้วยอัตโนมัติ)
    children: [
      // 💥 3. เอาหน้าย่อยๆ มาใส่ตรงนี้ (ตัดคำว่า /admin/ ข้างหน้าออก เพราะมันจะต่อจากตัวแม่)
      {
        path: 'dashboard', // จะกลายเป็น /admin/dashboard
        name: 'AdminDashboard',
        component: AdminDashboard,
      },
      {
        path: 'products', // จะกลายเป็น /admin/products
        name: 'AdminProductManage',
        component: AdminProductManage,
      },
      {
        path: 'products/edit/:id', // จะกลายเป็น /admin/products/edit/:id
        name: 'AdminProductEdit',
        component: AdminProductEdit,
      },
      {
        path: 'banners', // จะกลายเป็น /admin/banners
        name: 'AdminBanner',
        component: AdminBanner,
      },
      {
        path: 'manage-users', // จะกลายเป็น /admin/manage-users
        name: 'AdminManage',
        component: () => import('../pages/admin/AdminManage.vue'),
      },
      {
        path: 'logs',
        name: 'SystemLogs',
        component: () => import('../pages/admin/SystemLogs.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ==========================================
// 💥 สร้าง "ยามเฝ้าประตู" (สไตล์ Vue 3 ยุคใหม่)
// ==========================================
router.beforeEach((to, from) => {
  const isProtected = to.matched.some((record) => record.meta.requiresAuth)
  const token = localStorage.getItem('token')

  if (isProtected && !token) {
    Swal.fire({
      icon: 'error',
      title: 'หยุดนะ!',
      text: 'พื้นที่เฉพาะผู้ดูแลระบบ กรุณาเข้าสู่ระบบก่อนครับ',
      confirmButtonColor: '#e21d48',
    })

    // ถ้าแอบเข้าให้เตะไปหน้า Login ดีกว่าครับ จะได้ตรงจุดประสงค์
    return '/admin/login'
  }

  return true
})

export default router
