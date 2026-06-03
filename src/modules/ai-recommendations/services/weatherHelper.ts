import { Season } from "../../wardrobe/dto/create-item.dto";
import { WeatherData } from "./weather.service";

export interface WeatherContext {
  season: Season;
  summary: string; // compact human-readable string for the prompt
}
export function buildWeatherContext(w: WeatherData): WeatherContext {
  // Derive season from temperature
  let season: Season;
  if (w.temp_c >= 21) season = Season.SUMMER;
  else if (w.temp_c >= 18) season = Season.SPRING;
  else if (w.temp_c >= 10) season = Season.FALL;
  else season = Season.WINTER;

  // Build compact summary — the AI reads this, not raw JSON
  const rainPart =
    w.will_it_rain || w.chance_of_rain > 30
      ? `rain expected (${w.chance_of_rain}% chance)`
      : "no rain";

  const windPart =
    w.wind_kph > 30
      ? `strong wind (${Math.round(w.wind_kph)} km/h)`
      : w.wind_kph > 15
        ? `light wind (${Math.round(w.wind_kph)} km/h)`
        : "calm";

  const skyPart =
    w.cloud > 60 ? "overcast" : w.cloud > 25 ? "partly cloudy" : "clear sky";

  const conditionPart = w.condition ? ` — ${w.condition}` : "";
  const humidityPart = w.humidity != null ? `, humidity ${w.humidity}%` : "";

  const summary = `${w.temp_c}°C, ${windPart}, ${skyPart}, ${rainPart}${humidityPart}${conditionPart}`;

  return { season, summary };
}
