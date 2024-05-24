import axios, { AxiosResponse } from "axios";

//  Define the register function that takes userData as input and returns a Promise
export const register = (): Promise<any> => {
  //  Return a new Promise that wraps the axios request
  return new Promise((resolve, reject) => {
    // Step 4: Make a GET request using axios to the specified URL
    axios
      .get<any, AxiosResponse<any>>("https://disease.sh/v3/covid-19/countries")
      // Step 5: Handle the response from the server
      .then((response) => {
        console.log(response, "responseresponseresponse");
        // Step 6: Resolve the Promise with the data received from the server
        resolve(response.data);
      })
      // Step 7: Handle errors if the request fails
      .catch((error) => {
        // Step 8: Check if the error is an AxiosError
        if (axios.isAxiosError(error)) {
          // Step 9: Check if there is a response from the server
          if (error.response) {
            // Step 10: Reject the Promise with the error response data
            reject(error.response.data);
          } else if (error.request) {
            // Step 11: Reject the Promise if no response is received
            reject("No response received");
          } else {
            // Step 12: Reject the Promise with the error message
            reject(error.message);
          }
        } else {
          // Step 13: Reject the Promise with the error itself
          reject(error);
        }
      });
  });
};
