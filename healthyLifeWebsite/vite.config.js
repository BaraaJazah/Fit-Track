import {
    defineConfig
} from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: [`resources/views/**/*`],
        }),
        tailwindcss(),
    ],
    server: {
        host: "192.168.3.2", // بدون http://
        port: 5173,
        strictPort: true,
        hmr: {
            host: "192.168.3.2",
        },
        cors: true,
    },
});
