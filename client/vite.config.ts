import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{'process.env.SOCKET_URL':JSON.stringify(process.env.SOCKET_URL)}
})
