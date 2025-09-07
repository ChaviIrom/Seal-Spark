import {
    getList,
    add
} from '../../api/contactUs';

export const fetchContact = () => async (dispatch) => {
  try {
    const contactUs = await getList();
    dispatch({ type: 'FETCH_CONTACT_SUCCESS', payload: contactUs });
  } catch (error) {
    dispatch({ type: 'FETCH_CONTACT_FAILURE', payload: error.message });
  }
};

export const addContact = (contact) => async (dispatch) => {
  try {
    const result = await add(contact);
    dispatch({ type: 'ADD_CONTACT_SUCCESS', payload: result });
  } catch (error) {
    dispatch({ type: 'CREATE_CONTACT_FAILURE', payload: error.message });
  }
};
export const clearContact = () => {
  return { type: 'CLEAR_CONTACT' };
};