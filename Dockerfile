# FROM ghcr.io/puppeteer/puppeteer:21.1.1

# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#     PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# WORKDIR /usr/src/app

# COPY package*.json ./
# RUN yarn install
# COPY . .
# CMD [ "node", "index.js" ]



# 
# Use the Puppeteer base image
FROM ghcr.io/puppeteer/puppeteer:21.1.1

# Install Chrome
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    hicolor-icon-theme \
    libcanberra-gtk* \
    libgl1-mesa-dri \
    libgl1-mesa-glx \
    libpangox-1.0-0 \
    libpulse0 \
    libv4l-0 \
    fonts-symbola \
    --no-install-recommends \
    && curl -sSL https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list \
    && apt-get update && apt-get install -y \
    google-chrome-stable \
    --no-install-recommends \
    && apt-get purge --auto-remove -y curl \
    && rm -rf /var/lib/apt/lists/*

# Add chrome user
RUN groupadd -r chrome && useradd -r -g chrome -G audio,video chrome \
    && mkdir -p /home/chrome/Downloads && chown -R chrome:chrome /home/chrome

# Copy local.conf file (adjust the path if necessary)
COPY ./local.conf /etc/fonts/local.conf

# Run Chrome as non-privileged user
USER chrome

# Autorun Chrome
ENTRYPOINT [ "google-chrome" ]
CMD [ "--user-data-dir=/data" ]

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



