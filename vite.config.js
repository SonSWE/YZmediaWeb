import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": `"${mode}"`,
}
})
