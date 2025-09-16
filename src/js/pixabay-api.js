import axios from 'axios';

export async function getImagesByQuery(query, page = 1) {
  const BASE_URL = 'https://pixabay.com';
  const API_KEY = '52284043-e07dc2496c8ab93aaf5c906d1';
  const END_POINT = '/api/';
  const params = {
    key: API_KEY,
    q: query,
    page,
    per_page: 15,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  };

  const response = await axios.get(`${BASE_URL}${END_POINT}`, { params });
  return response.data.hits;
}
