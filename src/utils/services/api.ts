import axios from 'axios';

const BASE_URL = 'https://flipkart-email-mock.now.sh';

export const getEmails = (page: number = 1) => axios.get(`${BASE_URL}/?page=${page}`);

export const getEmailBody = (id: string) => axios.get(`${BASE_URL}/?id=${id}`);

