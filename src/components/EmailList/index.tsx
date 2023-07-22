import { useEffect, useState } from "react";
import EmailOverview from "../EmailOverview";
import { formatDate, getDataFromStorage } from "../../utils/helpers";
import { FAVOURITE_EMAILS_LIST, READ_EMAIL_LIST, getAvatar } from "../../utils/constants";
import { Email, EmailData, EmailListProps } from "../../utils/types/type";
import ShimmerWidget from "../../components/ShimmerWidget";
import { getEmails } from "../../utils/services/api";
import Page500 from "../../components/Page500";


const EmailList: React.FC<EmailListProps> = ({ filters }) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [totalEmails , setTotalEmails] = useState<any>(0);
  const [emailData, setEmailData] = useState<EmailData>();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let avatar = "";

  if (emailData !== undefined) {
    avatar = getAvatar(emailData?.name);
  }

  const fetchEmailList = async (page: number) => {
    setIsLoading(true);
    try {
      const emailResponse = await getEmails(page);
      const fetchedEmails = await emailResponse.data;

      const readEmails = getDataFromStorage(READ_EMAIL_LIST);
      const favEmails = getDataFromStorage(FAVOURITE_EMAILS_LIST);

      const emailList = fetchedEmails.list.map((email: { id: string; }) => ({
        ...email,
        isRead: readEmails.includes(email.id),
        isFavourite: favEmails.includes(email.id),
        display: true,
      }));
      setEmails(emailList);
      setIsLoading(false);
      setTotalEmails(fetchedEmails.total);
    } catch (e) {
      setIsLoading(false)
      setIsError(true)
      console.error(e)
    }
  };


  useEffect(() => {
    fetchEmailList(page);
  }, [page]);

  const handlePagination = (newPage: number) => {
    setPage(newPage);
  };

  const renderPagination = (filters : any) => {   
    let itemsPerPage = 10;
    let totalPages = Math.ceil(totalEmails / itemsPerPage);

    if (totalPages <= 1) {
      // No need to show pagination if there's only one page
      return null;
    }

    const paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationButtons.push(
        <div
          key={i}
          onClick={() => handlePagination(i)}
          className={`pagination-num ${i === page ? "active" : ""}`}
        >
          {i}
        </div>
      );
    }

    return <div className="pagination">{paginationButtons}</div>;

  }

  const addEmailToFav = (id: string) => {
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

  if (isLoading) {
    return <ShimmerWidget />
  }

  if (!isLoading && Array.isArray(emailData) && emailData.length === 0) {
    return <div>No data to load</div>
  }

  if(isError){
    return <Page500/>;
  }

  return (
    <div className="email-list">
      <div className="email-overview">

        {emails && emails.length > 0
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
        {renderPagination(filters)}
      </div>


      <ShowEmailBodyAsPerFilters 
      emails={emails}
       avatar= {avatar}
       emailData={emailData} 
       addEmailToFav= {addEmailToFav}
       filters={filters}
       totalEmails={totalEmails}
      />
    </div>
  );

};


const ShowEmailBodyAsPerFilters = ({emails, filters, avatar,emailData, addEmailToFav, totalEmails}: any) => {
  const readEmails = getDataFromStorage(READ_EMAIL_LIST);
  const favEmails = getDataFromStorage(FAVOURITE_EMAILS_LIST)

  if ((filters.showFavourite && favEmails.length>0) || (filters.showRead && readEmails.length>0) || (filters.showUnread && readEmails.length !== totalEmails)) {
    return <ShowEmailBody 
    avatar= {avatar}
    emailData={emailData} 
    addEmailToFav= {addEmailToFav}
    />
  } 
  
  return  null;
}


const ShowEmailBody = ({avatar,emailData, addEmailToFav }: {avatar: string,emailData: EmailData, addEmailToFav: Function }) => {
 
  if(emailData?.body) {
    return (
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
              <div dangerouslySetInnerHTML={{ __html: emailData.body ?? '' }} />
            </div>
          </div>
    )
  }
  

  return null;
}

export default EmailList;
