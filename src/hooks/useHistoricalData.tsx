import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Defining the interface for historical COVID-19 data structure
interface HistoricalData {
  cases: { [date: string]: number }; // An object where the keys are dates and the values are the number of cases
}

// Asynchronous function to fetch historical COVID-19 data from the API
const fetchHistoricalData = async (): Promise<HistoricalData> => {
  // Making a GET request to the API endpoint for historical data
  const { data } = await axios.get<HistoricalData>('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  return data; // Return the data from the response
};

// Custom hook to fetch historical COVID-19 data using react-query
const useHistoricalData = () => {
  // Use the useQuery hook from react-query to fetch data and manage loading/error states
  return useQuery<HistoricalData, Error>({
    queryKey: ['historicalData'], // Unique key to identify the query
    queryFn: fetchHistoricalData // Function to fetch the data
  });
};

export default useHistoricalData;
