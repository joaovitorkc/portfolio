# Stage 1
FROM node:20 AS builder

WORKDIR /opt/app

COPY ./package* ./

RUN npm ci

COPY ./src ./src

COPY ./public ./public

COPY ./*.config.*s ./

COPY ./tsconfig.json ./

ARG NEXT_PUBLIC_API_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

# Stage 2
FROM node:20 AS release

WORKDIR /opt/app

COPY ./package* ./

RUN npm ci --production

COPY --from=builder /opt/app/.next ./.next

COPY ./public ./public

CMD ["npm", "run", "start"]
