FROM node:18.19-alpine
WORKDIR /opt/fit-friends-bff
COPY ./dist/apps/bff/package.json .
RUN npm install --omit=dev
COPY ./dist/apps/bff .
COPY ./dist/apps/bff/assets/static ./static
CMD ["node", "main.js"]
