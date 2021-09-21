import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import { v4 as uuid } from "uuid";
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Sandeep",
        email: "bishtsandy22@gmail.com",
        phone: "111-1111-111",
        type: "personal",
      },
      {
        id: 2,
        name: "bhai",
        email: "bhai@gmail.com",
        phone: "222-222-2222",
        type: "personal",
      },
      {
        id: 3,
        name: "mummy",
        email: "mummy@gmail.com",
        phone: "3333-333-3333",
        type: "professional",
      },
    ],
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);

  //ADD contact
  const addContact = (contact) => {
    contact.id = uuid;
    dispatch({
      type: ADD_CONTACT,
      payload: contact,
    });
  };
  //Delete contact
  const deleteContact = (id) => {
    dispatch({
      type: DELETE_CONTACT,
      payload: id,
    });
  };
  //Set current contact

  //Clear current contact

  //update contact

  //filter contact

  //clear contact

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        deleteContact,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
