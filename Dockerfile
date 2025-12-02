FROM debian:buster-slim

RUN apt-get update && \
    apt-get install -y  ruby-dev build-essential zlib1g-dev libcurl4 curl
RUN curl -fsSL https://deb.nodesource.com/setup_21.x | bash -
RUN apt-get install -y nodejs
RUN gem install bundle
RUN apt-get clean

# Configure installed software
#RUN ln -s /usr/bin/nodejs /usr/bin/node && \
#    echo "daemon off;" >> /etc/nginx/nginx.conf
# Add configuration files & scripts




