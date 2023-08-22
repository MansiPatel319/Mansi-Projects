/* eslint-disable no-undef */
import { useEffect } from 'react';

const useOutsideClick = (ref:any, callback:any) => {
  const handleClick = (e: any) => {
    
    if (e && (e.target.className.includes("form-control-language__option") || e.target.className.includes('theme-btn'))) {
        e.preventDefault();
      
    }
    else {
      if (ref.current && !ref.current.contains(e.target)) {
    
        callback();
      
        }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useOutsideClick;
