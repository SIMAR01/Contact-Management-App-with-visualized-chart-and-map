import { Route, Routes, Navigate } from 'react-router-dom';
import ContactPage from './Contact'; 
import ChartsAndMapsPage from './ChartsMaps'; 

const Routing = () => {
  return (
    <>
      {/* Define routes using the Routes component */}
      <Routes>
        {/* Route for ChartsandMaps Page */}
        <Route path="/chartsandmaps" element={<ChartsAndMapsPage />} />
        {/* Route for Contact Page */}
        <Route path="/contact" element={<ContactPage />} />
        {/* Default route - It will redirect to ChartsandMaps Page if the URL does not match any defined routes */}
        <Route path="*" element={<Navigate to="/chartsandmaps" />} />
      </Routes>
    </>
  );
};

export default Routing;
