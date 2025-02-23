import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  
  plugins: [react() , tailwindcss()],
  content: ["./src/**/*.{html,js,jsx}"],
  server:{port:5173},  
})
