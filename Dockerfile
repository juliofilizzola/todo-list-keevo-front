FROM node:18-alpine

WORKDIR /react-vite-app

COPY package.json yarn.lock ./
RUN yarn install --silent
EXPOSE 4000
COPY . ./

CMD ["yarn", "run", "dev"]