import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY_WEATHER_API || "";
const BASE_URL = process.env.BASE_URL_WEATHER_API || "";

export interface WeatherData {
  temp_c: number;
  wind_kph: number;
  cloud: number;
  chance_of_rain: number;
  will_it_rain: number;
}

/**
 * Get current weather for a location
 * @param {string} location - City name, lat/lon, zip code, IP address
 * @param {boolean} includeAqi - Include air quality data
 * @returns {Promise<Object>} Weather data
 */
async function GetCurrentWeather(
  location: string,
  includeAqi = false,
): Promise<WeatherData> {
  const params = new URLSearchParams({
    key: API_KEY,
    q: location,
    aqi: includeAqi ? "yes" : "no",
  });

  console.log("checking the base url", BASE_URL);

  const response = await fetch(`${BASE_URL}/current.json?${params}`);

  if (!response.ok) {
    const error: any = await response.json();
    throw new Error(
      `WeatherAPI error ${error.error.code}: ${error.error.message}`,
    );
  }

  const data: any = await response.json();

  return {
    temp_c: data.current.temp_c,
    wind_kph: data.current.wind_kph,
    cloud: data.current.cloud,
    chance_of_rain: data.current.chance_of_rain,
    will_it_rain: data.current.will_it_rain,
  };
}

export default GetCurrentWeather;
