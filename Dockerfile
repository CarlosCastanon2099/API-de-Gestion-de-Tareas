ARG INSTALL_DEV=false

# Usa una imagen ligera de Node.js
FROM node:18-alpine

# Establece entorno de produccion
ENV NODE_ENV=production

# Directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia package.json y package-lock.json al contenedor
COPY package.json package-lock.json* ./


# Github installs
RUN if [ "$INSTALL_DEV" = "true" ]; then \
      npm install; \
    else \
      npm install --omit=dev; \
    fi

# Copia el resto del codigo fuente
COPY . .

# Expone el puerto en el que corre la app
EXPOSE 3000

# Comando por defecto al iniciar el contenedor
CMD ["npm", "start"]