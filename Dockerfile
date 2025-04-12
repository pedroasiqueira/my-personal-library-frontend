# Etapa 1 - Build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY .env .env
RUN npm install

COPY . .

RUN npm run build

# Etapa 2 - Servidor nginx para servir os arquivos estáticos
FROM nginx:alpine

# Copia o build do React para o nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copia configuração customizada do nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3001

CMD ["nginx", "-g", "daemon off;"]
