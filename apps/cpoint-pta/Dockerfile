FROM node:10 as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci 
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /usr/src/app/dist/cpoint-pta /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]