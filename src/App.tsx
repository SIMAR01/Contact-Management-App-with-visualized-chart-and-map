import React from 'react';
import Dashboard from './Pages/Dashboard';

const App: React.FC = () => {
  return (
      <div className="container mx-auto">
        <Dashboard /> {/* rendering the Dashboard component */}
      </div>
  );
};

export default App;

