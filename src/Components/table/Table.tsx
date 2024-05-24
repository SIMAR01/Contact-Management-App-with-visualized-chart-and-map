import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataItem } from '../../data'; // Importing the DataItem type

// Defining the props interface for the Tables component
interface TableProps {
  data: DataItem[];
  deleteItem: (id: number) => void;
  editItem: (item: DataItem) => void;
}

// Functional component for displaying the table
const ContactList: React.FC<TableProps> = ({ data, deleteItem, editItem }) => {
  const [itemToDelete, setItemToDelete] = useState<DataItem | null>(null);

  const notifyDeleted = () => toast("Contact Deleted!"); // to display the toast notification when the contact is deleted

  const handleDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete.id);
      notifyDeleted();
      setItemToDelete(null); // Reset the state
    }
  };

  const handleCancel = () => {
    setItemToDelete(null); // Reset the state
  };

  return (
    <div className="overflow-x-auto">
      <ToastContainer />
      <table className="overflow-x-auto md:min-w-full bg-white border border-gray-300">
        <caption className="caption-top">Contact List</caption>
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 sm:px-6 border-b">First Name</th>
            <th className="py-2 px-4 sm:px-6 border-b">Last Name</th>
            <th className="py-2 px-4 sm:px-6 border-b">Status</th>
            <th className="py-2 px-4 sm:px-6 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 sm:px-6 border-b">{item.firstName}</td>
              <td className="py-2 px-4 sm:px-6 border-b">{item.lastName}</td>
              <td className="py-2 px-4 sm:px-6 border-b">{item.status}</td>
              <td className="py-2 px-4 sm:px-6 border-b space-x-2">
                <div className="flex">
                  <button
                    className="bg-blue-500 text-white py-1 px-3 mr-4 rounded hover:bg-blue-600"
                    onClick={() => editItem(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    onClick={() => setItemToDelete(item)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Dialog */}
      {itemToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this contact?</h2>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Yes, Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;
