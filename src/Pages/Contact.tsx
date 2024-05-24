import React, { useState, useEffect } from "react";
import { DataItem, initialData } from "../data"; // Importing initial data and DataItem interface
import Tables from "../Components/table/Table";
import ContactForm from "../Components/form/Form"; 

const ContactPage: React.FC = () => {
  // State to manage the data array
  const [data, setData] = useState<DataItem[]>(initialData);
  // State to manage the currently edited item
  const [currentItem, setCurrentItem] = useState<DataItem | null>(null);
  // State to manage the active view ('add' or 'list')
  const [view, setView] = useState<'add' | 'list'>('add');

  // Effect to load data from localStorage or use initial data
  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      setData(JSON.parse(storedData)); // Set data from localStorage if available
    } else {
      setData(initialData); // Set initial data if no data in localStorage
    }
  }, []);

  // Effect to save data to localStorage whenever the data state changes
  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem("data", JSON.stringify(data)); // Save data to localStorage
    }
  }, [data]);

  // Function to add a new item to the data array
  const addItem = (item: Omit<DataItem, "id">) => {
    setData((prevData) => {
      const newData = [...prevData, { id: prevData.length + 1, ...item }];
      if (newData.length > 30) {
        return newData.slice(-100); // Keep only the last 100 items
      }
      return newData;
    });
  };

  // Function to update an existing item in the data array
  const updateItem = (item: DataItem) => {
    setData((prevData) => {
      const updatedData = prevData.map((d) => (d.id === item.id ? item : d));
      if (updatedData.length > 30) {
        return updatedData.slice(-100); // Keep only the last 100 items
      }
      return updatedData;
    });
  };

  // Function to delete an item from the data array
  const deleteItem = (id: number) => {
    setData((prevData) => {
      const newData = prevData.filter((d) => d.id !== id);
      if (newData.length > 30) {
        return newData.slice(-100); // Keep only the last 100 items
      }
      return newData;
    });
  };

  // Function to set the current item for editing and switch to the add view
  const editItem = (item: DataItem) => {
    setCurrentItem(item);
    setView('add'); // Switch to the add view to edit the item
  };

  return (
    <div className="flex flex-col items-center pt-5">
      {/* Buttons to switch between views */}
      <div className="flex space-x-4 mb-4">
        {/* Button to add a new contact */}
        <button
          className={`px-4 py-2 rounded ${view === 'add' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setView('add')}
        >
          Add Contact
        </button>
        {/* Button to view the contact list */}
        <button
          className={`px-4 py-2 rounded ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setView('list')}
        >
          View Contact List
        </button>
      </div>
      {/* Render either the ContactForm or the Tables component based on the active view */}
      <div className="mt-6">
        {view === 'add' ? (
          <ContactForm
            addItem={addItem}
            updateItem={updateItem}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
            dataLength={data.length}
          />
        ) : (
          <div className="container">
            <Tables data={data} deleteItem={deleteItem} editItem={editItem}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
