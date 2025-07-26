import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,     // 내부 IP로 접근 허용 (0.0.0.0과 동일)
    port: 3000,     // 포트 지정 (생략 가능, 기본은 5173)
    strictPort: true // 포트가 이미 사용 중이면 에러 발생 (선택사항)
  }
})
