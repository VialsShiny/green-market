# Node
FROM node:21-alpine

# Déf. du dossier de travail
WORKDIR /app

# Copie des packages
COPY package*.json ./

# Installation des Dépendences
RUN npm install

# Copier tous les fichiers (à la base du frontend)
COPY . .

# Définir le port
EXPOSE 5173

# Lancement du Server
CMD ["npm", "run", "dev"]