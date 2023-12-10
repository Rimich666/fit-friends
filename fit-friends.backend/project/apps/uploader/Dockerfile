FROM node:18.19-alpine
WORKDIR /opt/fit-friends-uploader
COPY ./dist/apps/uploader/package.json .
RUN npm install --omit=dev
COPY ./dist/apps/uploader .
CMD ["node", "main.js"]
