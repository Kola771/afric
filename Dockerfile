# Étape de build
FROM node:20-alpine AS build

WORKDIR /app

# Installer les dépendances de build
COPY package*.json ./
RUN npm ci

# Copier les fichiers nécessaires pour le build
COPY . .

# Builder l'application en mode SSR
RUN npm run build

# Étape de production
FROM node:20-alpine

WORKDIR /app

# Copier les fichiers générés par le build
COPY --from=build /app/.output /app/.output
COPY --from=build /app/package*.json ./

# Installer les dépendances de production
RUN npm ci --only=production

# Définir les variables d'environnement
ENV NODE_ENV=production
ENV PORT=9005

# Exposer le port
EXPOSE 9005

# Démarrer le serveur Nuxt en mode SSR
CMD ["node", ".output/server/index.mjs"]