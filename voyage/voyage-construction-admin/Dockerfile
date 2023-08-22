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
ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

ARG REACT_APP_REST_API_URL=http://stg-app.voyagecontrol.com/api/v1/
ENV REACT_APP_REST_API_URL $REACT_APP_REST_API_URL

ARG REACT_APP_AUTH_API_URL=https://stg-app.voyagecontrol.com/api/auth/
ENV REACT_APP_AUTH_API_URL $REACT_APP_AUTH_API_URL

ARG REACT_APP_GOOGLE_API_KEY=AIzaSyD4GxRK92mdAeeaKzL06VpMkxLdNiR-HUo
ENV REACT_APP_GOOGLE_API_KEY $REACT_APP_GOOGLE_API_KEY

ARG REACT_APP_BASE_URL=http://stg-app.voyagecontrol.com
ENV REACT_APP_BASE_URL $REACT_APP_BASE_URL

RUN npm install --location=global npm && npm install && \
npm cache clean --force

COPY . .
RUN npm run build

EXPOSE 90 3000

CMD ["bash", "./docker/run.sh"]
