import axios from 'axios';

const allUsers = async () => {
    const allUsersAPI = "http://localhost:5001/users/";
    const response = await axios.get(allUsersAPI);
    return response.data;
}