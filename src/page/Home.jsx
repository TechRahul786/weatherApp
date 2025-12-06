import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import rain from "../assets/heavyrain.png";
const Home = ({ currentData, dayForcast, setSearch }) => {
  const daily = dayForcast.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );
  const getDayName = (dt) => {
    const date = new Date(dt * 1000);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const searchHandle = (e) =>{
   if(e.key === "Enter"){
    setSearch(e.target.value)
   }
  }

  return (
    <div className=" flex flex-col md:justify-center items-center bg-radial-[at_50%_50%] from-white/20 to-black h-full w-full rounded-3xl text-white p-10">
    <div className="bg-black/20 bg-opacity-50 h-8 p-1 rounded-xl w-1/3">
        <input type="text" onKeyDown={(e)=>searchHandle(e)} className="focus:outline-0"/>
    </div>

      <div className="flex flex-col md:flex-row w-full mt-5">
        <div className="flex flex-col justify-center items-center w-full md:w-1/4">
          <p className="flex font-extralight text-7xl">
            {currentData.main.temp}
            <sup className="text-2xl">°C</sup>
          </p>
          <p className="text-2xl font-extralight">
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
            className="size-70 "
          />
        </div>
        <div className="flex flex-col justify-center items-center w-full md:w-1/4">
          {daily.map((item, index) => (
            <div key={index} className="flex items-center gap-3 my-2">
              <p className="w-12 text-white text-sm">{getDayName(item.dt)}</p>

              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt="icon"
                className="size-7"
              />

              <p className="text-white text-sm">{item.main.temp}°C</p>
            </div>
          ))}
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Home;
