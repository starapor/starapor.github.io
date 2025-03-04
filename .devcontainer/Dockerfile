FROM ruby:3.4-slim-bullseye

# Install required packages
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    build-essential \
    git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN groupadd --gid 1000 jekyll \
    && useradd --uid 1000 --gid jekyll --shell /bin/bash --create-home jekyll

# Install Jekyll and Bundler
RUN gem install jekyll bundler
RUN chown -R jekyll:jekyll /usr/local/bundle

# Set working directory
WORKDIR /workspace

# Set the default user
USER jekyll

# Expose port 4000 for Jekyll server
EXPOSE 4000 