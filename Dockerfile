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

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
