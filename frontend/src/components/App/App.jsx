/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import RouteMenu from '../Routes/RouteMenu/RouteMenu';
import 'antd/dist/antd.min.css';

function App() {
  const [isLogo, setLogo] = useState(true);

  const handleShowLogo = (boolean) => {
    setLogo(boolean);
  };

  return (
    <RouteMenu
      isLogo={isLogo}
      handleShowLogo={handleShowLogo}
    />
  );
}

export default App;
