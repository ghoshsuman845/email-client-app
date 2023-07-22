export interface EmailBody {
    body: string;
}

export interface EmailInfo {
    display: any;
    short_description: string;
    subject: string;
    isFavourite: boolean;
    date: string;
    from: {
        email: string;
        name: string;
    };
    isRead: boolean;
    id: string;
    isFavorite: boolean;
}

export interface EmailProps {
    emailBody: EmailBody;
    emailInfo: EmailInfo;
    setEmails: React.Dispatch<React.SetStateAction<Email[]>>;
    emails: Email[];   
}

export interface Email {
    display: boolean;
    date: string;
    id: string;
    from: {
        email: string;
        name: string;
    };
    isFavourite: boolean;
    isRead: boolean;
    short_description: string;
    subject: string;
}

export interface EmailOverviewProps {
    email: Email;
    setEmailData: Function;
    emails: Email[];
    setEmails: Function;
    emailData: any;
}

export interface FilterProps {
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    filters: Filters;
}

export interface Filters {
    showFavourite: boolean;
    showRead: boolean;
    showUnread: boolean;
}

export interface EmailData {
    isFavourite: boolean;
    isRead: boolean;
    display: boolean;
    id: string;
    body?: string;
    name: string;
    date: string;
}

export interface EmailListProps {
    filters: Filters;
}

export interface FavoriteParams {
    id: string;
    isFavorite: boolean;
  }




















































































































