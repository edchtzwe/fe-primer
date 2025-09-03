FROM debian:bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive

# Base tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    bash \
    ca-certificates \
    curl \
    git \
    nano \
    tree \
  && rm -rf /var/lib/apt/lists/*

# ll alias
RUN echo "alias ll='ls -alF --color=auto'" >> /etc/bash.bashrc

# nvm + latest Node.js and npm
ENV NVM_DIR=/usr/local/nvm
RUN mkdir -p "$NVM_DIR" \
  && curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash \
  && . "$NVM_DIR/nvm.sh" \
  && nvm install node \
  && nvm alias default node \
  && npm install -g npm@latest \
  && BIN_DIR="$NVM_DIR/versions/node/$(ls -1 "$NVM_DIR/versions/node" | sort -V | tail -n1)/bin" \
  && ln -s "$BIN_DIR/node" /usr/local/bin/node \
  && ln -s "$BIN_DIR/npm" /usr/local/bin/npm \
  && [ -f "$BIN_DIR/npx" ] && ln -s "$BIN_DIR/npx" /usr/local/bin/npx || true \
  && [ -f "$BIN_DIR/corepack" ] && ln -s "$BIN_DIR/corepack" /usr/local/bin/corepack || true

# Make nvm available in interactive shells
RUN printf '%s\n' \
  'export NVM_DIR="/usr/local/nvm"' \
  '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"' \
  '[ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"' \
  > /etc/profile.d/nvm.sh

WORKDIR /app

CMD ["sleep", "infinity"]
