import React, { useState } from "react";

import { READ_EMAIL_LIST } from "../../utils/constants";
import { formatDate, getDataFromStorage } from "../../utils/helpers"; 
import { getEmailBody } from "../../utils/services/api";
import { getAvatar } from "../../utils/constants";
import { EmailOverviewProps } from "../../utils/types/type";

import ShimmerWidget from "../ShimmerWidget";

const EmailOverview: React.FC<EmailOverviewProps> = ({ email, setEmailData, emails, setEmails, emailData }) => {
  const { date, id, from, isFavourite, isRead, short_description, subject } =
    email;
  const { email: userEmail, name } = from;
  const imageUrl = getAvatar(name);
  const [isLoading, setIsLoading] = useState(false);

  const openEmail = async () =>  {

    try {
      const response = await getEmailBody(id)
      setEmailData({ ...response.data, name, date });
      setIsLoading(false)

      const readEmails = getDataFromStorage(READ_EMAIL_LIST);
      const updatedReadEmails = [...readEmails, id];
      sessionStorage.setItem(READ_EMAIL_LIST, JSON.stringify(updatedReadEmails));
      const emailsCopy = emails.slice();
      const index = emailsCopy.findIndex((email) => email.id === id);
      emailsCopy[index] = {
        ...emailsCopy[index],
        isRead: true,
      };
      setEmails(emailsCopy);

    } catch (e) {
        console.error(e)
    }

  }

  if (isLoading) {
    return <ShimmerWidget />
  }

  if (!isLoading && Array.isArray(emailData) && emailData.length === 0) {
    return <div>No data to load</div>
  }
  
  return (
    <div
      className={`email-wrapper  ${isRead ? "email-wrapper__read" : ""}`}
      onClick={openEmail}
      style={{ width: emailData?.body ? "30vw" : "" }}
    >
      <div className="image-wrapper">
        <img src={imageUrl} alt="avatar" />
      </div>
      <div className="email-content-wrapper">
        <div className="imp-details">
          <div>
            From:{" "}
            <span>
              {name} &lt;{userEmail}&gt;
            </span>
          </div>
          <div>
            Subject: <span>{subject}</span>
          </div>
        </div>
        <div>{short_description}</div>
        <div className="extra-details">
          <div className="date-time">{formatDate(date)}</div>
          {isFavourite ? <div className="fav-text"> Favorite </div> : ""}
        </div>
      </div>
    </div>
  );
}

export default EmailOverview;
