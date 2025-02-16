import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header';
import { FaMapMarkerAlt, FaUser, FaCheck, FaTimes } from 'react-icons/fa';
import api from './APIClient';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.getAllItems()
      .then((items) => {
        setItems(items);
      })
      .catch(err => {
        console.error('Error fetching items:', err);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.item_id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Image Section */}
              <div className="h-48 bg-gray-200 relative">
                <img
                  src={item.pic_path}
                  alt={item.name}
                  className="w-full h-full object-cover"
               />
              </div>

              {/* Content Section */}
              <div className="p-4 space-y-3">
                {/* Title and Price */}
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <span className="text-lg font-bold text-[#4B9CD3]">
                    ${(item.price || 0).toFixed(2)}
                  </span>
                </div>
                {/* Categories */}
                <div className="flex gap-2">
                  {item.category?.map((cat, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-[#4B9CD3] bg-opacity-10 text-white rounded-full text-xs"
                    >
                      {cat}
                    </span>
                  )) || null}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm">{item.description}</p>

                {/* Location */}
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-[#4B9CD3]" />
                  <span>{item.location}</span>
                </div>

                {/* Owner and Availability */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaUser className="text-[#4B9CD3]" />
                    <span>Owner #{item.owner_id}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {item.is_available ? (
                      <span className="flex items-center text-green-500 text-sm">
                        <FaCheck className="mr-1" />
                        Available
                      </span>
                    ) : (
                      <span className="flex items-center text-red-500 text-sm">
                        <FaTimes className="mr-1" />
                        Unavailable
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
