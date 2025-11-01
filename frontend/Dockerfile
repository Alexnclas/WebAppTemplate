FROM node:alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable

RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

COPY --from=build /app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf.template /etc/nginx/conf.d/nginx.conf.template

EXPOSE 80
CMD envsubst '$BACKEND_URL' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf && nginx -g "daemon off;"
# CMD ["nginx", "-g", "daemon off;"]