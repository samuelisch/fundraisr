import React, { useContext, useEffect, useState } from "react";
import UserEditForm from "./UserEditForm";
import callApi from "../callApi";
import { UserContext } from "../App";
import UserPasswordEditForm from "./UserPasswordEditForm";
import { getNumberOfDays } from "./assets/utils";

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [donationsList, setDonationsList] = useState([]);
  const [campaignsList, setCampaignsList] = useState([])

  useEffect(() => {
    let fetching = true;
    if (user) {
      setName(user.name)
      setEmail(user.email)
      callApi.singleUser(user.id).then((data) => {
        if (fetching) {
          const sliceStart = data.donations.length > 10 ? data.donations.length - 10 : 0;
          setDonationsList(data.donations.slice(sliceStart));
          setCampaignsList(data.campaignsCreated);
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
  }

  const donationsView = donationsList.map(donation => (
    <li key={donation._id}>
      <p>Title: {donation.campaign.title}</p>
      <p>{donation.amount}</p>
    </li>
  ))

  const campaignsView = campaignsList.map(campaign => {
    const daysLeft = getNumberOfDays(campaign.dateEnd)
    const percentageDonation = ((campaign.amountDonated / campaign.amountTarget) * 100).toFixed(1)
    return (
      <li key={campaign.id}>
        <p>Title: {campaign.title}</p>
        <p>{daysLeft} days left</p>
        <p>{percentageDonation}% of {campaign.amountTarget} target reached</p>
      </li>
    )
    })

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
      <h2 className="font-bold text-xl" >Recent Donations:</h2>
      <ul>
        {donationsView}
      </ul>
      <h2 className="font-bold text-xl">Campaigns Initiated</h2>
      <ul>
        {campaignsView}
      </ul>
    </>
  );
};

export default UserProfile;
