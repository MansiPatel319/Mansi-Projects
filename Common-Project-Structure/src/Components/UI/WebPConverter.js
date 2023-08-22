/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

const WebPConverter = ({
  src,
  fallback,
  type = 'image/webp',
  ...delegated
}) => (
  <picture>
    <source srcSet={src} type={type} />
    <img src={fallback} {...delegated} />
  </picture>
);
export default WebPConverter;
