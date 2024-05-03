import React, { useEffect, useCallback } from 'react';
import Jotai from './Jotai';
// import RQuery from './RQuery';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient({});

export default ({ text = 'Home Button', onClick }) => {
  const onClickHandler = useCallback(() => {
    console.log(`Button.js: "${text}" clicked!`);
    onClick?.();
  }, [text, onClick]);

  useEffect(() => {
    console.log('Button.js: mounted.');
    return () => console.log('Button.js: unmounted.');
  }, []);

  console.log('Button.js: rendered.');

  return (
    <>
        <Jotai />
        {/* <RQuery /> */}
        <button onClick={onClickHandler}>{text}</button>
      {/* <QueryClientProvider client={queryClient}>  
      </QueryClientProvider> */}
    </>
  );
};
