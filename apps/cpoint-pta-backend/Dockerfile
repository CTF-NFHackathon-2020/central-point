FROM node:10
# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build
CMD [ "node", "dist/main.js" ]