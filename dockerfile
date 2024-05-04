FROM node:22.0.0 as builder

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run compile

FROM node:22.0.0-alpine 
WORKDIR /app
COPY package*.json .
RUN npm ci --only=production
COPY --from=builder /app/build ./build
COPY --from=builder /app/.env .

CMD [ "npm", "run", "start:prod" ]


