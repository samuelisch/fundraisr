import axios from "axios";

const baseURL = "http://localhost:5001/api";

let token;

//Login
const userLogin = async (credentials) => {
  const response = await axios.post(`${baseURL}/login`, credentials);
  token = "bearer " + response.data.token;
  console.log("token is set!");
  return response.data;
};

//Users
const allUsers = async () => {
  const response = await axios.get(`${baseURL}/users`);
  return response.data;
};

const singleUser = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(`${baseURL}/users/${id}`, config);
  return response.data;
};

const createUser = async (name, email, password) => {
  const response = await axios.post(`${baseURL}/users/`, {
    name,
    email,
    password,
  });
  return response.data;
};

//Campaign
const allCampaigns = async () => {
    const response = await axios.get(`${baseURL}/campaigns`);
    return response.data;
  };

const singleCampaign = async (id) => {
    const response = await axios.get(`${baseURL}/campaigns/${id}`);
    return response.data;
  };

const updateCampaign = async (id) => {
    const response = await axios.put(`${baseURL}/campaigns/edit/${id}`);
    return response.data;
  };

const server = {
  allUsers,
  singleUser,
  createUser,
  userLogin,
  allCampaigns,
  singleCampaign
};

export default server;
