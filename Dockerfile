FROM node:8.12.0-alpine
#WORKDIR /app

#COPY package*.json ./
#COPY yarn.lock ./

#RUN yarn install

# copy project files and folders to the current working directory (i.e. 'app' folder)
#COPY . .

# build app for production with minification

#CMD [ "yarn", "start" ]
#EXPOSE 3000

RUN npm install webpack webpack-cli -g

WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/
RUN webpack

ENV NODE_ENV=production
ENV PORT=3000

CMD [ "npm", "start" ]
EXPOSE 3000
