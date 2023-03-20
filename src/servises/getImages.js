import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33239789-edeb40e5557373312058accfd';
const perPage = '12';

export async function fetchImages(nextSearch, nextPage) {
  try {
    const response = await axios.get(
      `${BASE_URL}?q=${nextSearch}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}&page=${nextPage}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export { perPage };