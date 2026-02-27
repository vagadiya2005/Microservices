FROM node:20-alpine AS base

ENV NODE_ENV=production

WORKDIR /app

FROM base AS deps

RUN apk add --no-cache libc6-compat

COPY package*.json ./

RUN npm ci --omit=dev && \
    npm cache clean --force

FROM base AS runner

RUN addgroup -S nodegroup && adduser -S nodeuser -G nodegroup

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN chown -R nodeuser:nodegroup /app

USER nodeuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', res => { process.exit(res.statusCode === 200 ? 0 : 1) })"

CMD ["node", "index.js"]