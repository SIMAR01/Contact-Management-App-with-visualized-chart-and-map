import React, { useState } from 'react';
import { TiThMenu } from "react-icons/ti"; 
import Sidebar from '../Components/Sidebar/Sidebar'; 
import Routing from './Routes'; // Importing Routes component for routing

const Dashboard: React.FC = () => {
  // State to manage the sidebar open/close state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar open/close state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className=" mx-auto">
      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed z-50 h-screen ${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300`}>
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
        {/* Main Content */}
        <div className="flex flex-col flex-1 ml-0 md:ml-64">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="p-2 text-gray-900"
              onClick={toggleSidebar}
            >
              <TiThMenu /> {/* mobile menu icon */}
            </button>
          </div>
          {/* Routing Component */}
          <div className="w-full">
            <Routing /> {/* Render Routing component for handling different routes */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
