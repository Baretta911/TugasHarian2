FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY .env .
COPY . .
EXPOSE 8080
ENV NODE_ENV=production
CMD ["node", "server.js"]
