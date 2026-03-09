/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', // 👈 บรรทัดนี้สำคัญมาก! ถ้าไม่มี Tailwind จะไม่ทำงานในไฟล์ Vue
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
