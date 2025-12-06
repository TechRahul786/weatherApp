import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import rain from "../assets/heavyrain.png";
import { FaLocationDot } from "react-icons/fa6";
import Chart from "../components/Chart";
const Home = ({ currentData, dayForcast, setSearch }) => {
  const daily = dayForcast.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  const hourlyData = dayForcast.list.slice(0,4).map(item => ({
  time: item.dt_txt.slice(11, 16),     // "09:00"
  temp: Math.round(item.main.temp)     // 12
})); 

  const getDayName = (dt) => {
    const date = new Date(dt * 1000);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const getCountryName = (code) => {
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  return regionNames.of(code); 
};

const fullName = getCountryName(currentData.sys.country);

  const searchHandle = (e) =>{
   if(e.key === "Enter"){
    setSearch(e.target.value)
   }
  }

  return (
    <div className="flex flex-col md:gap-10 items-center bg-radial-[at_50%_50%] from-white/20 to-black h-full md:h-full w-full rounded-3xl text-white p-10">
    <div className="bg-white/20 bg-opacity-50 h-8 p-1 rounded-md md:w-1/3">
        <input type="text" onKeyDown={(e)=>searchHandle(e)} className="w-full focus:outline-0" placeholder={currentData.name}/>
    </div>

      <div className="flex flex-col md:flex-row w-full  mt-5">
        <div className="flex flex-col justify-center items-center w-full md:w-1/4">
        <div className="flex items-center gap-2">
           <FaLocationDot className="size-6"/>
          <p className="font-extralight text-xl">{currentData.name} ,{fullName}</p>
        </div>
         
          <p className="flex font-extralight text-7xl mt-3">
            {currentData.main.temp}
            <sup className="text-2xl">°C</sup>
          </p>
          <p className="text-2xl font-extralight mt-5">
            {currentData.weather[0].main}
          </p>
          <div className="flex gap-10 mt-10 font-extralight">
            <div>
              <div className="flex items-center gap-2">
                <FaWind />
                <p>Wind</p>
              </div>

              <p className="text-xl">{currentData.wind.speed}km/h</p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <WiHumidity />
                <p>Humidity</p>
              </div>

              <p className="text-xl">{currentData.main.humidity}%</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full md:w-2/4">
          <img
            src={`https://openweathermap.org/img/wn/${currentData.weather[0].icon}@4x.png`}
            alt=""
            className="size-36 md:size-70 "
          />
        </div>
        <div className="flex flex-col justify-center items-center w-full md:w-1/4">
          {daily.map((item, index) => (
            <div key={index} className="flex items-center gap-3 my-2">
              <p className="w-12 text-white text-md">{getDayName(item.dt)}</p>

              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt="icon"
                className="size-7"
              />

              <p className="text-white text-md">{item.main.temp}°C</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center w-full h-[100px] md:h-[200px] mt-5">
        <Chart hourlyData={hourlyData}/>
      </div>
    </div>
  );
};

export default Home;
