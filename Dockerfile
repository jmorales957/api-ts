# Establece la imagen base, por ejemplo, Node.js
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y yarn.lock al directorio de trabajo
COPY package.json yarn.lock ./

# Instala las dependencias del proyecto usando Yarn
RUN yarn install

# Copia el resto de los archivos de la API al directorio de trabajo del contenedor
COPY . .

# Compila el código TypeScript (si es necesario)
RUN yarn build

# Expone el puerto en el que la API va a escuchar (asegúrate de que coincida con el puerto que utiliza tu aplicación)
EXPOSE 3000

# Comando para iniciar la API cuando el contenedor se ejecute
CMD ["yarn", "start"]
