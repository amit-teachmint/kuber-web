FROM node:14-alpine

WORKDIR /app

COPY . .

RUN npm install pm2@latest -g
CMD ['pm2-runtime', 'start', 'src/App.js','--name kuber']
