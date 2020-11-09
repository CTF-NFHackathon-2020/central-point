FROM node:10 as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci 
COPY . .
RUN npm run build:prod

FROM nginx:alpine
COPY --from=build /usr/src/app/dist/cpoint-pta /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]