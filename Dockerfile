# Usa una imagen ligera de Node.js
FROM node:18-alpine

# Establece entorno de produccion
ENV NODE_ENV=production

# Directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia package.json y package-lock.json al contenedor
COPY package.json package-lock.json* ./

# Instala solo dependencias de produccion
RUN npm install

# Instala los paquetes para documentacion
RUN npm install swagger-jsdoc swagger-ui-express

# Copia el resto del codigo fuente
COPY . .

# Expone el puerto en el que corre la app
EXPOSE 3000

# Comando por defecto al iniciar el contenedor
CMD ["npm", "start"]