FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Add node_modules/.bin to PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

EXPOSE 3001

CMD ["npm", "run", "dev"]