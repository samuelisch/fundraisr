import axios from 'axios';

const baseURL = "http://localhost:5001/api"

const allUsers = async () => {
    const response = await axios.get(`${baseURL}/users`);
    return response.data;
}

const singleUser = async () => {
    const response = await axios.get(`${baseURL}/users/:id`);
    return response.data;
}

const server = {
    allUsers,
    singleUser
}

export default server