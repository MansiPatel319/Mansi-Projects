/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import { useEffect, useState } from 'react';

const useCheckScreen = () => {
  const [device, setDevice] = useState(
    navigator.maxTouchPoints ? 'mobile' : 'computer',
  );
  const [orientation, setOrientation] = useState(
    window.matchMedia('(orientation: portrait)').matches
      ? 'portrait'
      : 'landscape',
  );
  const detect = () => {
    setDevice(navigator.maxTouchPoints ? 'mobile' : 'computer');
    setOrientation(
      window.matchMedia('(max-width: 1024px)').matches
        ? 'portrait'
        : 'landscape',
    );
  };

  useEffect(() => {
    window.addEventListener('resize', detect);
  }, []);
  const isMobile =
    (window.innerWidth < 1024
      ||
     orientation === 'portrait');
  return { device, orientation, isMobile };
};
export default useCheckScreen;
