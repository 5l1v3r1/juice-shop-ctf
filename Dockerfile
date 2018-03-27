FROM node:9

WORKDIR /juice-shop-ctf
RUN chown -R node .
USER node
COPY package*.json .
RUN npm install
COPY . .
RUN npm test && npm run e2e
VOLUME /data
WORKDIR /data

ENTRYPOINT ["npx", "/juice-shop-ctf/bin/juice-shop-ctf.js"]
