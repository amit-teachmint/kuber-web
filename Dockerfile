FROM node:14-alpine

WORKDIR /app

COPY . .

RUN npm install pm2@latest -g
CMD ['/bin/sh', 'start.sh']
