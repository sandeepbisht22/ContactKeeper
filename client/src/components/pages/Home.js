import React, { useContext } from "react";
import ContactFilter from "../contacts/ContactFilter";
import Contacts from "../contacts/Contacts";
import ContactForm from "./../contacts/ContactForm";
import AuthContext from "./../../context/auth/authContext";

const Home = () => {
  return (
    <div className="grid-2">
      <div>
        <ContactForm></ContactForm>
      </div>
      <div>
        <ContactFilter></ContactFilter>
        <Contacts></Contacts>
      </div>
    </div>
  );
};

export default Home;
