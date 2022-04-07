import React, {useEffect, useState} from 'react';
import callApi from '../callApi'

const Homepage = () => {

    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        console.log(usersList)
    }, [usersList])

    const allUsers = async (event) => {
        event.preventDefault();
        const allUsersData = await callApi.allUsers();
        console.log(allUsersData)
        setUsersList(allUsersData)
     }

    const singleUser = async (id) => {
        // event.preventDefault();
        const singleUserData = await callApi.singleUser(id);
        console.log(singleUserData)
     }

    return (
        <div>
            <h1>Homepage</h1>
            <form onSubmit={allUsers}>
              <button type="submit">All Users</button>
          </form>
          <form onClick={() => singleUser("624e57e44f529d34847d5d26")}>
              <button type="submit">Single User</button>
          </form>

        </div>
    );
};

export default Homepage;