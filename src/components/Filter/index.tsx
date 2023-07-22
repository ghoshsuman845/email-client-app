import { useEffect } from "react";
import { FilterProps } from "../../utils/types/type";

const Filter : React.FC<FilterProps> = ({ setFilters, filters }) => {

const updateFilters = ({
    showFavourite = false,
    showRead = false,
    showUnread = false,
  }) => {
    setFilters({
      showFavourite,
      showRead,
      showUnread,
    });
  }

  useEffect(() => {
    updateFilters({ showUnread: false });
  }, []);
  
  const showFavorites = () => {
    updateFilters({ showFavourite: true });
  }

  const showReadEmails = () => {
    updateFilters({ showRead: true });
  }
  const showUnreadEmails = () => {
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
