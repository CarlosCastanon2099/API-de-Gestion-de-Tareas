# Usa una imagen ligera de Node.js
FROM node:18-alpine

# Establece entorno de producción
ENV NODE_ENV=production

# Directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia package.json y package-lock.json (si existe) para caché de dependencias
COPY package.json package-lock.json* ./

# Instala solo dependencias de producción
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto en el que corre la app
EXPOSE 3000

# Comando por defecto al iniciar el contenedor
CMD ["npm", "start"]