FROM node:10.16.0-alpine

WORKDIR /app 

COPY package.json package.json 

RUN npm install --production

COPY . . 

EXPOSE 3000 

RUN npm install pm2 -g 

## THE LIFE SAVER
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

RUN pm2 install pm2-logrotate

CMD /wait && pm2 start lotteryStore.json && pm2 logs
