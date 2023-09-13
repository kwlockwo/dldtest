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

# Switch to root user temporarily for installations
USER root

# Update and install dependencies
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    hicolor-icon-theme \
    libcanberra-gtk* \
    libgl1-mesa-dri \
    libgl1-mesa-glx \
    libpango-1.0-0 \
    libpulse0 \
    libv4l-0 \
    fonts-symbola \
    --no-install-recommends

# Add Google Chrome Repository and Install Chrome
RUN curl -sSL https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list \
    && apt-get update && apt-get install -y \
    google-chrome-stable \
    --no-install-recommends

# Clean up unnecessary packages and cache
RUN apt-get purge --auto-remove -y curl \
    && rm -rf /var/lib/apt/lists/*

# Switch back to non-root user
USER chrome

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
