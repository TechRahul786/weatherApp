import { useEffect, useState } from "react";
import "./App.css";
import Home from "./page/Home";
import Loader from "./components/Loader";

function App() {
  const [currentData, setCurrentData] = useState([]);
  const [search, setSearch] = useState(null);
  const [dayForcast, setdayForcast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getCurrentWeather = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        console.log("Location:", lat, lon);

        //  Current weather
        const currentRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const currentData = await currentRes.json();
        setCurrentData(currentData);

        //  Forecast
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const forecastData = await forecastRes.json();

        setdayForcast(forecastData);
        setIsLoading(false);

        console.log("Weather:", currentData);
        console.log("Forecast:", forecastData);
      },

      (err) => {
        alert("Please enable location on your mobile browser.");
        console.log("Location error:", err);
        setIsLoading(false)
      }
    );
  };
  const refreshComponent = () => setRefresh(!refresh);
  const searchByLocation = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`
    ).then((res) => res.json());

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=${API_KEY}`
    );

     const forecastData = await forecastRes.json();
      setCurrentData(data);
      setdayForcast(forecastData);
    } catch (error) {
      
      alert("City not found")
      setSearch(null)
    } finally {
      setIsLoading(false)
    }
    
    
    
  };

  useEffect(() => {
    if (search !== null) {
      searchByLocation();
    }
  }, [search]);

  useEffect(() => {
    getCurrentWeather();
  }, []);

  return (
    <div className="bg-black/80 md:h-screen w-screen py-3 px-2 md:py-20 md:px-15">
      {isLoading ? (
         <Loader/>
      ) : (
        <Home
          currentData={currentData}
          dayForcast={dayForcast}
          setSearch={setSearch}
        />
      )}
    </div>
  );
}

export default App;
