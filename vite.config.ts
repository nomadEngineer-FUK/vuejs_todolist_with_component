import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    // jest ライクなグローバルテスト API を有効化
    globals: true,
    // happy-dom で DOM をシミュレーションします
    // （peer dependency として happy-dom のインストールが必要です）
    environment: 'happy-dom'
  }
})
