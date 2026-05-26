# Step 1: Use an official Node runtime as a parent image
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the compiled Jenkins build files into the container
# (Adjust 'online-store' if your dist folder uses a different name)
COPY dist/online-store /app

# Step 4: Install a lightweight static file server to run the app
RUN npm install -g pm2

# Step 5: Expose the port the app runs on
EXPOSE 4000

# Step 6: Command to run the Angular SSR/server application
CMD ["pm2-runtime", "server/server.mjs"]