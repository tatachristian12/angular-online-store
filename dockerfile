FROM node:20-alpine

WORKDIR /app

# Copy the build output distribution folder
COPY dist/online-store /app

# Expose the default Angular SSR port
EXPOSE 4000

# Force the environment variables directly at system level
ENV HOST=0.0.0.0
ENV PORT=4000

# Execute using native node instead of pm2-runtime
CMD ["node", "server/server.mjs"]