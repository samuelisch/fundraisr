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
  const [campaignsList, setCampaignsList] = useState([]);

  useEffect(() => {
    let fetching = true;
    if (user) {
      setName(user.name);
      setEmail(user.email);
      callApi.singleUser(user.id).then((data) => {
        if (fetching) {
          const sliceStart =
            data.donations.length > 10 ? data.donations.length - 10 : 0;
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
      email,
    };

    const updatedUser = await callApi.updateUser(user.id, updatedProfile);
    console.log(updatedUser);
    setUser(updatedUser);
    setName(updatedUser.name);
    setEmail(updatedUser.email);
  };

  const handlePasswordChange = async (passwordObj) => {
    await callApi.updatePassword(user.id, passwordObj);
  };

  const donationsView = donationsList.map((donation) => (
    <tr>
      <td className="border-b border-slate-100  p-4 pl-8 text-slate-500 ">
        {donation.campaign.title}
      </td>
      <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
        SGD{donation.amount.toLocaleString("en-US")}
      </td>
    </tr>
  ));

  const campaignsView = campaignsList.map((campaign) => {
    const daysLeft = getNumberOfDays(campaign.dateEnd);
    const percentageDonation = (
      (campaign.amountDonated / campaign.amountTarget) *
      100
    ).toFixed(1);

    return (
      <tr>
        <td className="border-b border-slate-100  p-4 pl-8 text-slate-500 ">
          {campaign.title}
        </td>
        <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
          {daysLeft} days left
        </td>
        <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
          {percentageDonation}% of {campaign.amountTarget} target reached
        </td>
      </tr>
    );
  });

  return (
    <>
      <UserEditForm
        name={name}
        changeNameHandler={setName}
        email={email}
        changeEmailHandler={setEmail}
        handleSubmit={handleProfileEditSubmit}
      />
      <UserPasswordEditForm handleSubmit={handlePasswordChange} />
      <div className="flex flex-row justify-evenly mt-10">
        <div id="donation">
          <h2 className="text-base font-bold p-2 text-gray-700">
            Recent Donations:
          </h2>
          <div className="relative rounded-xl overflow-auto">
            <div className="shadow-sm overflow-hidden my-5">
              <table class="table-auto">
                <thead>
                  <tr>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                      Title
                    </th>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                      Amount Donated
                    </th>
                  </tr>
                </thead>
                <tbody>{donationsView}</tbody>
              </table>
            </div>
          </div>
        </div>

        <div id="campaignlist">
          <h2 className="text-base font-bold p-2 text-gray-700">
            Campaigns Initiated
          </h2>
          <div className="relative rounded-xl overflow-auto">
            <div className="shadow-sm overflow-hidden my-5">
              <table class="table-auto">
                <thead>
                  <tr>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                      Title
                    </th>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                      Days Left
                    </th>
                    <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                      Progress to-date
                    </th>
                  </tr>
                </thead>
                <tbody>{campaignsView}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
