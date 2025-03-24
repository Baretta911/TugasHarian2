# Gunakan image Node.js sebagai base image
FROM node:18-alpine AS build

# Set work directory di dalam container
WORKDIR /app

# Copy file package.json dan package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy seluruh project ke dalam container
COPY . .

# Build aplikasi React
RUN npm run build

# Gunakan Nginx sebagai web server
FROM nginx:alpine

# Copy build React ke dalam folder Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 agar bisa diakses
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
