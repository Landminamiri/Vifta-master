FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY client/package*.json ./client/
COPY client/package-lock.json ./client/
COPY client/public ./client/public/
COPY client/src ./client/src/

WORKDIR /app/client
RUN npm install


WORKDIR /app

COPY /package*.json ./
COPY /package-lock.json ./

RUN npm install

COPY . .

EXPOSE 5000

ENV MONGO_URL=mongodb+srv://admin:admin@orogentech.13iak3x.mongodb.net/?retryWrites=true&w=majority

CMD ["npm", "run", "server"]