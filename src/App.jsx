import React, { useEffect, useState } from "react";
import "./App.css";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Ciamis");
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3e150c61886666443c3267d56d507b0e&units=metric`;

    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [location]);
  console.log(data);

  return (
    <div className="app-container flex justify-center items-end">
      <div className="circle rounded-full"></div>
      <div className="absolute flex flex-col w-full items-center">
        {/* <div className="flex items-center"> */}
        <form className="bg-white/50 rounded-md h-10 backdrop-blur-[32px]" action="">
          <div className="h-full relative flex flex-row items-center justify-between px-2">
            <input className="flex-1 bg-transparent outline-none placeholder:text-[#292b48] h-full font-normal app-color-black px-4 border-b " type="text" placeholder="Search Your City Name..." />
            <button className="rounded-md pl-2 bg-black/20 h-8 w-8 items-center">
              <IoMdSearch className="text-base" />
            </button>
          </div>
        </form>
        {/* </div> */}
        <div className="my-36 bg-white/50 w-auto p-6 app-shadow rounded-xl backdrop-blur-[150px]">
          <div>
            <h2>
              {data.name}, {data.sys.country}
            </h2>
            <p className="capitalize">{data.weather[0].description}</p>
            <div>
              <h2>icon</h2>
            </div>
            <h2>info</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
