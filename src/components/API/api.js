import axios from "axios";

const URL = 'https://pixabay.com/api/';
const API_KEY = '33239789-edeb40e5557373312058accfd';
axios.defaults.baseURL =
  'https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12';



export const getImages = async (onSubmit) => {
    console.log('onSubmit :>> ', onSubmit);
    const response = await axios.get(
        'https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12'
            // `${URL}?q=${nextSearch}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${this.state.pagination.perPage}&page=${this.state.pagination.queryPage}`
    );
    return response.data
}
