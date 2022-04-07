import axios from 'axios';

const baseURL = "http://localhost:5001/api"

//Users
const allUsers = async () => {
    const response = await axios.get(`${baseURL}/users`);
    return response.data;
}

const singleUser = async () => {
    const response = await axios.get(`${baseURL}/users/:id`);
    return response.data;
}

const createUser = async () => {
    const response = await axios.post(`${baseURL}/users/new`);
    return response.data;
} 

const server = {
    allUsers,
    singleUser
}

export default server