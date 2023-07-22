import { FilterProps } from "../../types/type";

const Filter : React.FC<FilterProps> = ({ setFilters, filters }) => {

  function updateFilters({
    showFavourite = false,
    showRead = false,
    showUnread = false,
  }) {
    setFilters({
      showFavourite,
      showRead,
      showUnread,
    });
  }
  function showFavorites() {
    updateFilters({ showFavourite: true });
  }

  function showReadEmails() {
    updateFilters({ showRead: true });
  }
  function showUnreadEmails() {
    updateFilters({ showUnread: true });
  }
  
  return (
    <div className="filter-options">
      <div className="filter-options__title">Filter By:</div>
      <button
        className={`filter-btn ${filters.showUnread ? "highlight-btn" : ""}`}
        onClick={showUnreadEmails}
      >
        Unread
      </button>
      <button
        className={`filter-btn ${filters.showRead ? "highlight-btn" : ""}`}
        onClick={showReadEmails}
      >
        Read
      </button>
      <button
        className={`filter-btn ${filters.showFavourite ? "highlight-btn" : ""}`}
        onClick={showFavorites}
      >
        Favorites
      </button>
    </div>
  );
};

export default Filter;
