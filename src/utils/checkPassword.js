import axios from 'axios';

async function checkPassword(password, userId) {
  const response = await axios.post('https://api.palatialxr.com/v2/checkPassword', { "password": password, "id": userId });
  return response.data.valid;
}

export default checkPassword;
