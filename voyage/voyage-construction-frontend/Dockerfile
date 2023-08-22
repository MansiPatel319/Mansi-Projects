FROM node:16.11

ENV DEBIAN_FRONTEND=noninteractive
RUN wget -O - http://nginx.org/keys/nginx_signing.key | apt-key add - && \
echo "deb http://nginx.org/packages/debian/ buster nginx" | tee -a /etc/apt/sources.list && \
echo "deb-src http://nginx.org/packages/debian/ buster nginx" | tee -a /etc/apt/sources.list && \
apt-get update -y && \
apt-get install -y nginx supervisor && \
apt-get install -y nginx-extras && \
echo "daemon off;" >> /etc/nginx/nginx.conf && \
rm -rf /var/lib/apt/lists/*

WORKDIR /app

# take advantage of cached Docker layers
COPY package*.json ./
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG REACT_APP_BASE_URL=https://stg-app.voyagecontrol.com
ENV REACT_APP_BASE_URL $REACT_APP_BASE_URL

ARG REACT_APP_ADMIN_BASE_URL=https://stg-admin.voyagecontrol.com
ENV REACT_APP_ADMIN_BASE_URL $REACT_APP_ADMIN_BASE_URL

ARG REACT_APP_SIGNATURE_KEY=duv6ngxgva1xc0nw
ENV REACT_APP_SIGNATURE_KEY $REACT_APP_SIGNATURE_KEY

ARG REACT_APP_GOOGLE_API_KEY=AIzaSyD4GxRK92mdAeeaKzL06VpMkxLdNiR-HUo
ENV REACT_APP_GOOGLE_API_KEY $REACT_APP_GOOGLE_API_KEY
RUN npm install --location=global npm && npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["bash", "./docker/run.sh"]
