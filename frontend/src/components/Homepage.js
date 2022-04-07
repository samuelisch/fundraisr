import React, {useState} from 'react';
import callapi from '../callapi'

const Homepage = () => {

    const [usersList, setUsersList] = useState([]);

    


    return (
        <div>
            <h1>Homepage</h1>
            <form action="/users" method="get">
              <button type="submit">All Users</button>
          </form>


        </div>
    );
};

export default Homepage;