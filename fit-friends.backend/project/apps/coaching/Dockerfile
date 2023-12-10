FROM node:18.19.0-slim
RUN apt-get update && apt-get install -y openssl libssl-dev

WORKDIR /opt/fit-friends-coaching
COPY ./dist/apps/coaching/package.json .
RUN npm install --omit=dev

COPY ./dist/apps/coaching/assets/prisma/schema.prisma ./schema.prisma

RUN npx prisma@5.4.1 generate --schema schema.prisma

COPY ./dist/apps/coaching .
CMD ["node", "main.js"]

