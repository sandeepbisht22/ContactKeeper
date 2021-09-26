import React, { useReducer } from "react";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import { v4 as uuid } from "uuid";
import axios from "axios";

import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  };
  const [state, dispatch] = useReducer(contactReducer, initialState);
  //GET Contact
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");

      dispatch({
        type: GET_CONTACTS,
        payload: res.data,
      });
    } catch (error) {
      console.log("Error is " + error);
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };
  //ADD contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      console.log("before Post" + contact);
      const res = await axios.post("/api/contacts", contact, config);
      console.log("After Post res.data " + res.data);

      dispatch({
        type: ADD_CONTACT,
        payload: res.data,
      });
    } catch (error) {
      console.log("Error is " + error);
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };

  //update contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );

      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data,
      });
    } catch (error) {
      console.log("Error is " + error);
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };
  //Delete contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({
        type: DELETE_CONTACT,
        payload: id,
      });
    } catch (error) {
      console.log("Error is " + error);
      dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
    }
  };
  //Set current contact
  const setCurrent = (contact) => {
    dispatch({
      type: SET_CURRENT,
      payload: contact,
    });
  };
  //Clear current contact
  const clearCurrent = (contact) => {
    dispatch({
      type: CLEAR_CURRENT,
    });
  };
  //filter contact
  const filterContacts = (text) => {
    dispatch({
      type: FILTER_CONTACTS,
      payload: text,
    });
  };
  //clear filter
  const clearFilter = (text) => {
    dispatch({
      type: CLEAR_FILTER,
    });
  };
  //Clear contacts

  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS,
    });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
