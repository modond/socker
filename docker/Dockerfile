# DOCKER-VERSION 1.2.0
# METEOR-VERSION 1.0.0
FROM stackbrew/ubuntu:trusty

RUN apt-get update

### For latest Node
RUN apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:chris-lea/node.js
RUN apt-get update
RUN apt-get install -y build-essential nodejs
###

### For standard Ubuntu Node
#RUN apt-get install -y build-essential nodejs npm
#RUN ln -s /usr/bin/nodejs /usr/bin/node
###

# Install git and curl
RUN apt-get install -y git curl

# Make sure we have a directory for the application
RUN mkdir -p /var/www
RUN chown -R www-data:www-data /var/www

# Install fibers -- this doesn't seem to do any good, for some reason
RUN npm install -g fibers

# Install Meteor
RUN curl https://install.meteor.com/ |sh

# Install entrypoint
ADD entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod +x /usr/bin/entrypoint.sh

EXPOSE 80

VOLUME /var/www
ENTRYPOINT ["/usr/bin/entrypoint.sh"]
CMD []
