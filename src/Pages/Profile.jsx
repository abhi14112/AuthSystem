import React from "react";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileData from "../components/ProfileData";
import Address from "../components/Address";
import { useParams } from "react-router-dom";

const PersonalInfoForm = () => {
  const { section } = useParams();
  return (
    <>
      <div className="flex px-8 py-6">
        <ProfileSidebar />
        {section === "profile" && <ProfileData />}
        {section === "address" && <Address />}
      </div>
    </>
  );
};

export default PersonalInfoForm;
