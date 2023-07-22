export const READ_EMAIL_LIST = "readEmailsList";
export const FAVOURITE_EMAILS_LIST = "favouriteEmailsList";
const AVATAR_BASE_URL = 'https://ui-avatars.com/api';
export const getAvatar = (name: string) => `${AVATAR_BASE_URL}/?name=${name}&length=1&background=E54065&rounded=true&color=fff&size=50`;
