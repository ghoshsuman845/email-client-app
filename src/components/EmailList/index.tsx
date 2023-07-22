import { useEffect, useState } from "react";
import EmailOverview from "../EmailOverview/index";
import { formatDate, getDataFromStorage } from "../../utils/helpers";
import { FAVOURITE_EMAILS_LIST, READ_EMAIL_LIST, getAvatar} from "../../utils/constants";
import { Email, EmailData, EmailListProps } from "../../types/type";
import ShimmerWidget from "../ShimmerWidget";
import { getEmails } from "../../services/api";


const EmailList: React.FC<EmailListProps> = ({ filters }) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [emailData, setEmailData] = useState<EmailData>();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  let avatar = "";

  if(emailData !== undefined){
     avatar = getAvatar(emailData?.name);     
  }

  const fetchEmailList = async () => {
    setIsLoading(true);
    try {
      const emailResponse = await getEmails(page);
      const fetchedEmails = await emailResponse.data;      
      
      const readEmails = getDataFromStorage(READ_EMAIL_LIST);
      const favEmails = getDataFromStorage(FAVOURITE_EMAILS_LIST);
      const emailList = fetchedEmails.list.map((email: { id: any; }) => ({
        ...email,
        isRead: readEmails.includes(email.id),
        isFavourite: favEmails.includes(email.id),
        display: true,
      }));
      setEmails(emailList);
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      console.error(e)
    }
  };

  useEffect(() => {
    fetchEmailList();
  }, [page]);

  function addEmailToFav(id: string) {
    const favEmails = getDataFromStorage(FAVOURITE_EMAILS_LIST);
    const updatedFavEmails = [...favEmails, id];
    sessionStorage.setItem(FAVOURITE_EMAILS_LIST, JSON.stringify(updatedFavEmails));
    const emailsCopy = emails.slice();
    const index = emailsCopy.findIndex((email) => email.id === id);
    emailsCopy[index] = {
      ...emailsCopy[index],
      isFavourite: true,
    };
    setEmails(emailsCopy);
  }

  useEffect(() => {
    if (emails.length > 0) {
      let emailsCopy = [];
      if (filters.showFavourite) {
        emailsCopy = emails.map((email) => ({
          ...email,
          display: email.isFavourite,
        }));
      } else if (filters.showRead) {
        emailsCopy = emails.map((email) => ({
          ...email,
          display: email.isRead,
        }));
      } else if (filters.showUnread) {
        emailsCopy = emails.map((email) => ({
          ...email,
          display: !email.isRead,
        }));
      } else {
        emailsCopy = emails.map((email) => ({
          ...email,
          display: true,
        }));
      }
      setEmails(emailsCopy);
    }
  }, [filters]);

 if(isLoading){
  return <ShimmerWidget />
 }
 
 if(!isLoading && Array.isArray(emailData) && emailData.length === 0){
  return <div>No data to load</div>
 }
 
 return (
  <div className="email-list">
    <div className="email-overview">
      
    {emails.length > 0
      ? emails.map((email: Email) => {
          if (!email.display) return null;
          
          return (
            <EmailOverview
              key={email.id}
              email={email}
              setEmailData={setEmailData}
              emails={emails}
              setEmails={setEmails}
              emailData={emailData} 
            />
          );
        })
      : null}
      <div
      className="pagination"
      >
        <div
          onClick={() => setPage(1)}
          className="pagination-num"
        >
          1
        </div>
        <div className="pagination-num" onClick={() => setPage(2)}>2</div>
      </div>
    </div>
    {emailData?.body ? (
        <div className="email-body">
          <header className="header">
            <div className="avatar-wrapper">
              <img src={avatar} alt="avatar" />
              <h1 className="name">{emailData.name}</h1>
            </div>
            <button className="fav-btn" onClick={() => addEmailToFav(emailData.id)}>
              Mark As favorite
            </button>
          </header>
          <div className="email-body__content">
            <p className="date">{formatDate(emailData.date)}</p>
            <div dangerouslySetInnerHTML={{ __html: emailData.body }} />
          </div>
        </div>
      ) : null}
  </div>
);
    
};

export default EmailList;
