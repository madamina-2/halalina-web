# Menggunakan base image yang ringan
FROM node:18-alpine

# Mengatur direktori kerja
WORKDIR /app


# Salin semua file proyek ke dalam container
COPY . .


# Instal dependensi
RUN npm install

# Build aplikasi untuk mode produksi
RUN npm run build

# Instal `serve` untuk melayani file statis
RUN npm install -g serve

# Ekspos port untuk aplikasi
EXPOSE 3000

# Command untuk menjalankan aplikasi dalam mode produksi
CMD ["serve", "-s", "dist", "-l", "3000"]