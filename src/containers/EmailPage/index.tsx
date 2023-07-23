import React, { useState } from 'react';
import '../../App.css';
import EmailList from '../../components/EmailList';
import Filter from '../../components/Filter';

const EmailPage = () => {
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

export default EmailPage;
