import axios from "axios";

const APIKey = '877ab787dea34af1b05135452231306';


const forcastendpoint = params=> `https://api.weatherapi.com/v1/forecast.json?key=${APIKey}&q=${params.cityname}&days=${params.days}&aqi=no&alerts=no`;
const locationendpoint = params=> `https://api.weatherapi.com/v1/search.json?key=${APIKey}&q=${params.cityname}`;

const apiCall = async (endpoint)=>{
  const option ={
    method: "GET",
    url: endpoint
  }
  try{
   const response =  await axios.request(option);
   return response.data;
  }catch(error)
  {
   console.log("error: ",error);
   return null;

  }
}

export const fetchweatherdata = params=>{
  return apiCall(forcastendpoint(params));
}

export const fetchLocations = params=>{
  let locationsUrl = locationendpoint(params);
  return apiCall(locationsUrl);
}