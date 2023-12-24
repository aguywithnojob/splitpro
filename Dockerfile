FROM node:20-alpine

WORKDIR /splitwise-fe

COPY package-lock.json .

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

RUN npm install serve -g

WORKDIR ./build

EXPOSE 3000

# run serve into build folder
CMD ["serve"]