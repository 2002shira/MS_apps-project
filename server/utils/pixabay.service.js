import axios from 'axios';

const API_KEY = process.env.PIXABAY_KEY || '25540812-faf2b76d586c1787d2dd02736';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (category, page = 1, perPage = 9) => {
  const url = `${BASE_URL}?key=${API_KEY}&q=${category}&page=${page}&per_page=${perPage}`;
  const response = await axios.get(url);
  return response.data;
};