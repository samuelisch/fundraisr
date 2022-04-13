import React, { useContext, useEffect, useState } from "react";
import UserEditForm from "./UserEditForm";
import callApi from "../callApi";
import { UserContext } from "../App";
import UserPasswordEditForm from "./UserPasswordEditForm";

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [donationsList, setDonationsList] = useState([]);

  useEffect(() => {
    let fetching = true;
    if (user) {
      setName(user.name)
      setEmail(user.email)
      callApi.singleUser(user.id).then((data) => {
        if (fetching) {
          console.log(data.campaignsCreated);
          const sliceStart = user.donations.length > 10 ? user.donations.length - 10 : user.donations.length;
          setDonationsList(user.donations.slice(sliceStart))
        }
      });
    }

    return () => {
      fetching = false;
    };
  }, [user]);

  const handleProfileEditSubmit = async (e) => {
    e.preventDefault();
    const updatedProfile = {
      name,
      email
    }

    const updatedUser = await callApi.updateUser(user.id, updatedProfile)
    console.log(updatedUser)
    setUser(updatedUser)
    setName(updatedUser.name)
    setEmail(updatedUser.email)
  }

  const handlePasswordChange = async (passwordObj) => {
    await callApi.updatePassword(user.id, passwordObj)
    console.log('updated password')
  }

  const donationsView = donationsList.map(donation => (
    <li>

    </li>
  ))

  return (
    <>
      <UserEditForm
        name={name}
        changeNameHandler={setName}
        email={email}
        changeEmailHandler={setEmail}
        handleSubmit={handleProfileEditSubmit}
      />
      <UserPasswordEditForm  handleSubmit={handlePasswordChange} />
      <ul>

      </ul>
    </>
  );
};

export default UserProfile;
