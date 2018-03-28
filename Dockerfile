FROM node:9 as installer
WORKDIR /juice-shop-ctf
COPY package*.json .
RUN npm install --production --unsafe-perm

FROM node:9-alpine
ARG BUILD_DATE
ARG VCS_REF
LABEL maintainer="Bjoern Kimminich <bjoern.kimminich@owasp.org>" \
      org.label-schema.name="OWASP Juice Shop CTF-Extension" \
      org.label-schema.description="Capture-the-Flag (CTF) environment setup tools for OWASP Juice Shop" \
      org.label-schema.vendor="Open Web Application Security Project" \
      org.label-schema.url="http://owasp-juice.shop" \
      org.label-schema.usage="http://help.owasp-juice.shop/part1/ctf.html" \
      org.label-schema.license="MIT" \
      org.label-schema.version="4.1.0-SNAPSHOT" \
      org.label-schema.docker.cmd="docker run -ti --rm -v $(pwd):/data bkimminich/juice-shop-ctf" \
      org.label-schema.docker.params="config=string name of configuration file,output=string name of generated output file" \
      org.label-schema.vcs-url="https://github.com/bkimminich/juice-shop-ctf.git" \
      org.label-schema.vcs-ref=$VCS_REF \
      org.label-schema.build-date=$BUILD_DATE \
      org.label-schema.schema-version="1.0.0-rc1"
COPY --from=installer . .
VOLUME /data
WORKDIR /data

ENTRYPOINT ["npx", "/juice-shop-ctf/bin/juice-shop-ctf.js"]
