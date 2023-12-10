FROM node:18.19-alpine
WORKDIR /opt/fit-friends-users
COPY ./dist/apps/users/package.json .
RUN npm install --omit=dev
COPY ./dist/apps/users .
CMD ["node", "main.js"]
