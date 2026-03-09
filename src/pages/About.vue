<template>
  <div class="bg-[#F8FAFC] pb-24 overflow-hidden font-sans">
    <section
      class="relative bg-white py-32 px-5 text-center overflow-hidden border-b border-gray-100"
    >
      <div class="absolute inset-0 flex justify-center items-center opacity-40 pointer-events-none">
        <div
          class="w-[500px] h-[500px] bg-gradient-to-tr from-red-100 to-red-50 rounded-full blur-[100px] animate-pulse"
        ></div>
      </div>

      <div class="relative z-10 max-w-4xl mx-auto">
        <div
          class="inline-flex items-center gap-2 bg-red-50 text-red-600 text-xs font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full mb-8 shadow-sm"
        >
          <span class="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
          The Story of Us
        </div>
        <h1
          class="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight leading-tight"
        >
          เราคือ
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400"
            >TEST SHOP</span
          >
        </h1>
        <p class="text-gray-500 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto font-medium">
          คัดสรรทุกความสมบูรณ์แบบ เพื่อส่งมอบประสบการณ์ช็อปปิ้งที่เหนือกว่า ในแบบที่คุณคู่ควร
        </p>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-5 py-24">
      <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div class="relative group mx-auto w-full max-w-lg lg:max-w-none">
          <div
            class="absolute -inset-4 bg-gradient-to-tr from-red-100 to-transparent rounded-[3rem] transform -rotate-3 group-hover:rotate-0 transition-transform duration-700 ease-out opacity-70"
          ></div>
          <div
            class="relative rounded-[2.5rem] overflow-hidden shadow-2xl bg-white border-8 border-white"
          >
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="ทีมงาน Test Shop"
              class="w-full object-cover aspect-[4/5] lg:aspect-square group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div
              class="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white flex items-center gap-4"
            >
              <div
                class="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center font-black text-xl"
              >
                #1
              </div>
              <div>
                <p class="text-xs text-gray-400 font-bold uppercase">Trusted By</p>
                <p class="text-gray-800 font-black">10,000+ Customers</p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-center">
          <h2 class="text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
            ทำไมต้อง
            <span class="text-red-600 relative inline-block">
              เลือกเรา?
              <svg
                class="absolute w-full h-3 -bottom-1 left-0 text-red-200"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="3" fill="none" />
              </svg>
            </span>
          </h2>

          <div class="space-y-6 text-gray-600 text-lg leading-relaxed mb-12">
            <p>
              TEST SHOP ถือกำเนิดขึ้นจากความเชื่อที่ว่า "ทุกคนสมควรได้รับสินค้าที่ดีที่สุด
              ในราคาที่จับต้องได้" เราจึงทุ่มเทเวลาในการคัดกรองสินค้าทุกชิ้นก่อนถึงมือคุณ
            </p>
            <p>
              ด้วยระบบหลังบ้านอัจฉริยะ และทีมงานซัพพอร์ตที่พร้อมดูแลคุณตลอด 24 ชั่วโมง
              ทำให้ทุกการสั่งซื้อของคุณ ไม่ใช่แค่การจ่ายเงิน แต่คือการซื้อ "ความสบายใจ"
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div
                class="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-black text-gray-900 mb-2">ของแท้ 100%</h3>
              <p class="text-gray-500 text-sm leading-relaxed">
                รับประกันคุณภาพ ยินดีคืนเงินหากพบสินค้าลอกเลียนแบบ
              </p>
            </div>

            <div
              class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div
                class="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-7 w-7"
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
              <h3 class="text-xl font-black text-gray-900 mb-2">ส่งไว ดั่งสายฟ้า</h3>
              <p class="text-gray-500 text-sm leading-relaxed">
                แพ็คของทันที จัดส่งทุกวัน ไม่มีวันหยุด รอรับหน้าบ้านได้เลย
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-5 mt-10">
      <div
        class="bg-gradient-to-br from-gray-900 to-black rounded-[3rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden group"
      >
        <div
          class="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] group-hover:bg-red-600/30 transition-colors duration-700"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"
        ></div>

        <div class="relative z-10">
          <h2 class="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            พร้อมที่จะยกระดับ<br />ไลฟ์สไตล์ของคุณแล้วหรือยัง?
          </h2>
          <p class="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            เข้ามาร่วมเป็นส่วนหนึ่งกับครอบครัว TEST SHOP และค้นพบไอเทมชิ้นโปรดที่รอคุณอยู่
          </p>

          <router-link
            to="/products"
            class="inline-flex items-center gap-3 bg-white text-gray-900 font-extrabold text-lg px-10 py-5 rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300"
          >
            ไปช็อปปิ้งกันเลย
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-red-600"
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
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// (เผื่ออนาคตอยากใส่แอนิเมชันตอน Scroll เพิ่ม ก็สามารถใช้ onMounted โหลดไลบรารี AOS หรือ GSAP ตรงนี้ได้ครับ)
onMounted(() => {
  window.scrollTo(0, 0) // ทำให้ชัวร์ว่าเข้าหน้านี้แล้วเด้งไปบนสุด
})
</script>
