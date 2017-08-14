FROM quay.io/ivanvanderbyl/docker-nightmare:latest

ADD package.json /workspace
RUN yarn install

ADD src /workspace/src
