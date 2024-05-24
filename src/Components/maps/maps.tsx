import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useCovidData from '../../hooks/useCovidData'; // importing custom hook to fetch COVID-19 data

const CovidMap = () => {
  // Use the custom hook to fetch COVID-19 data
  const { data: countriesData, error, isLoading } = useCovidData();

  // Function to convert the timestamps into readable human dates
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toUTCString();
  };

  // Shows "Loading..." messsage if data is loading 
  if (isLoading) return <div>Loading...</div>;
  
  // Show error message if there was an error in fetching data
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <div className="relative z-0">
      {/* Leaflet map container with initial view centered at [20, 0] and zoom level 3 */}
      <MapContainer center={[20, 0]} zoom={3} minZoom={5} maxZoom={20} style={{ height: '100vh', width: '100%' }}>
        {/* TileLayer component to provide the map tiles from OpenStreetMap */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* map to iterate over the fetched countries data and create markers for each country */}
        {countriesData?.map((country) => (
          <Marker
            key={country.countryInfo._id} // Unique key for each marker
            position={[country.countryInfo.lat, country.countryInfo.long]} // Position of the marker
            icon={L.icon({ iconUrl: country.countryInfo.flag, iconSize: [30, 20] })} // Custom icon using the country's flag
          >
            {/* Popup component to show information when marker is clicked by user */}
            <Popup>
              <div className="flex items-center">
                {/* Country flag image */}
                <img
                  src={country.countryInfo.flag}
                  alt={`${country.country} flag`}
                  className="w-8 h-5 mr-3 rounded-full shadow-sm"
                />
                {/* Country and continent name */}
                <div>
                  <h2 className="font-bold text-lg">{country.country}</h2>
                  <p className="text-sm text-gray-500">{country.continent}</p>
                </div>
              </div>
              <hr className="my-2" />
              <div>
                {/* COVID-19 statistics */}
                <p><strong>Updated Time:</strong> {formatDate(country.updated)}</p>
                <p><strong>Cases:</strong> {country.cases}</p>
                <p><strong>Active Cases:</strong> {country.active}</p>
                <p><strong>Deaths:</strong> {country.deaths}</p>
                <p><strong>Recovered:</strong> {country.recovered}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CovidMap;
