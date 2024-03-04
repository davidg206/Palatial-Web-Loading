import axios from 'axios';
/*
async function checkPassword(password, userId) {
  const response = await axios.post('https://api.palatialxr.com/v2/checkPassword', { "password": password, "id": userId });
  console.log(response.data.valid);
  return response.data.valid;
}*/

function checkPassword(password, memberPassword) {
  return password === memberPassword;
}

export default checkPassword;
