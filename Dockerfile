# Build stage
# - We start with the node:14-alpine base image for the build stage.
# -node:alpine uses the Alpine Linux distribution, which uses a different package manager called apk.
FROM node:14.17-alpine AS build 
RUN apk update && \
    apk add --no-cache curl git
WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install
RUN yarn add --dev @nuxt/image
COPY . .
RUN yarn build
RUN yarn generate

# Production stage
# -We switch to the nginx:alpine base image for the production stage.
# -We copy the built application files from the build stage to the /usr/share/nginx/html directory in the production image.
# -We expose port 80 to allow incoming HTTP traffic.
# -We start the Nginx server in the foreground with CMD ["nginx", "-g", "daemon off;"].
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
