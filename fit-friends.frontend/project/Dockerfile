FROM node:18.19-alpine
WORKDIR /opt/fit-friends-frontend
COPY ./package.json .
RUN npm install --omit=dev
RUN npm install -g serve
COPY ./build ./build
CMD serve -s build
