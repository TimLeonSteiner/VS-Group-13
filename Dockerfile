FROM node:current

WORKDIR /home/node

# 1) Copy package manifests and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# 2) Copy your app’s source code
COPY . .

# 3) Tell Docker which port your app listens on
EXPOSE 3002

# 4) Define the default command to run your app
CMD ["npm", "start"]
