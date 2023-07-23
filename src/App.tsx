import React from 'react';
import AppRouter from "./AppRouter";

import './App.css';

const App: React.FC = () => {
  return (
    <div className="main-app">
        <AppRouter />
    </div>
  );
}

export default App;