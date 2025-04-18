FROM node:latest
WORKDIR /app

RUN apt-get update && apt-get install -y sqlite3 libsqlite3-dev && rm -rf /var/lib/apt/lists/*

COPY package.json ./
RUN npm install --production
COPY . .
CMD ["node", "index.js"]