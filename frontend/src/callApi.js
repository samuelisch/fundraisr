import axios from "axios";

const baseURL = "/api";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

//Login
const userLogin = async (credentials) => {
  const response = await axios.post(`${baseURL}/login`, credentials);
  console.log(response.token);
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

const updateUser = async (userId, updateObj) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(
    `${baseURL}/users/edit/${userId}`,
    updateObj,
    config
  );
  return response.data;
};

const updatePassword = async (userId, passwordObj) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(
    `${baseURL}/users/edit/password/${userId}`,
    passwordObj,
    config
  );
  return response.data
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

const createCampaign = async (formData) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(`${baseURL}/campaigns`, formData, config);
  return response.data;
};

const donateCampaign = async (id, amountDonated) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(
    `${baseURL}/campaigns/edit/donation/${id}`,
    { amountDonated },
    config
  );
  return response.data;
};

const updateCampaign = async (id, updateObj) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(
    `${baseURL}/campaigns/edit/${id}`,
    updateObj,
    config
  );
  return response.data;
};

const server = {
  allUsers,
  singleUser,
  createUser,
  updateUser,
  userLogin,
  allCampaigns,
  singleCampaign,
  createCampaign,
  updateCampaign,
  setToken,
  donateCampaign,
  updatePassword,
};

export default server;
