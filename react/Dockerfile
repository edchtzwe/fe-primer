FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y curl xz-utils nano tree && rm -rf /var/lib/apt/lists/*

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

ENV NVM_DIR="/root/.nvm"
RUN . "$NVM_DIR/nvm.sh" && nvm install --lts && nvm use --lts

RUN echo 'alias ll="ls -la"' >> /root/.bashrc

WORKDIR /app
EXPOSE 5173 24678
