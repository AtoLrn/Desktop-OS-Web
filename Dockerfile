FROM node:19-alpine3.16 as build

WORKDIR /build

COPY . .

RUN npm install

RUN npm run build

ENTRYPOINT ["npm", "run", "preview"]