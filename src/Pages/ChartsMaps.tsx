import React, { useState } from 'react';
import CovidChart from '../Components/chart/Chartfordata'; 
import CovidMap from '../Components/maps/maps'; 

const ChartsAndMapsPage: React.FC = () => {
  // State to manage the current view which either be 'chart' or 'map'
  const [view, setView] = useState<'chart' | 'map'>('chart');

  return (
    <div className="App">
      {/* Container for the buttons */}
      <div className="flex justify-center space-x-4 my-4">
        {/* Button to switch to the chart view */}
        <button
          className={`px-4 py-2 rounded ${view === 'chart' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setView('chart')} // Set the view to 'chart' when clicked
        >
          Chart
        </button>
        {/* Button to switch to the map view */}
        <button
          className={`px-4 py-2 rounded ${view === 'map' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setView('map')} // Set the view to 'map' when clicked
        >
          Map
        </button>
      </div>
      {/* Container for displaying the current view (chart or map) */}
      <div className="mt-4">
        {view === 'chart' ? <CovidChart /> : <CovidMap />}
      </div>
    </div>
  );
};

export default ChartsAndMapsPage;
