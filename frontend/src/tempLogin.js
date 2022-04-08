import axios from "axios";

const baseUrl = 'http://localhost:5001/api/login'

let token;

const loginUser = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  token = response.data.token
  console.log('token: bearer ', token);
  return response.data
}

const server = {
  loginUser
}

export default server;