# FROM ghcr.io/puppeteer/puppeteer:21.1.1

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#     PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN yarn install
# COPY . .
# CMD [ "node", "index.js" ]





# Use the Puppeteer base image
FROM ghcr.io/puppeteer/puppeteer:21.1.1

# Install Chrome
RUN apt-get update && apt-get -y install wget && \
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    dpkg -i google-chrome-stable_current_amd64.deb && \
    apt-get -y install -f && \
    rm google-chrome-stable_current_amd64.deb

# Set environment variables for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN yarn install

# Copy your application files
COPY . .

# Define the command to run your Node.js application
CMD [ "node", "index.js" ]

