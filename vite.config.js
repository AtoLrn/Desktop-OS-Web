import { defineConfig } from 'vite'
import fs from "vite-plugin-fs";

import eslint from 'vite-plugin-eslint'

export default defineConfig({
    plugins: [eslint(), fs()],
    server: {
        port: 3000,
        host: "0.0.0.0"
    }
})
