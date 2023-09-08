/* eslint-disable react/prop-types */
const DisplayCard = ({ item }) => {
  return (
    <div
      key={item.id}
      className='flex flex-col overflow-hidden rounded-lg shadow-lg bg-gray-800'
    >
      <div className='flex-shrink-0'>
        <img className='h-48 w-full object-cover' src={item.image_url} alt='' />
      </div>
      <div className='flex flex-1 flex-col justify-between bg-gray-800 p-6'>
        <div className='flex-1'>
          <a href={item.href} className='mt-2 block'>
            <p className='text-xl font-semibold text-gray-100'>{item.name}</p>
            <p className='mt-3 text-sm text-gray-300'>{item.description}</p>
          </a>
        </div>
        <div className='mt-6 flex items-center'>
          <div className='flex-shrink-0'>
            <span className='sr-only'>{item.tagline}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCard;
