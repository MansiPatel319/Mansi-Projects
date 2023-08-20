/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-console */
const axios = require('axios');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const webUrl = 'https://webapp.gochiso.jp';

app.get('/', function (request, response) {
  console.log('Home page visited!');
  const filePath = path.resolve(__dirname, '..', './build', 'index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    // replace the special strings with server generated strings
    data = data.replace(
      /\$OG_TITLE/g,
      '地図で探すサステナビリティアプリ | mamoru',
    );
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      'mamoru （まもる）は人や地球に優しいお店と出会い、よりサステナブルな生活をサポートする無料の地図アプリです。',
    );
    data = data.replace(/\$OG_URL/g, webUrl);
    data = data.replace(/\$OG_TYPE/g, 'website');
    result = data.replace(
      /\$OG_IMAGE/g,
      'https://app.mamoru.earth/og-image-jp.jpg',
    );
    response.send(result);
  });
});

app.get('/en/', function (request, response) {
  console.log('English Home page visited!');
  const filePath = path.resolve(__dirname, '..', './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(/\$OG_TITLE/g, 'mamoru | sustainable living app');
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      'mamoru is a map-based app that connects you to sustainability-focused businesses, products, and experiences to live a more sustainable life. The sustainable living app is available on iOs, Android, and Web.',
    );
    data = data.replace(/\$OG_URL/g, webUrl);
    data = data.replace(/\$OG_TYPE/g, 'website');
    result = data.replace(
      /\$OG_IMAGE/g,
      'https://app.mamoru.earth/og-image-en.jpg',
    );
    response.send(result);
  });
});

app.get('/jp/', function (request, response) {
  console.log('Japanese Home page visited!');
  const filePath = path.resolve(__dirname, '..', './build', 'index.html');
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    data = data.replace(
      /\$OG_TITLE/g,
      '地図で探すサステナビリティアプリ | mamoru',
    );
    data = data.replace(
      /\$OG_DESCRIPTION/g,
      'mamoru （まもる）は人や地球に優しいお店と出会い、よりサステナブルな生活をサポートする無料の地図アプリです。',
    );
    data = data.replace(/\$OG_URL/g, webUrl);
    data = data.replace(/\$OG_TYPE/g, 'website');
    result = data.replace(
      /\$OG_IMAGE/g,
      'https://app.mamoru.earth/og-image-jp.jpg',
    );
    response.send(result);
  });
});

app.get('/:lng/shop/:id', function (request, response) {
  console.log('Shop page visited!');

  axios
    .get(
      `https://staging.gochiso.jp/api/v2.0/get-restaurant-detail?restaurant_id=${request.params.id}&lang=${request.params.lng}`,
    )
    .then((resp) => {
      const filePath = path.resolve(__dirname, '..', './build', 'index.html');
      fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        }
        data = data.replace(/\$OG_TITLE/g, resp.data.data.restaurant.name);
        data = data.replace(
          /\$OG_DESCRIPTION/g,
          resp.data.data.restaurant.description,
        );
        data = data.replace(/\$OG_URL/g, webUrl + request.url);
        data = data.replace(/\$OG_TYPE/g, 'article');
        result = data.replace(
          /\$OG_IMAGE/g,
          resp.data.data.restaurant.cover_image,
        );
        response.send(result);
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.use(express.static(path.resolve(__dirname, '..', './build')));

app.get('*', function (request, response) {
  const filePath = path.resolve(__dirname, '..', './build', 'index.html');
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
