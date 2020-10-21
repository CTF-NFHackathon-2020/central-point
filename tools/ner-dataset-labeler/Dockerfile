FROM node:12 as build-env

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM nginx:1.15

WORKDIR /app
COPY --from=build-env /app/dist/ /usr/share/nginx/html
COPY --from=build-env /app/nginx.conf /etc/nginx/conf.d/default.conf

