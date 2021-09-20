import React, { Fragment, useContext } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactsItem from "./ContactsItem";
const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts } = contactContext;
  return (
    <Fragment>
      {contacts.map((contact) => (
        <ContactsItem key={contact.id} contact={contact}></ContactsItem>
      ))}
    </Fragment>
  );
};
export default Contacts;
