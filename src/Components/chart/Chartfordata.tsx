import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useHistoricalData from '../../hooks/useHistoricalData'; //importing useHistoricalData hook to fetch COVID-19 cases data

// Defining the Interface of the historical data
interface HistoricalData {
  cases: { [date: string]: number };
}

const CovidChart = () => {
  // Using the custom hook to fetch historical COVID-19 data
  const { data, error, isLoading } = useHistoricalData();

  // Initializing the chart options state
  const [options, setOptions] = useState<Highcharts.Options>({
    title: {
      text: 'COVID-19 Cases Data', // Chart title
    },
    xAxis: {
      categories: [], // Categories for the x-axis (dates)
    },
    series: [], // Data series (cases)
  });

  // useEffect to update the chart options when the data is fetched
  useEffect(() => {
    if (data) {
      const chartData = processChartData(data); // Process the data to fit the chart options
      setOptions(chartData); // Update the chart options state
    }
  }, [data]);

  // Function to process the fetched data and format it for the chart
  const processChartData = (data: HistoricalData): Highcharts.Options => {

    // Convert the data object into an array of date-value pairs
    const casesData = Object.entries(data.cases).map(([date, value]) => ({
      date,
      value,
    }));

    // Extract the dates for the x-axis categories
    const categories = casesData.map((entry) => entry.date);

    // Extract the case numbers for the data series
    const casesSeriesData = casesData.map((entry) => entry.value);

    // Return the formatted chart options
    return {
      xAxis: {
        categories, // Set x-axis categories to the dates
      },
      yAxis: {
        title: {
          text: 'Number of COVID-19 Cases', // Set the y-axis title
        }
      },
      series: [
        {
          type: 'line',
          name: 'Historical Cases', // Name of the data series
          data: casesSeriesData, // Set the data series to the case numbers
        },
      ],
    };
  };

  // Render "Loading..." message while data is being fetched
  if (isLoading) return <div>Loading...</div>;

  // Render error message if there was an error fetching data
  if (error) return <div>Error fetching data: {error.message}</div>;

  // Render the chart component with the configured options
  return (
    <div className="mt-12">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default CovidChart;
