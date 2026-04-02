# Étape de build
FROM node:20-alpine AS build


WORKDIR /app

# Installer les dépendances de build
COPY package*.json ./
RUN npm ci

# Copier les fichiers nécessaires pour le build
COPY . .

# Builder l'application
RUN npm run build

# Étape de production
FROM node:20-alpine

WORKDIR /app

# Installer uniquement serve en production
RUN npm install -g serve

# Copier uniquement les fichiers nécessaires
COPY --from=build /app/.output /app/.output
COPY --from=build /app/public /app/public

# Définir les variables d'environnement
ENV NODE_ENV=production
ENV PORT=9005

# Exposer le port
EXPOSE 9005

# Démarrer l'application sur 0.0.0.0:9005
CMD ["serve", "-l", "9005", "-s", ".output/public"]
