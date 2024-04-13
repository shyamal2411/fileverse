FROM --platform=linux/amd64 node:21.3.0-alpine3.18

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install -g npm@10.5.1

RUN npm install

# EXPOSE 80

CMD [ "npm", "start" ]
