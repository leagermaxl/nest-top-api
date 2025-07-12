FROM node:20-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN yarn
ADD . .
RUN yarn run build
RUN yarn --production
CMD [ "node", "./dist/main.js" ]