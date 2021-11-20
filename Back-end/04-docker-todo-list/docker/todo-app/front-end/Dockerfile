FROM node:14-alpine
WORKDIR /app
COPY ./ ./
ADD node_modules.tar.gz ./
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
