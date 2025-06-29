# --- ESTÁGIO 1: Build ---
  FROM node:18-alpine AS builder
  WORKDIR /usr/src/app
  COPY package.json package-lock.json ./
  RUN npm install
  
  COPY . .
  
  RUN npx prisma generate
  
  RUN npm run build
  
  
  # --- ESTÁGIO 2: Produção ---
  FROM node:18-alpine AS production
  WORKDIR /usr/src/app
  COPY --from=builder /usr/src/app/node_modules ./node_modules
  COPY --from=builder /usr/src/app/dist ./dist
  COPY --from=builder /usr/src/app/package.json ./package.json
  
  COPY --from=builder /usr/src/app/prisma ./prisma
  
  COPY --from=builder /usr/src/app/docker-entrypoint.sh .
  RUN chmod +x ./docker-entrypoint.sh
  
  ENTRYPOINT ["./docker-entrypoint.sh"]
  
  CMD ["node", "dist/main"]