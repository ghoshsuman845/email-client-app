export const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const date: Date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

export function getDataFromStorage(key: string): any[] {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}
  

  