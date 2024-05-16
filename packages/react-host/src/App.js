import React from 'react';

const RemoteButton = React.lazy(() => import('home/Button'));

const App = () => (
  <div>
    <h1>MFed react-react</h1>
    <React.Suspense fallback="Loading Button">
      <RemoteButton />
    </React.Suspense>
  </div>
);

export default App;
