import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Defining the interface for the CountryInfo data structure
interface CountryInfo {
  _id: number; // Unique ID for the country
  lat: number; // Latitude coordinate of the country
  long: number; // Longitude coordinate of the country
  flag: string; // URL to the flag image provided by the API
}

// Defining the interface for the CountryData data structure
interface CountryData {
  country: string; // Name of the country
  continent: string; // Continent of that country 
  countryInfo: CountryInfo; // Nested object containing country info
  cases: number; // Total number of COVID-19 cases
  updated: number; // Timestamp of the last update
  active: number; // Number of active COVID-19 cases
  deaths: number; // Number of COVID-19 related deaths
  recovered: number; // Number of recovered COVID-19 cases
}

// Function to fetch COVID-19 data from the API
const fetchCovidData = async (): Promise<CountryData[]> => {
  // Making a GET request to the API endpoint
  const { data } = await axios.get<CountryData[]>('https://disease.sh/v3/covid-19/countries');
  return data; // Return the data from the response
};

// Custom hook to fetch COVID-19 data using react-query
const useCovidData = () => {
  // Use the useQuery hook from react-query to fetch data and manage loading/error states
  return useQuery<CountryData[], Error>({
    queryKey: ['covidData'], // Unique key to identify the query
    queryFn: fetchCovidData // Function to fetch the data
  });
};

export default useCovidData;
