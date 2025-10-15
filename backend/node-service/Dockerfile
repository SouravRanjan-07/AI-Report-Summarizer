FROM node:18-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --silent
COPY src ./src
RUN mkdir -p src/storage/uploads
EXPOSE 5000
CMD ["node", "src/index.js"]
