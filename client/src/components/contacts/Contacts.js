import React, { Fragment, useContext } from "react";
import ContactContext from "../../context/contact/contactContext";
import ContactsItem from "./ContactsItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filtered } = contactContext;
  if (contacts.length === 0) {
    return <h4>Please add a Contact</h4>;
  }
  return (
    <Fragment>
      <TransitionGroup>
        {filtered != null
          ? filtered.map((contact) => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactsItem contact={contact}></ContactsItem>
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition key={contact._id} timeout={500} classNames="item">
                <ContactsItem contact={contact}></ContactsItem>
              </CSSTransition>
            ))}
        {}
      </TransitionGroup>
    </Fragment>
  );
};
export default Contacts;
