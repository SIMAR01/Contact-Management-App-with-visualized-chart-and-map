import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataItem } from '../../data';

interface ContactState {
  contacts: DataItem[];
  currentContact: DataItem | null;
  view: 'add' | 'list';
}

const initialState: ContactState = {
  contacts: [],
  currentContact: null,
  view: 'add',
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action: PayloadAction<DataItem>) {
      state.contacts.push(action.payload);
    },
    updateContact(state, action: PayloadAction<DataItem>) {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
    deleteContact(state, action: PayloadAction<number>) {
        state.contacts = state.contacts.filter(contact => Number(contact.id) !== action.payload);
      },
    setCurrentContact(state, action: PayloadAction<DataItem | null>) {
      state.currentContact = action.payload;
    },
    setView(state, action: PayloadAction<'add' | 'list'>) {
      state.view = action.payload;
    },
  },
});

export const { addContact, updateContact, deleteContact, setCurrentContact, setView } = contactSlice.actions;

export default contactSlice.reducer;
