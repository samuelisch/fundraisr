import React, {useState} from 'react';
import callApi from '../callApi'

const Homepage = () => {

    const [usersList, setUsersList] = useState([]);

    const allUsers = async (event) => {
        event.preventDefault();
        const allUsersData = await callApi.allUsers();
        console.log(allUsersData)
        setUsersList(allUsersData)
     }

    console.log(usersList)

    return (
        <div>
            <h1>Homepage</h1>
            <form onSubmit={allUsers}>
              <button type="submit">All Users</button>
          </form>


        </div>
    );
};

export default Homepage;