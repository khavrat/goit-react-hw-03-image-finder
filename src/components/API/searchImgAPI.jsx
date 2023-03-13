import axios from 'axios';
const URL = 'https://pixabay.com/api/';
const API_KEY = '33239789-edeb40e5557373312058accfd';

async function fetchImg() {
  try {
    const response = await axios.get(
      // `${URL}?q=rose&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      `${URL}?key=${API_KEY}&q=yellow+flowers&image_type=photo`
    );
    console.log('response :>> ', response);
  } catch (error) {
    console.error(error);
  }
}

fetchImg()