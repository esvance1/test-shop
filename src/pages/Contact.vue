<template>
  <div class="bg-[#F8FAFC] min-h-screen pb-20 overflow-hidden font-sans">
    <section class="relative pt-24 pb-12 px-5 text-center">
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full opacity-30 pointer-events-none"
      >
        <div
          class="absolute top-10 left-10 w-72 h-72 bg-red-400 rounded-full blur-[80px] animate-pulse"
        ></div>
        <div
          class="absolute top-20 right-10 w-72 h-72 bg-red-200 rounded-full blur-[80px] animate-pulse"
          style="animation-delay: 1s"
        ></div>
      </div>

      <div class="relative z-10 max-w-2xl mx-auto">
        <div
          class="inline-flex items-center gap-2 bg-red-50 text-red-600 text-xs font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full mb-6 shadow-sm border border-red-100"
        >
          <span class="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
          Get in touch
        </div>
        <h1 class="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          ติดต่อ
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400"
            >TEST SHOP</span
          >
        </h1>
        <p class="text-lg text-gray-500 max-w-xl mx-auto font-medium leading-relaxed">
          มีข้อสงสัย สอบถามรายละเอียดสินค้า หรือต้องการสั่งซื้อ
          เรามีทีมแอดมินพร้อมดูแลและให้บริการคุณในทุกช่องทางครับ
        </p>
      </div>
    </section>

    <section class="max-w-7xl mx-auto px-5">
      <div
        class="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(220,38,38,0.05)] p-4 border border-gray-100/50 relative z-10"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="bg-gray-50/50 rounded-[2.5rem] p-8 md:p-12 border border-gray-100">
            <h2 class="text-2xl font-black text-gray-800 mb-8 flex items-center gap-3">
              <span class="w-2 h-8 bg-red-600 rounded-full"></span>
              ช่องทางการติดต่อ
            </h2>

            <div class="space-y-5">
              <div
                @click="copyPhone"
                class="flex items-center gap-5 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-red-200 hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                ></div>
                <div
                  class="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 relative z-10"
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div class="relative z-10 flex-grow">
                  <p class="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">
                    เบอร์โทรศัพท์ (คลิกเพื่อคัดลอก)
                  </p>
                  <p
                    class="text-2xl font-black text-gray-800 group-hover:text-red-600 transition-colors"
                  >
                    080-123-4567
                  </p>
                </div>
              </div>

              <div
                @click="openLine"
                class="flex items-center gap-5 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#00B900]/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-[#00B900]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                ></div>
                <div
                  class="w-16 h-16 bg-[#00B900]/10 text-[#00B900] rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-[#00B900] group-hover:text-white transition-colors duration-300 relative z-10"
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
                </div>
                <div class="relative z-10">
                  <p class="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">
                    LINE Official
                  </p>
                  <p
                    class="text-xl font-black text-gray-800 group-hover:text-[#00B900] transition-colors"
                  >
                    @yourlineid
                  </p>
                </div>
              </div>

              <div
                @click="openFacebook"
                class="flex items-center gap-5 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#1877F2]/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-r from-[#1877F2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                ></div>
                <div
                  class="w-16 h-16 bg-[#1877F2]/10 text-[#1877F2] rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-[#1877F2] group-hover:text-white transition-colors duration-300 relative z-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2C6.477 2 2 6.145 2 11.259c0 2.915 1.531 5.489 3.896 7.152v3.31l3.551-1.956c.823.23 1.687.354 2.553.354 5.523 0 10-4.145 10-9.259S17.523 2 12 2zm1.096 12.605l-2.79-2.983-5.454 2.983 5.978-6.362 2.83 2.983 5.412-2.983-5.976 6.362z"
                    />
                  </svg>
                </div>
                <div class="relative z-10">
                  <p class="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">
                    Facebook Fanpage
                  </p>
                  <p
                    class="text-xl font-black text-gray-800 group-hover:text-[#1877F2] transition-colors"
                  >
                    Test Shop Official
                  </p>
                </div>
              </div>
            </div>

            <div
              class="mt-12 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden"
            >
              <div class="absolute right-0 top-0 w-24 h-24 bg-red-50 rounded-bl-full -z-0"></div>
              <h3 class="text-lg font-black text-gray-800 mb-4 relative z-10">⏰ เวลาทำการ</h3>
              <ul class="space-y-3 relative z-10">
                <li class="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span class="text-gray-500 font-medium">จันทร์ - ศุกร์</span>
                  <span class="font-bold text-gray-800 bg-gray-50 px-3 py-1 rounded-lg"
                    >09:00 - 18:00 น.</span
                  >
                </li>
                <li class="flex justify-between items-center">
                  <span class="text-gray-500 font-medium">เสาร์ - อาทิตย์</span>
                  <span class="font-bold text-red-600 bg-red-50 px-3 py-1 rounded-lg"
                    >10:00 - 17:00 น.</span
                  >
                </li>
              </ul>
            </div>
          </div>

          <div
            class="relative h-96 lg:h-auto min-h-[400px] lg:min-h-[600px] bg-gray-200 rounded-[2.5rem] overflow-hidden shadow-inner group"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.8427027473775!2d100.5312383148301!3d13.72793139036329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f2bb0000001%3A0x6b4db92a0000000!2sSiam%20Paragon!5e0!3m2!1sth!2sth!4v1680000000000!5m2!1sth!2sth"
              class="absolute inset-0 w-full h-full border-0 filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            >
            </iframe>

            <div class="absolute bottom-6 left-1/2 -translate-x-1/2">
              <a
                href="https://goo.gl/maps/YOUR_MAP_LINK"
                target="_blank"
                class="flex items-center gap-2 bg-gray-900/90 backdrop-blur-md hover:bg-red-600 text-white font-bold px-6 py-3 rounded-full shadow-xl transition-colors duration-300"
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                เปิด Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2' // 👈 นำเข้าเพื่อทำป๊อปอัปสวยๆ

const openLine = () => {
  window.open('https://line.me/ti/p/~YOUR_LINE_ID', '_blank')
}

const openFacebook = () => {
  window.open('https://m.me/YOUR_PAGE_NAME', '_blank')
}

// 💥 ลูกเล่นคัดลอกเบอร์โทรศัพท์
const copyPhone = () => {
  const phoneNumber = '080-123-4567'
  navigator.clipboard.writeText(phoneNumber).then(() => {
    // โชว์แจ้งเตือนสุดน่ารักมุมขวาบน
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'คัดลอกเบอร์โทรศัพท์แล้ว!',
      text: phoneNumber,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      background: '#fff',
      color: '#1f2937',
      iconColor: '#dc2626',
    })
  })
}
</script>
