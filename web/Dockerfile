FROM node:20 AS build
WORKDIR /app
COPY . .
COPY .env .env
RUN cat .env

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
