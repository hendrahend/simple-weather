import React, { useEffect, useState } from "react";
import { IoMdSunny, IoMdRainy, IoMdThunderstorm, IoMdCloudy, IoMdSearch } from "react-icons/io";
import { BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsWind, BsThermometer } from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";
import axios from "axios";

const App = () => {
  const apiKey = "";
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("London");
  const [inputData, setInputData] = useState("");
  const date = new Date();

  const handleInput = (a) => {
    setInputData(a.target.value);
  };

  const handleSubmit = (a) => {
    console.log(inputData);
    if (inputData !== "") {
      setLocation(inputData);
    }
    const input = document.querySelector("input");
    input.value = "";
    a.preventDefault();
  };

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [location]);

  if (!data) {
    return (
      <div className="place-items-center">
        <div className="">
          <ImSpinner8 className="text-5xl animate-spin" />
        </div>
      </div>
    );
  }
  let icon;
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;
    case "Rain":
      icon = <IoMdRainy />;
      break;
    case "Clear":
      icon = <IoMdSunny />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }

  return (
    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      <form className="h-12 bg-black/20 w-full max-w-[450px] rounded-md backdrop-blur-[32px] mb-4">
        <div className="h-full relative flex items-center justify-between p-2">
          <input onChange={(a) => handleInput(a)} className="flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full" type="text" placeholder="Search by city..." />
          <button onClick={(a) => handleSubmit(a)} className="bg-white/30 w-10 h-10 rounded-[32px] flex justify-center items-center transition hover:bg-white/60 mr-1">
            <IoMdSearch className="text-xl text-black/90" />
          </button>
        </div>
      </form>
      <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-lg py-10 px-6">
        <div>
          <div className="flex items-center">
            <div className="text-[58px]">{parseInt(data.main.temp)}</div>
            <TbTemperatureCelsius className="mr-6" />
            <div>
              <div className="text-2xl font-semibold">
                {data.name}, {data.sys.country}
              </div>
              <div>
                {date.getUTCDate()}/{date.getUTCMonth()}/{date.getUTCFullYear()}
              </div>
            </div>
          </div>
          <div className="my-20">
            <div className="flex justify-center items-center">
              <div className="text-[150px] leading-none font-light">{icon}</div>
              {/* <div className="text-4xl">
                <TbTemperatureCelsius />
              </div> */}
            </div>
            <div className="capitalize text-center">{data.weather[0].description}</div>
          </div>
          <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsEye />
                </div>
                <div>
                  Visibility <span className="ml-2">{data.visibility / 1000} km</span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsThermometer />
                </div>
                <div className="flex">
                  Feels Like{" "}
                  <div className="flex ml-2">
                    {parseInt(data.main.feels_like)}
                    <TbTemperatureCelsius />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsWater />
                </div>
                <div>
                  Humidity <span className="ml-2">{data.main.humidity} %</span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsWind />
                </div>
                <div>
                  Wind <span className="ml-2">{data.wind.speed} m/s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
