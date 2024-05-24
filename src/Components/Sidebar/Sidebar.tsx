import React from 'react';
import { IoStatsChartSharp } from "react-icons/io5";
import { IoMdContacts } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import {  NavLink } from 'react-router-dom';

//definig props interface for Sidebar component
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`fixed md:static top-0 left-0 h-full w-64 bg-gray-900 text-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-50`}>
      <div className="py-12 px-5">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl text-center font-semibold">DASHBOARD</h1>
          <button
            className="md:hidden text-white absolute left-4 top-4"
            onClick={toggleSidebar}
          >
            <RxCrossCircled />
          </button>
        </div>
        <ul>
        {/* Defining two NavLink in sidebar  */}
        <li className="mt-12 flex">
            <NavLink 
              to="/contact" 
              onClick={toggleSidebar} 
              className={({ isActive }) => 
                isActive ? 'flex hover:underline text-yellow-500' : 'flex hover:underline'
              }
            >
              <span className='mt-1 me-2'><IoMdContacts /></span>
              <p className='text-lg'>Contact Page</p>
            </NavLink>
          </li>
          <li className="mt-3 flex">
            <NavLink 
              to="/chartsandmaps" 
              onClick={toggleSidebar} 
              className={({ isActive }) => 
                isActive ? 'flex hover:underline text-yellow-500' : 'flex hover:underline'
              //  if isActive then its color changes to yellow
              }
            >
              <span className='mt-1 me-2'><IoStatsChartSharp /></span>
              <p className='text-lg'>Charts and Maps</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
