# Build Stage
FROM node:18 AS builder

WORKDIR /app
COPY . .
RUN npm install && npm run build --configuration production

# NGINX Stage
FROM nginx:alpine
COPY --from=builder /app/dist/* /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
