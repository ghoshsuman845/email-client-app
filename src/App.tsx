import React, { useEffect, useState } from 'react';
import EmailList from './components/EmailList';
import './App.css';
import Filter from './components/Filter';

import './App.css';

const App: React.FC = () => {
  const [filters, setFilters] = useState({
    showFavourite: false,
    showUnread: false,
    showRead: false,
  });
  return (
    <div className="app">
      <Filter filters={filters} setFilters={setFilters} />
      <EmailList filters={filters} />
    </div>
  );
}

export default App;