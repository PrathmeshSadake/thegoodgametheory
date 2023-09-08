import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Input } from "./components/Input";
import DisplayCard from "./components/DisplayCard";

const getData = async () => {
  const { data } = await axios.get("https://api.punkapi.com/v2/beers");
  return data;
};

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const { isLoading, data } = useQuery({
    queryKey: ["beers"],
    queryFn: getData,
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className='max-w-7xl mx-auto p-12 bg-gray-900 min-h-screen'>
      <h1 className='text-center my-4 font-semibold text-4xl text-gray-100'>
        Search 🔎
      </h1>
      <Input
        className='mx-auto max-w-3xl bg-gray-800 text-white focus:ring-0'
        type='text'
        placeholder='Search'
        onChange={handleChange}
        value={searchInput}
      />

      <div className='mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 max-w-7xl gap-5 lg:grid-cols-3'>
        {data
          ?.filter((i) => i.name.toLowerCase().match(searchInput))
          .map((item) => (
            <DisplayCard key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}
