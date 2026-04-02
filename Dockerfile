# Étape de build
FROM node:18-alpine AS build


WORKDIR /app

# Installer les dépendances de build
COPY package*.json ./
RUN npm ci

# Copier les fichiers nécessaires pour le build
COPY . .

# Builder l'application
RUN npm run build

# Étape de production
FROM node:18-alpine

WORKDIR /app

# Installer uniquement serve en production
RUN npm install -g serve

# Copier uniquement les fichiers nécessaires
COPY --from=build /app/.output /app/.output
COPY --from=build /app/public /app/public

# Définir les variables d'environnement
ENV NODE_ENV=production
ENV PORT=3000

# Exposer le port
EXPOSE 3000

# Démarrer l'application
CMD ["serve", "-p", "3000", "-s", ".output/public"]
