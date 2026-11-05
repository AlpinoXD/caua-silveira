import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // no Windows o observador nativo dá EBUSY quando um editor segura o arquivo; a varredura evita a queda do servidor
  server: { watch: { usePolling: true, interval: 300 } },
});
