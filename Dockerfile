FROM node:lts-alpine as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine as runtime
COPY --from=builder /usr/src/app/build/ /usr/share/nginx/html
COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
