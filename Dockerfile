FROM node


WORKDIR /usr/app


COPY package.json ./

RUN npm install

COPY . .

expose 3333

cmd ["npm", "run", "dev"]