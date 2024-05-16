import React from 'react';
import RemoteComponent from './RemoteComponent';

// const RemoteButton = React.lazy(() => import('home/Button'));

const App = () => (
  <div>
    <h1>MFed react-react</h1>
    <RemoteComponent />
  </div>
);

export default App;
