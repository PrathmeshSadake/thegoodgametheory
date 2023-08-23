import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Input } from "./components/Input";

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
    <div>
      <Input
        className='max-w-3xl'
        type='text'
        placeholder='Search'
        onChange={handleChange}
        value={searchInput}
      />

      <div className='mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 max-w-7xl gap-5 lg:grid-cols-3'>
        {data
          ?.filter((i) => i.name.toLowerCase().match(searchInput))
          .map((item) => (
            <div
              key={item.id}
              className='flex flex-col overflow-hidden rounded-lg shadow-lg'
            >
              <div className='flex-shrink-0'>
                <img
                  className='h-48 w-full object-cover'
                  src={item.image_url}
                  alt=''
                />
              </div>
              <div className='flex flex-1 flex-col justify-between bg-white p-6'>
                <div className='flex-1'>
                  <a href={item.href} className='mt-2 block'>
                    <p className='text-xl font-semibold text-gray-900'>
                      {item.name}
                    </p>
                    <p className='mt-3 text-base text-gray-500'>
                      {item.description}
                    </p>
                  </a>
                </div>
                <div className='mt-6 flex items-center'>
                  <div className='flex-shrink-0'>
                    <span className='sr-only'>{item.tagline}</span>
                  </div>
                  {/* <div className='ml-3'>
                  <p className='text-sm font-medium text-gray-900'>
                    <a href={item.author.href} className='hover:underline'>
                      {item.author.name}
                    </a>
                  </p>
                  <div className='flex space-x-1 text-sm text-gray-500'>
                    <time dateTime={item.datetime}>{item.date}</time>
                    <span aria-hidden='true'>&middot;</span>
                    <span>{item.readingTime} read</span>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
