import React from 'react';
import { useRecoilState, RecoilRoot, atom } from 'recoil';

const counterState = atom({
  key: 'counterState',
  default: 0,
});

const RecoilCounter = () => {
  const [count, setCount] = useRecoilState(counterState);

  return (
    <div>
      <h1>Recoil</h1>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

const RecoilApp = () => (
  <RecoilRoot>
    <RecoilCounter />
  </RecoilRoot>
);

export default RecoilApp;
