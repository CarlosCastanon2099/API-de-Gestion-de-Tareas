ARG INSTALL_DEV=true

# Usa una imagen ligera de Node.js
FROM node:18-alpine

# Establece entorno de produccion
ENV NODE_ENV=production

# Directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia package.json y package-lock.json al contenedor
COPY package.json package-lock.json* ./

# Instalamos "jest": "^29.0.0"
RUN npm install --omit=dev jest@^29.0.0

# Github installs
RUN if [ "$INSTALL_DEV" = "true" ]; then \
      npm install; \
    else \
      npm install --omit=dev; \
    fi

# Instala los paquetes para documentacion
# RUN npm install swagger-jsdoc swagger-ui-express

# Copia el resto del codigo fuente
COPY . .

# Expone el puerto en el que corre la app
EXPOSE 3000

# Comando por defecto al iniciar el contenedor
CMD ["npm", "start"]