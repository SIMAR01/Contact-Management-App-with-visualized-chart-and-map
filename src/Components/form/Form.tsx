import React, { useState, useEffect } from 'react';
import { DataItem } from '../../data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the props interface for the ContactForm component
interface FormProps {
  addItem: (item: Omit<DataItem, 'id'>) => void;
  updateItem: (item: DataItem) => void;
  currentItem: DataItem | null;
  setCurrentItem: (item: DataItem | null) => void;
  dataLength: number;
}

// Functional component for the form
const ContactForm: React.FC<FormProps> = ({ addItem, updateItem, currentItem, setCurrentItem }) => {
  //Tostify for notify user when data is added to contact list and when it is update successfully
  const notifyAdd = () => toast("Contact Added Successfully!"); //notification when contact added 
  const notifyUpdate = () => toast("Contact Updated Successfully!") //notification when contact updated 
  
  // Defining state for form inputs
  const [formState, setFormState] = useState<Omit<DataItem, 'id'>>({
    firstName: '',
    lastName: '',
    status: 'active'
  });

  // Effect to set the form state when currentItem changes
  useEffect(() => {
    if (currentItem) {
      setFormState({
        firstName: currentItem.firstName,
        lastName: currentItem.lastName,
        status: currentItem.status
      });
    } else {
      setFormState({
        firstName: '',
        lastName: '',
        status: 'active'
      });
    }
  }, [currentItem]);

  // Handles form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem) {
      updateItem({ ...currentItem, ...formState });
      notifyUpdate();
    } else {
      addItem(formState);
      notifyAdd();
    }
    setFormState({
      firstName: '',
      lastName: '',
      status: 'active'
    });
    setCurrentItem(null);
  };

  return (
<div className="mt-12">
  <ToastContainer />
<form onSubmit={handleSubmit} className="space-y-5 p-5 bg-white rounded shadow-md">
  <p className='text-2xl text-center'>Contact Form</p>
      <div className="space-y-2">
        <input
          type="text"
          placeholder="First Name"
          value={formState.firstName}
          onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formState.lastName}
          onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="active"
            checked={formState.status === 'active'}
            onChange={() => setFormState({ ...formState, status: 'active' })}
            className="form-radio text-blue-600"
          />
          <span className="ml-2 mr-4">Active</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="inactive"
            checked={formState.status === 'inactive'}
            onChange={() => setFormState({ ...formState, status: 'inactive' })}
            className="form-radio text-blue-600"
          />
          <span className="ml-2">Inactive</span>
        </label>
      </div>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        {currentItem ? 'Update Contact' : 'Add to Contact List'}
      </button>
    </form>
</div>
  );
};

export default ContactForm;

