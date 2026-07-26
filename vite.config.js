import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: './', 
  plugins: [react()],

  // 1. تثبيت المسارات (عشان متوهش في الـ Imports)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // 2. ضبط الـ Base لضمان إن Vercel تلاقي الملفات دايماً

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    
    // 3. تحسين الأداء (Code Splitting) - ده سر السرعة
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // بيفصل مكتبات الـ React والحاجات التقيلة في ملف لوحده
          }
        }
      }
    },
    minify: 'terser',
    reportCompressedSize: true, // عشان تشوف حجم الكود في الـ Terminal
    sourcemap: false
  },

  server: {
    port: 3000,
    open: true
  }
});