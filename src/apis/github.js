import axios from 'axios';

// console.log('hiiiii axios');
export default axios.create({
  baseURL: 'https://api.github.com'
});
